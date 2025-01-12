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
  useToast,
  Alert,
  AlertIcon,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { forgotPassword, isLoading } = useAuth()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await forgotPassword(email)
      setIsSubmitted(true)
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
              Reset your password
            </Heading>
            <Text fontSize="lg" color="gray.400" textAlign="center">
              Enter your email address and we'll send you instructions to reset your password
            </Text>
          </Stack>

          <Box rounded="lg" bg="gray.800" boxShadow="lg" p={8} w="full">
            {isSubmitted ? (
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                bg="gray.700"
                rounded="md"
              >
                <AlertIcon boxSize="40px" mr={0} color="green.300" />
                <Text mt={4} mb={1} fontSize="lg">
                  Check your email
                </Text>
                <Text color="gray.400">
                  We've sent password reset instructions to {email}
                </Text>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit}>
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
                    <FormErrorMessage>{error}</FormErrorMessage>
                  </FormControl>

                  <Stack spacing={6}>
                    <Button
                      colorScheme="brand"
                      size="lg"
                      type="submit"
                      isLoading={isLoading}
                    >
                      Send Reset Link
                    </Button>
                  </Stack>
                </Stack>
              </form>
            )}

            <Stack pt={6}>
              <Text align="center" color="gray.400">
                Remember your password?{' '}
                <Link as={RouterLink} to="/auth/login" color="brand.300">
                  Sign in
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default ForgotPassword 