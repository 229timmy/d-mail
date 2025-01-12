import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Divider,
  Button,
  useColorMode,
  useToast,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Icon,
  Flex,
  Badge,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaUser, FaBell, FaPalette, FaEnvelope, FaShieldAlt, FaKey } from 'react-icons/fa'

interface UserPreferences {
  theme: 'dark' | 'light'
  emailsPerPage: number
  showUnreadFirst: boolean
  enableNotifications: boolean
  compactView: boolean
  autoDeleteAfterDays: number
}

const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: colorMode as 'dark' | 'light',
    emailsPerPage: 20,
    showUnreadFirst: true,
    enableNotifications: true,
    compactView: false,
    autoDeleteAfterDays: 30,
  })

  const handleSavePreferences = () => {
    // This would normally save to an API
    toast({
      title: 'Settings saved',
      description: 'Your preferences have been updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        {/* Profile Header */}
        <Box>
          <Heading size="lg" mb={2}>Profile & Settings</Heading>
          <Text color="gray.400">Manage your account preferences and settings</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {/* Account Overview */}
          <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
            <CardHeader>
              <Flex align="center" gap={3}>
                <Icon as={FaUser} color="brand.300" boxSize={5} />
                <Heading size="md">Account Overview</Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stack spacing={4}>
                <Box>
                  <Text color="gray.400" fontSize="sm">Email</Text>
                  <Text>user@example.com</Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">Account Type</Text>
                  <Flex align="center" gap={2}>
                    <Text>Pro</Text>
                    <Badge colorScheme="brand">Active</Badge>
                  </Flex>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">Member Since</Text>
                  <Text>January 2024</Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>

          {/* Quick Stats */}
          <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
            <CardHeader>
              <Flex align="center" gap={3}>
                <Icon as={FaEnvelope} color="brand.300" boxSize={5} />
                <Heading size="md">Email Statistics</Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stack spacing={4}>
                <Box>
                  <Text color="gray.400" fontSize="sm">Total Addresses</Text>
                  <Text>5 active addresses</Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">Emails Received</Text>
                  <Text>1,234 emails this month</Text>
                </Box>
                <Box>
                  <Text color="gray.400" fontSize="sm">Storage Used</Text>
                  <Text>45% of 1GB</Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>

          {/* Appearance Settings */}
          <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
            <CardHeader>
              <Flex align="center" gap={3}>
                <Icon as={FaPalette} color="brand.300" boxSize={5} />
                <Heading size="md">Appearance</Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stack spacing={6}>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb={0}>Dark Mode</FormLabel>
                  <Switch
                    isChecked={preferences.theme === 'dark'}
                    onChange={() => {
                      setPreferences(prev => ({
                        ...prev,
                        theme: prev.theme === 'dark' ? 'light' : 'dark'
                      }))
                      toggleColorMode()
                    }}
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb={0}>Compact View</FormLabel>
                  <Switch
                    isChecked={preferences.compactView}
                    onChange={() => setPreferences(prev => ({
                      ...prev,
                      compactView: !prev.compactView
                    }))}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Emails Per Page</FormLabel>
                  <Select
                    value={preferences.emailsPerPage}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      emailsPerPage: Number(e.target.value)
                    }))}
                    bg="gray.700"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </Select>
                </FormControl>
              </Stack>
            </CardBody>
          </Card>

          {/* Notification Settings */}
          <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
            <CardHeader>
              <Flex align="center" gap={3}>
                <Icon as={FaBell} color="brand.300" boxSize={5} />
                <Heading size="md">Notifications</Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stack spacing={6}>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb={0}>Enable Notifications</FormLabel>
                  <Switch
                    isChecked={preferences.enableNotifications}
                    onChange={() => setPreferences(prev => ({
                      ...prev,
                      enableNotifications: !prev.enableNotifications
                    }))}
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb={0}>Show Unread First</FormLabel>
                  <Switch
                    isChecked={preferences.showUnreadFirst}
                    onChange={() => setPreferences(prev => ({
                      ...prev,
                      showUnreadFirst: !prev.showUnreadFirst
                    }))}
                  />
                </FormControl>
              </Stack>
            </CardBody>
          </Card>

          {/* Security Settings */}
          <Card bg="gray.800" borderColor="gray.700" borderWidth={1}>
            <CardHeader>
              <Flex align="center" gap={3}>
                <Icon as={FaShieldAlt} color="brand.300" boxSize={5} />
                <Heading size="md">Security</Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stack spacing={6}>
                <FormControl>
                  <FormLabel>Auto-Delete Emails After</FormLabel>
                  <Select
                    value={preferences.autoDeleteAfterDays}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      autoDeleteAfterDays: Number(e.target.value)
                    }))}
                    bg="gray.700"
                  >
                    <option value={7}>7 days</option>
                    <option value={30}>30 days</option>
                    <option value={90}>90 days</option>
                    <option value={0}>Never</option>
                  </Select>
                </FormControl>
                <Button
                  leftIcon={<FaKey />}
                  variant="outline"
                  colorScheme="brand"
                  size="sm"
                >
                  Change Password
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Divider borderColor="gray.700" />

        {/* Save Button */}
        <Flex justify="flex-end">
          <Button
            colorScheme="brand"
            onClick={handleSavePreferences}
            size="lg"
          >
            Save Changes
          </Button>
        </Flex>
      </Stack>
    </Container>
  )
}

export default Profile 