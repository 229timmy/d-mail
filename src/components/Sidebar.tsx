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
} from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaInbox, FaPlus, FaTrash, FaCopy } from 'react-icons/fa'
import { useState, useEffect } from 'react'

interface EmailAddress {
  id: string
  address: string
  unreadCount: number
  customName?: string
}

const generateRandomString = (length: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const activeBg = useColorModeValue('gray.700', 'gray.700')
  const hoverBg = useColorModeValue('gray.700', 'gray.600')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newEmailName, setNewEmailName] = useState('')
  const [addresses, setAddresses] = useState<EmailAddress[]>(() => {
    const storedAddresses = localStorage.getItem('emailAddresses')
    return storedAddresses 
      ? JSON.parse(storedAddresses)
      : [
          { id: '1', address: 'personal@d-mail.temp', unreadCount: 3, customName: 'Personal' },
          { id: '2', address: 'newsletter@d-mail.temp', unreadCount: 0, customName: 'Newsletters' },
          { id: '3', address: 'shopping@d-mail.temp', unreadCount: 1, customName: 'Shopping' },
        ]
  })

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('emailAddresses', JSON.stringify(addresses))
  }, [addresses])

  const createNewEmail = (customName?: string) => {
    const name = customName || generateRandomString(10)
    const newEmail: EmailAddress = {
      id: generateRandomString(8),
      address: `${name.toLowerCase()}@d-mail.temp`,
      unreadCount: 0,
      customName: customName
    }
    setAddresses(prevAddresses => [...prevAddresses, newEmail])
    setNewEmailName('')
    onClose()
    
    // Navigate to the new email address's mailbox
    navigate(`/mailbox/${newEmail.id}`)
  }

  const deleteAddress = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setAddresses(prevAddresses => prevAddresses.filter(addr => addr.id !== id))
    
    // If we're currently viewing the deleted address, navigate to all emails
    if (location.pathname === `/mailbox/${id}`) {
      navigate('/mailbox')
    }
  }

  const copyAddress = async (address: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(address)
      toast({
        title: 'Address copied',
        description: 'Email address copied to clipboard',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy address to clipboard',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Button
          leftIcon={<FaPlus />}
          colorScheme="brand"
          size="sm"
          w="full"
          onClick={onOpen}
        >
          New Email
        </Button>

        <Divider borderColor="gray.600" />

        <Text fontSize="sm" color="gray.400" fontWeight="medium" mb={2}>
          YOUR ADDRESSES
        </Text>

        <Box
          py={4}
          px={4}
          w="full"
          display="flex"
          flexDir="column"
          gap={1}
          bg={location.pathname === '/mailbox' ? activeBg : undefined}
          _hover={{ bg: hoverBg }}
          onClick={() => navigate('/mailbox')}
          position="relative"
          cursor="pointer"
          role="group"
          borderRadius="md"
          transition="all 0.2s"
        >
          <Flex w="full" align="center" justify="space-between">
            <Icon as={FaInbox} color="brand.300" boxSize={4} />
            <Badge colorScheme="brand" variant="solid" fontSize="xs">
              {addresses.reduce((sum, addr) => sum + addr.unreadCount, 0)}
            </Badge>
          </Flex>
          <Text fontSize="sm" color="gray.300" textAlign="left" noOfLines={1}>
            All Emails
          </Text>
        </Box>

        {addresses.map((addr) => (
          <Box
            key={addr.id}
            py={4}
            px={4}
            w="full"
            display="flex"
            flexDir="column"
            gap={1}
            bg={location.pathname === `/mailbox/${addr.id}` ? activeBg : undefined}
            _hover={{ bg: hoverBg }}
            onClick={() => navigate(`/mailbox/${addr.id}`)}
            position="relative"
            cursor="pointer"
            role="group"
            borderRadius="md"
            transition="all 0.2s"
          >
            <Flex w="full" align="center" justify="space-between">
              <Icon as={FaInbox} color="brand.300" boxSize={4} />
              {addr.unreadCount > 0 && (
                <Badge colorScheme="brand" variant="solid" fontSize="xs">
                  {addr.unreadCount}
                </Badge>
              )}
            </Flex>
            <Flex align="center" gap={2}>
              <Text
                fontSize="sm"
                color="gray.300"
                textAlign="left"
                noOfLines={1}
                flex="1"
              >
                {addr.address}
              </Text>
              <ButtonGroup size="xs" variant="ghost" spacing={1} opacity={0} _groupHover={{ opacity: 1 }}>
                <Tooltip label="Copy Address" placement="top">
                  <Button
                    colorScheme="brand"
                    onClick={(e) => copyAddress(addr.address, e)}
                  >
                    <Icon as={FaCopy} />
                  </Button>
                </Tooltip>
                <Tooltip label="Delete Address" placement="top">
                  <Button
                    colorScheme="red"
                    onClick={(e) => deleteAddress(addr.id, e)}
                  >
                    <Icon as={FaTrash} />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </Flex>
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