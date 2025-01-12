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

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
}

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const { register, isLoading } = useAuth()
  const toast = useToast()

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await register(email, password)
      
      toast({
        title: 'Account created',
        description: 'You can now sign in with your credentials',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not create account'
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
              Create your account
            </Heading>
          </Stack>

          <Box rounded="lg" bg="gray.800" boxShadow="lg" p={8} w="full">
            <form onSubmit={handleRegister}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired isInvalid={!!errors.email}>
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
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl id="password" isRequired isInvalid={!!errors.password}>
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
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <FormControl id="confirmPassword" isRequired isInvalid={!!errors.confirmPassword}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    bg="gray.700"
                    border={0}
                    _focus={{
                      bg: 'gray.600',
                      boxShadow: 'none',
                    }}
                  />
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>

                <Stack spacing={6} pt={4}>
                  <Button
                    colorScheme="brand"
                    size="lg"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Create Account
                  </Button>
                </Stack>

                <Stack pt={6}>
                  <Text align="center" color="gray.400">
                    Already have an account?{' '}
                    <Link as={RouterLink} to="/auth/login" color="brand.300">
                      Sign in
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

export default Register 