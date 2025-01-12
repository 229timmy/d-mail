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
  Spinner,
} from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { FaEllipsisV, FaTrash, FaArchive, FaFlag, FaRegFlag } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

interface Email {
  id: string
  sender_address: string
  subject: string
  body_text: string | null
  body_html: string | null
  created_at: string
  read_at: string | null
  is_spam: boolean
  recipient_address: string
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

const Mailbox = () => {
  const { emailId } = useParams()
  const { user } = useAuth()
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

  const fetchEmails = async (pageNum: number) => {
    if (!user) return []

    try {
      const pageSize = 20
      const start = (pageNum - 1) * pageSize
      const end = start + pageSize - 1

      let query = supabase
        .from('emails')
        .select('*')
        .order('created_at', { ascending: false })
        .range(start, end)

      if (currentAddress) {
        query = query.eq('recipient_address', currentAddress.address)
      } else if (emailId) {
        // If emailId is provided but we don't have currentAddress yet,
        // we need to first get the address
        const { data: address } = await supabase
          .from('email_addresses')
          .select('address')
          .eq('id', emailId)
          .single()

        if (address) {
          query = query.eq('recipient_address', address.address)
        }
      }

      const { data, error } = await query

      if (error) throw error

      // Check if we have more data
      const { count } = await supabase
        .from('emails')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_address', currentAddress?.address || '')

      setHasMore(count ? start + pageSize < count : false)

      return data || []
    } catch (error) {
      console.error('Error fetching emails:', error)
      return []
    }
  }

  // Fetch current email address
  useEffect(() => {
    const fetchAddress = async () => {
      if (!emailId || !user) {
        setCurrentAddress(null)
        setIsAddressLoading(false)
        return
      }

      try {
        const { data: address, error } = await supabase
          .from('email_addresses')
          .select('id, address, is_primary')
          .eq('id', emailId)
          .eq('user_id', user.id)
          .single()

        if (error) throw error

        // Get unread count
        const { count: unreadCount } = await supabase
          .from('emails')
          .select('*', { count: 'exact', head: true })
          .eq('recipient_address', address.address)
          .is('read_at', null)

        setCurrentAddress({
          id: address.id,
          address: address.address,
          unreadCount: unreadCount || 0,
          customName: address.is_primary ? 'Primary' : undefined
        })

        // Reset emails when changing address
        setEmails([])
        setPage(1)
        setHasMore(true)
        setIsLoading(true)
        
        // Fetch new emails for this address
        const newEmails = await fetchEmails(1)
        setEmails(newEmails)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching address:', error)
        setCurrentAddress(null)
      } finally {
        setIsAddressLoading(false)
      }
    }

    fetchAddress()
  }, [emailId, user])

  // Set up infinite scroll
  useEffect(() => {
    if (!observerTarget.current || isLoading || isLoadingMore || !hasMore) return

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadingMore(true)
          const nextPage = page + 1
          const newEmails = await fetchEmails(nextPage)
          setEmails(prev => [...prev, ...newEmails])
          setPage(nextPage)
          setIsLoadingMore(false)
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(observerTarget.current)

    return () => observer.disconnect()
  }, [observerTarget, isLoading, isLoadingMore, hasMore, page])

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

  const handleDeleteConfirm = async () => {
    if (!emailToDelete) return

    try {
      const { error } = await supabase
        .from('emails')
        .delete()
        .eq('id', emailToDelete)

      if (error) throw error

      setEmails(emails.filter(email => email.id !== emailToDelete))
      setEmailToDelete(null)
    } catch (error) {
      console.error('Error deleting email:', error)
    } finally {
      setIsDeleteDialogOpen(false)
    }
  }

  const handleBulkDeleteClick = () => {
    setIsBulkDeleteDialogOpen(true)
  }

  const handleBulkDeleteConfirm = async () => {
    try {
      const { error } = await supabase
        .from('emails')
        .delete()
        .in('id', Array.from(selectedEmails))

      if (error) throw error

      setEmails(emails.filter(email => !selectedEmails.has(email.id)))
      setSelectedEmails(new Set())
    } catch (error) {
      console.error('Error deleting emails:', error)
    } finally {
      setIsBulkDeleteDialogOpen(false)
    }
  }

  const toggleEmailExpansion = async (emailId: string) => {
    setExpandedEmailId(expandedEmailId === emailId ? null : emailId)

    // Mark as read if expanding
    if (expandedEmailId !== emailId) {
      try {
        const { error } = await supabase
          .from('emails')
          .update({ read_at: new Date().toISOString() })
          .eq('id', emailId)

        if (error) throw error

        // Update local state
        setEmails(emails.map(email => 
          email.id === emailId 
            ? { ...email, read_at: new Date().toISOString() }
            : email
        ))
      } catch (error) {
        console.error('Error marking email as read:', error)
      }
    }
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
            {emails.length > 0 && (
              <Skeleton isLoaded={!isLoading}>
                <Text fontSize="sm" color="gray.500">
                  {emails.length} messages • {emails.filter(e => !e.read_at).length} unread
                </Text>
              </Skeleton>
            )}
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
                  bg={!email.read_at ? 'gray.800' : undefined}
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
                    aria-label={email.is_spam ? 'Mark as Not Spam' : 'Mark as Spam'}
                    icon={email.is_spam ? <FaFlag /> : <FaRegFlag />}
                    size="sm"
                    variant="ghost"
                    colorScheme={email.is_spam ? 'yellow' : 'gray'}
                    opacity={email.is_spam ? 1 : 0}
                    _groupHover={{ opacity: 1 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      // Toggle spam logic here
                    }}
                  />

                  <Box flex={1} ml={4}>
                    <Flex justify="space-between" align="center" mb={1}>
                      <Flex align="center" gap={3}>
                        <Text fontWeight={!email.read_at ? 'bold' : 'normal'}>
                          {email.sender_address}
                        </Text>
                        {!email.read_at && (
                          <Badge colorScheme="brand" variant="solid">
                            New
                          </Badge>
                        )}
                      </Flex>
                      <Text color="gray.500" fontSize="sm">
                        {new Date(email.created_at).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </Text>
                    </Flex>
                    <Text 
                      fontSize="md" 
                      fontWeight={!email.read_at ? 'bold' : 'normal'}
                      mb={1}
                    >
                      {email.subject}
                    </Text>
                    <Text color="gray.400" fontSize="sm" noOfLines={expandedEmailId === email.id ? undefined : 1}>
                      {email.body_text || 'No text content'}
                    </Text>
                    {expandedEmailId === email.id && email.body_html && (
                      <Box 
                        mt={4} 
                        p={4} 
                        bg="gray.700" 
                        borderRadius="md"
                        dangerouslySetInnerHTML={{ __html: email.body_html }}
                      />
                    )}
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

            {isLoadingMore && (
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