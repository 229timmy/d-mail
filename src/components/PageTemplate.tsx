import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
  Flex,
  Link,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import Footer from './Footer'

interface PageTemplateProps {
  title: string
  description?: string
  children?: React.ReactNode
}

const PageTemplate = ({ title, description, children }: PageTemplateProps) => {
  return (
    <Box minH="100vh" bg="gray.900">
      <Box borderBottom="1px solid" borderColor="gray.800">
        <Container maxW="container.xl" py={4}>
          <Flex justify="space-between" align="center">
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              <Heading size="lg" color="white">D-Mail</Heading>
            </Link>
            <Stack direction="row" spacing={4}>
              <Button
                as={RouterLink}
                to="/auth/login"
                variant="ghost"
                colorScheme="brand"
              >
                Login
              </Button>
              <Button
                as={RouterLink}
                to="/auth/register"
                colorScheme="brand"
              >
                Register
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={20}>
        <Stack spacing={8}>
          <Stack spacing={4} textAlign="center">
            <Heading size="2xl" color="white">
              {title}
            </Heading>
            {description && (
              <Text fontSize="xl" color="gray.400" maxW="2xl" mx="auto">
                {description}
              </Text>
            )}
          </Stack>
          {children}
        </Stack>
      </Container>
      <Footer />
    </Box>
  )
}

export default PageTemplate 