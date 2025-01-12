import {
  Box,
  Flex,
  Text,
  Stack,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  useColorModeValue,
  Heading,
  Checkbox,
  Button,
  Skeleton,
  SkeletonText,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { FaEllipsisV, FaTrash, FaArchive, FaFlag, FaRegFlag } from 'react-icons/fa'

interface Email {
  id: string
  from: string
  subject: string
  content: string
  receivedAt: Date
  read: boolean
  flagged?: boolean
  toAddress: string
}

interface EmailAddress {
  id: string
  address: string
  unreadCount: number
  customName?: string
}

interface DeleteConfirmationProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, title, message }: DeleteConfirmationProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg="gray.800">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {message}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

const EmailSkeleton = () => {
  const borderColor = useColorModeValue('gray.700', 'gray.600')
  return (
    <Flex p={4} align="center" borderBottom="1px" borderColor={borderColor}>
      <Skeleton w="20px" h="20px" mr={4} />
      <Skeleton w="20px" h="20px" mr={4} />
      <Box flex={1}>
        <Flex justify="space-between" align="center" mb={2}>
          <Skeleton h="20px" w="150px" />
          <Skeleton h="20px" w="60px" />
        </Flex>
        <SkeletonText noOfLines={2} spacing={2} />
      </Box>
      <Skeleton w="32px" h="32px" ml={2} />
    </Flex>
  )
}

const generateRandomString = (length: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const Mailbox = () => {
  const { emailId } = useParams()
  const [currentAddress, setCurrentAddress] = useState<EmailAddress | null>(null)
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set())
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [isAddressLoading, setIsAddressLoading] = useState(true)
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)
  const borderColor = useColorModeValue('gray.700', 'gray.600')
  const hoverBg = useColorModeValue('gray.800', 'gray.700')
  const [emails, setEmails] = useState<Email[]>([])
  const observerTarget = useRef<HTMLDivElement>(null)

  // Simulating fetching emails with pagination
  const fetchEmails = async (pageNum: number, addressId?: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate paginated data
      const pageSize = 10
      const mockEmails: Email[] = Array.from({ length: pageSize }, (_, i) => {
        const email = {
          id: `${pageNum}-${i}`,
          from: `user${i}@example.com`,
          subject: `Email Subject ${pageNum}-${i}`,
          content: `This is the content of email ${pageNum}-${i}...`,
          receivedAt: new Date(Date.now() - i * 3600000),
          read: Math.random() > 0.3,
          flagged: Math.random() > 0.8,
          toAddress: currentAddress?.address || `${generateRandomString(8)}@d-mail.temp`,
        }
        return email
      })

      // Filter emails based on the current address
      let filteredEmails = mockEmails
      if (currentAddress) {
        filteredEmails = mockEmails.filter(email => email.toAddress === currentAddress.address)
      }

      // Simulate end of data after 5 pages
      if (pageNum >= 5) {
        setHasMore(false)
        return []
      }

      return filteredEmails
    } catch (error) {
      console.error('Error fetching emails:', error)
      return []
    }
  }

  // Initial load
  useEffect(() => {
    setIsLoading(true)
    setPage(1)
    setHasMore(true)
    setEmails([])
    
    // Only fetch emails if we have a valid context
    if (currentAddress || !emailId) {
      fetchEmails(1).then(newEmails => {
        setEmails(newEmails)
        setIsLoading(false)
      })
    }
  }, [emailId, currentAddress])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, isLoadingMore])

  const loadMore = async () => {
    if (isLoadingMore) return
    
    setIsLoadingMore(true)
    const nextPage = page + 1
    const newEmails = await fetchEmails(nextPage)
    
    setEmails(prev => [...prev, ...newEmails])
    setPage(nextPage)
    setIsLoadingMore(false)
  }

  // Simulating fetching the email address based on emailId
  useEffect(() => {
    if (!emailId) {
      setCurrentAddress(null)
      setIsAddressLoading(false)
      return
    }

    setIsAddressLoading(true)
    // This would normally be an API call
    const fetchAddress = async () => {
      try {
        // Include newly created addresses by getting them from localStorage
        const storedAddresses = localStorage.getItem('emailAddresses')
        const addresses: EmailAddress[] = storedAddresses 
          ? JSON.parse(storedAddresses)
          : [
              { id: '1', address: 'personal@d-mail.temp', unreadCount: 3, customName: 'Personal' },
              { id: '2', address: 'newsletter@d-mail.temp', unreadCount: 0, customName: 'Newsletters' },
              { id: '3', address: 'shopping@d-mail.temp', unreadCount: 1, customName: 'Shopping' },
            ]

        const address = addresses.find(a => a.id === emailId)
        if (!address) {
          setCurrentAddress(null)
          setIsAddressLoading(false)
          return
        }

        setCurrentAddress(address)
        
        // Reset emails when changing address
        setEmails([])
        setPage(1)
        setHasMore(true)
        setIsLoading(true)
        
        // Fetch new emails for this address
        const newEmails = await fetchEmails(1)
        setEmails(newEmails)
        setIsLoading(false)
      } finally {
        setIsAddressLoading(false)
      }
    }
    fetchAddress()
  }, [emailId])

  const toggleEmailSelection = (emailId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newSelected = new Set(selectedEmails)
    if (newSelected.has(emailId)) {
      newSelected.delete(emailId)
    } else {
      newSelected.add(emailId)
    }
    setSelectedEmails(newSelected)
  }

  const handleDeleteClick = (emailId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEmailToDelete(emailId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (emailToDelete) {
      setEmails(emails.filter(email => email.id !== emailToDelete))
      setEmailToDelete(null)
    }
    setIsDeleteDialogOpen(false)
  }

  const handleBulkDeleteClick = () => {
    setIsBulkDeleteDialogOpen(true)
  }

  const handleBulkDeleteConfirm = () => {
    setEmails(emails.filter(email => !selectedEmails.has(email.id)))
    setSelectedEmails(new Set())
    setIsBulkDeleteDialogOpen(false)
  }

  const toggleEmailExpansion = (emailId: string) => {
    setExpandedEmailId(expandedEmailId === emailId ? null : emailId)
  }

  return (
    <Box>
      <Box mb={6}>
        <Flex justify="space-between" align="center">
          <Box>
            <Skeleton isLoaded={!isAddressLoading}>
              <Heading size="md" color="gray.300" mb={2}>
                {currentAddress 
                  ? (currentAddress.customName ? `${currentAddress.customName} Inbox` : `Inbox for ${currentAddress.address}`)
                  : 'All Emails'}
              </Heading>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Text fontSize="sm" color="gray.500">
                {emails.length} messages • {emails.filter(e => !e.read).length} unread
              </Text>
            </Skeleton>
          </Box>
          {selectedEmails.size > 0 && (
            <Button
              leftIcon={<FaTrash />}
              colorScheme="red"
              variant="ghost"
              size="sm"
              onClick={handleBulkDeleteClick}
            >
              Delete Selected ({selectedEmails.size})
            </Button>
          )}
        </Flex>
      </Box>

      <Stack spacing={0} divider={<Divider borderColor={borderColor} />}>
        {isLoading ? (
          emails.length > 0 ? (
            <>
              <EmailSkeleton />
              <EmailSkeleton />
              <EmailSkeleton />
            </>
          ) : (
            <Flex p={8} justify="center" align="center">
              <Text color="gray.400">
                No emails yet. Emails sent to this address will appear here.
              </Text>
            </Flex>
          )
        ) : (
          <>
            {emails.map(email => (
              <Box key={email.id}>
                <Flex
                  p={4}
                  align="center"
                  cursor="pointer"
                  bg={email.read ? undefined : 'gray.800'}
                  _hover={{ bg: hoverBg }}
                  onClick={() => toggleEmailExpansion(email.id)}
                  position="relative"
                  role="group"
                  borderRadius="md"
                >
                  <Checkbox
                    mr={4}
                    isChecked={selectedEmails.has(email.id)}
                    onChange={(e) => toggleEmailSelection(email.id, e as any)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <IconButton
                    aria-label={email.flagged ? 'Unflag' : 'Flag'}
                    icon={email.flagged ? <FaFlag /> : <FaRegFlag />}
                    size="sm"
                    variant="ghost"
                    colorScheme={email.flagged ? 'yellow' : 'gray'}
                    opacity={email.flagged ? 1 : 0}
                    _groupHover={{ opacity: 1 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      // Toggle flag logic here
                    }}
                  />
                  
                  <Box flex={1} ml={4}>
                    <Flex justify="space-between" align="center" mb={1}>
                      <Flex align="center" gap={3}>
                        <Text fontWeight={email.read ? 'normal' : 'bold'}>
                          {email.from}
                        </Text>
                        {!email.read && (
                          <Badge colorScheme="brand" variant="solid">
                            New
                          </Badge>
                        )}
                      </Flex>
                      <Text color="gray.500" fontSize="sm">
                        {email.receivedAt.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </Text>
                    </Flex>
                    <Text 
                      fontSize="md" 
                      fontWeight={email.read ? 'normal' : 'bold'}
                      mb={1}
                    >
                      {email.subject}
                    </Text>
                    <Text color="gray.400" fontSize="sm" noOfLines={expandedEmailId === email.id ? undefined : 1}>
                      {email.content}
                    </Text>
                  </Box>

                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FaEllipsisV />}
                      variant="ghost"
                      size="sm"
                      ml={2}
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                    />
                    <MenuList bg="gray.800" borderColor={borderColor}>
                      <MenuItem 
                        icon={<FaArchive />} 
                        bg="gray.800" 
                        _hover={{ bg: 'gray.700' }}
                      >
                        Archive
                      </MenuItem>
                      <MenuItem 
                        icon={<FaTrash />} 
                        bg="gray.800" 
                        _hover={{ bg: 'gray.700' }}
                        color="red.300"
                        onClick={(e) => handleDeleteClick(email.id, e)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Box>
            ))}

            {/* Infinite scroll trigger */}
            <Box ref={observerTarget} h="20px" />

            {isLoadingMore && emails.length > 0 && (
              <>
                <EmailSkeleton />
                <EmailSkeleton />
              </>
            )}

            {!hasMore && emails.length > 0 && (
              <Flex p={4} justify="center">
                <Text color="gray.500">No more emails to load</Text>
              </Flex>
            )}

            {emails.length === 0 && (
              <Flex p={8} justify="center" align="center">
                <Text color="gray.400">
                  No emails yet. Emails sent to this address will appear here.
                </Text>
              </Flex>
            )}
          </>
        )}
      </Stack>

      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Email"
        message="Are you sure you want to delete this email? This action cannot be undone."
      />

      <DeleteConfirmation
        isOpen={isBulkDeleteDialogOpen}
        onClose={() => setIsBulkDeleteDialogOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Multiple Emails"
        message={`Are you sure you want to delete ${selectedEmails.size} emails? This action cannot be undone.`}
      />
    </Box>
  )
}

export default Mailbox 