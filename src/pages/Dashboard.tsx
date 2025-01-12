import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useToast,
  Spinner,
  IconButton,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaTimes, FaCopy } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

interface EmailAddress {
  id: string
  address: string
  created_at: string
  customName?: string
}

const Dashboard = () => {
  const [emailAddresses, setEmailAddresses] = useState<EmailAddress[]>([])
  const [newEmailName, setNewEmailName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const toast = useToast()
  const { user } = useAuth()

  // Load addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from('email_addresses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        setEmailAddresses(data)
      } catch (error) {
        console.error('Error fetching addresses:', error)
        toast({
          title: 'Error loading addresses',
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

  const createEmail = async (customName?: string) => {
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

      setEmailAddresses(prev => [data, ...prev])
      onClose()
      setNewEmailName('')
      
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

  const deleteEmail = async (id: string) => {
    try {
      const { error } = await supabase
        .from('email_addresses')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id)

      if (error) throw error

      setEmailAddresses(prev => prev.filter(email => email.id !== id))
    } catch (error) {
      console.error('Error deleting email:', error)
      toast({
        title: 'Error deleting email',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="200px">
        <Spinner color="brand.300" size="xl" />
      </Flex>
    )
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Your Disposable Emails</Heading>
        <Flex gap={4}>
          <Button
            leftIcon={<FaPlus />}
            colorScheme="brand"
            onClick={() => createEmail()}
          >
            Generate Random
          </Button>
          <Button
            leftIcon={<FaPlus />}
            colorScheme="brand"
            variant="outline"
            onClick={onOpen}
          >
            Create Custom
          </Button>
        </Flex>
      </Flex>

      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {emailAddresses.map(email => (
          <Card 
            key={email.id} 
            bg="gray.800" 
            borderColor="gray.700" 
            borderWidth={1}
            role="group"
            position="relative"
            onClick={() => navigate(`/mailbox/${email.id}`)}
            cursor="pointer"
            _hover={{ borderColor: 'gray.600' }}
          >
            <IconButton
              icon={<Text fontSize="md">×</Text>}
              aria-label="Close"
              position="absolute"
              right={2}
              top={2}
              size="sm"
              variant="ghost"
              visibility="hidden"
              _groupHover={{ visibility: 'visible' }}
              onClick={(e) => {
                e.stopPropagation()
                deleteEmail(email.id)
              }}
              color="gray.400"
              _hover={{ bg: 'transparent', color: 'red.400' }}
            />
            <CardBody>
              <Flex direction="column" gap={3}>
                <Heading size="md" color="brand.300">
                  {email.address}
                </Heading>
                <Text fontSize="sm" color="gray.400">
                  Created: {new Date(email.created_at).toLocaleDateString()}
                </Text>
                <Button
                  size="sm"
                  variant="ghost"
                  leftIcon={<FaCopy />}
                  visibility="hidden"
                  _groupHover={{ visibility: 'visible' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(email.address)
                    toast({
                      title: 'Copied to clipboard',
                      status: 'success',
                      duration: 2000,
                    })
                  }}
                >
                  Copy
                </Button>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader>Create Custom Email</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Email Name</FormLabel>
              <Input
                value={newEmailName}
                onChange={(e) => setNewEmailName(e.target.value)}
                placeholder="Enter custom name"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              onClick={() => createEmail(newEmailName)}
              isDisabled={!newEmailName}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Dashboard 