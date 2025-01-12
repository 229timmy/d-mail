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
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaTrash } from 'react-icons/fa'

interface EmailAddress {
  id: string
  address: string
  createdAt: Date
  customName?: string
}

const Dashboard = () => {
  const [emailAddresses, setEmailAddresses] = useState<EmailAddress[]>([])
  const [newEmailName, setNewEmailName] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  // Load initial addresses
  useEffect(() => {
    // This would normally be an API call
    const initialAddresses: EmailAddress[] = [
      { id: '1', address: 'personal@d-mail.temp', createdAt: new Date(), customName: 'Personal' },
      { id: '2', address: 'newsletter@d-mail.temp', createdAt: new Date(), customName: 'Newsletters' },
      { id: '3', address: 'shopping@d-mail.temp', createdAt: new Date(), customName: 'Shopping' },
    ]
    setEmailAddresses(initialAddresses)
  }, [])

  const generateRandomString = (length: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const createEmail = (customName?: string) => {
    const name = customName || generateRandomString(10)
    const newEmail: EmailAddress = {
      id: generateRandomString(8),
      address: `${name.toLowerCase()}@d-mail.temp`,
      createdAt: new Date(),
      customName: customName
    }
    setEmailAddresses(prevAddresses => [...prevAddresses, newEmail])
    onClose()
    setNewEmailName('')
    
    // Navigate to the new email address's mailbox
    navigate(`/mailbox/${newEmail.id}`)
  }

  const deleteEmail = (id: string) => {
    setEmailAddresses(prevAddresses => prevAddresses.filter(email => email.id !== id))
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
          <Card key={email.id} bg="gray.800" borderColor="gray.700" borderWidth={1}>
            <CardBody>
              <Flex direction="column" gap={3}>
                <Heading size="md" color="brand.300">
                  {email.address}
                </Heading>
                <Text fontSize="sm" color="gray.400">
                  Created: {email.createdAt.toLocaleDateString()}
                </Text>
                <Flex gap={3} mt={2}>
                  <Button
                    flex={1}
                    colorScheme="brand"
                    onClick={() => navigate(`/mailbox/${email.id}`)}
                  >
                    Open Mailbox
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => deleteEmail(email.id)}
                  >
                    <FaTrash />
                  </Button>
                </Flex>
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