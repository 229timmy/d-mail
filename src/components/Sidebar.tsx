import {
  Box,
  VStack,
  Button,
  Text,
  Divider,
  useColorModeValue,
  Badge,
  Icon,
  Tooltip,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  useToast,
  ButtonGroup,
  Spinner,
} from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaInbox, FaPlus, FaTrash, FaCopy } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

interface EmailAddress {
  id: string
  address: string
  unreadCount: number
  customName?: string
}

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const { user } = useAuth()
  const activeBg = useColorModeValue('gray.700', 'gray.700')
  const hoverBg = useColorModeValue('gray.700', 'gray.600')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newEmailName, setNewEmailName] = useState('')
  const [addresses, setAddresses] = useState<EmailAddress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch email addresses from Supabase
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user) return

      try {
        const { data: emailAddresses, error } = await supabase
          .from('email_addresses')
          .select('id, address, is_primary, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        // Get unread count for each address
        const addressesWithCounts = await Promise.all(
          emailAddresses.map(async (addr) => {
            const { count, error: countError } = await supabase
              .from('emails')
              .select('*', { count: 'exact', head: true })
              .eq('recipient_address', addr.address)
              .is('read_at', null)

            if (countError) throw countError

            return {
              id: addr.id,
              address: addr.address,
              unreadCount: count || 0,
              customName: addr.is_primary ? 'Primary' : undefined
            }
          })
        )

        setAddresses(addressesWithCounts)
      } catch (error) {
        console.error('Error fetching addresses:', error)
        toast({
          title: 'Error fetching addresses',
          description: 'Please try again later',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAddresses()
  }, [user, toast])

  const createNewEmail = async (customName?: string) => {
    if (!user) return

    try {
      const address = `${customName?.toLowerCase() || Math.random().toString(36).substring(2, 12)}@d-mail.temp`
      
      const { data, error } = await supabase
        .from('email_addresses')
        .insert({
          address,
          user_id: user.id,
          is_primary: false,
        })
        .select()
        .single()

      if (error) throw error

      // Add the new address to the state
      setAddresses(prev => [{
        id: data.id,
        address: data.address,
        unreadCount: 0,
        customName: customName
      }, ...prev])

      setNewEmailName('')
      onClose()
      
      // Navigate to the new email address's mailbox
      navigate(`/mailbox/${data.id}`)
    } catch (error) {
      console.error('Error creating email:', error)
      toast({
        title: 'Error creating email',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const deleteAddress = async (id: string) => {
    try {
      const { error } = await supabase
        .from('email_addresses')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id)
        .single()

      if (error) throw error

      setAddresses(prev => prev.filter(addr => addr.id !== id))
      
      // If we're currently viewing this mailbox, navigate away
      if (location.pathname.includes(id)) {
        navigate('/mailbox')
      }
    } catch (error) {
      console.error('Error deleting address:', error)
      toast({
        title: 'Error deleting address',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  if (isLoading) {
    return (
      <Box p={4}>
        <Flex justify="center" align="center" h="100px">
          <Spinner color="brand.300" />
        </Flex>
      </Box>
    )
  }

  return (
    <Box>
      <VStack align="stretch" spacing={2}>
        <Button
          leftIcon={<FaInbox />}
          variant="ghost"
          justifyContent="flex-start"
          w="full"
          bg={location.pathname === '/mailbox' ? activeBg : undefined}
          _hover={{ bg: hoverBg }}
          onClick={() => navigate('/mailbox')}
        >
          All Mail
        </Button>

        <Button
          leftIcon={<FaPlus />}
          colorScheme="brand"
          variant="ghost"
          justifyContent="flex-start"
          w="full"
          onClick={onOpen}
        >
          New Address
        </Button>

        {addresses.length > 0 && <Divider />}

        {addresses.map(address => (
          <Box key={address.id}>
            <Box
              p={2}
              cursor="pointer"
              bg={location.pathname === `/mailbox/${address.id}` ? activeBg : undefined}
              _hover={{ bg: hoverBg }}
              onClick={() => navigate(`/mailbox/${address.id}`)}
              role="group"
              borderRadius="md"
              position="relative"
            >
              <Text
                fontSize="sm"
                fontWeight="medium"
                noOfLines={1}
              >
                {address.customName || address.address.split('@')[0]}
              </Text>
              {address.unreadCount > 0 && (
                <Badge colorScheme="brand" ml={2}>
                  {address.unreadCount}
                </Badge>
              )}
              <Text
                position="absolute"
                top={2}
                right={2}
                color="gray.400"
                cursor="pointer"
                visibility="hidden"
                _groupHover={{ visibility: 'visible' }}
                onClick={(e) => {
                  e.stopPropagation()
                  deleteAddress(address.id)
                }}
                _hover={{ color: 'red.400' }}
              >
                ×
              </Text>
              <Button
                size="xs"
                variant="ghost"
                leftIcon={<FaCopy />}
                mt={2}
                visibility="hidden"
                _groupHover={{ visibility: 'visible' }}
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(address.address)
                  toast({
                    title: 'Copied to clipboard',
                    status: 'success',
                    duration: 2000,
                  })
                }}
              >
                Copy
              </Button>
            </Box>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader>Create New Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Email Name (Optional)</FormLabel>
              <Input
                placeholder="Enter custom name or leave empty for random"
                value={newEmailName}
                onChange={(e) => setNewEmailName(e.target.value)}
                bg="gray.700"
                border={0}
                _focus={{
                  bg: 'gray.600',
                  boxShadow: 'none',
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              onClick={() => createNewEmail(newEmailName)}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Sidebar 