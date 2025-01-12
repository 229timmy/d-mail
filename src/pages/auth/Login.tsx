import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  Icon,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()
  const toast = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login(email, password)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      setError(message)
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box minH="100vh" bg="gray.900" py={20}>
      <Container maxW="lg">
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Icon as={FaEnvelope} boxSize={10} color="brand.300" />
            <Heading fontSize="4xl" textAlign="center" color="white">
              Sign in to D-Mail
            </Heading>
          </Stack>

          <Box rounded="lg" bg="gray.800" boxShadow="lg" p={8} w="full">
            <form onSubmit={handleLogin}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired isInvalid={!!error}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="gray.700"
                    border={0}
                    _focus={{
                      bg: 'gray.600',
                      boxShadow: 'none',
                    }}
                  />
                </FormControl>

                <FormControl id="password" isRequired isInvalid={!!error}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      bg="gray.700"
                      border={0}
                      _focus={{
                        bg: 'gray.600',
                        boxShadow: 'none',
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                        variant="ghost"
                        colorScheme="gray"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </FormControl>

                <Stack spacing={6}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align="start"
                    justify="space-between"
                  >
                    <Link as={RouterLink} to="/auth/forgot-password" color="brand.300">
                      Forgot password?
                    </Link>
                  </Stack>

                  <Button
                    colorScheme="brand"
                    size="lg"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Sign in
                  </Button>
                </Stack>

                <Stack pt={6}>
                  <Text align="center" color="gray.400">
                    Don't have an account?{' '}
                    <Link as={RouterLink} to="/auth/register" color="brand.300">
                      Register
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Login 