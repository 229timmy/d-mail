import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaEnvelope, FaShieldAlt, FaClock, FaGlobe, FaRocket } from 'react-icons/fa'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

interface FeatureProps {
  title: string
  text: string
  icon: React.ElementType
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack spacing={4} bg="gray.800" p={8} rounded="lg">
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="brand.400"
        rounded="full"
        bg="gray.700"
        mb={1}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Heading size="md" color="white">
        {title}
      </Heading>
      <Text color="gray.400" fontSize="md">
        {text}
      </Text>
    </Stack>
  )
}

const Landing = () => {
  return (
    <Box minH="100vh" bg="gray.900">
      <Navbar />
      
      {/* Hero Section */}
      <Box pt="72px">  {/* Added padding-top to account for fixed navbar */}
        <Container maxW="container.xl" py={20}>
          <Stack spacing={12}>
            <Stack spacing={8} align="center" textAlign="center">
              <Heading size="3xl" color="white">
                Disposable Email Addresses<br />
                for Your Privacy
              </Heading>
              <Text fontSize="xl" color="gray.400" maxW="2xl">
                Create unlimited disposable email addresses to protect your privacy.
                Perfect for signups, trials, and keeping your inbox clean.
              </Text>
              <Button
                as={RouterLink}
                to="/auth/register"
                size="lg"
                colorScheme="brand"
                px={12}
                fontSize="md"
                rounded="full"
              >
                Get Started - It's Free
              </Button>
            </Stack>

            {/* Rest of your landing page content */}
            {/* Features Section */}
            <Box bg="gray.900" py={20}>
              <Container maxW="container.xl">
                <Stack spacing={16}>
                  <Stack spacing={4} textAlign="center">
                    <Heading size="2xl" color="white">
                      Why Choose D-Mail?
                    </Heading>
                    <Text fontSize="xl" color="gray.400" maxW="2xl" mx="auto">
                      Protect your privacy with our advanced features and secure infrastructure.
                    </Text>
                  </Stack>

                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    <Feature
                      icon={FaShieldAlt}
                      title="Privacy First"
                      text="Create disposable email addresses that protect your real identity. Perfect for online signups and trials."
                    />
                    <Feature
                      icon={FaClock}
                      title="Auto-Expiring"
                      text="Set automatic expiration times for your disposable addresses. No need to manually clean up."
                    />
                    <Feature
                      icon={FaGlobe}
                      title="Custom Domains"
                      text="Use your own domain names for disposable addresses. Full control over your email infrastructure."
                    />
                    <Feature
                      icon={FaRocket}
                      title="Instant Setup"
                      text="Get started in seconds. No credit card required for basic features."
                    />
                    <Feature
                      icon={FaEnvelope}
                      title="Smart Filtering"
                      text="Advanced spam protection and smart filtering keeps your inbox clean."
                    />
                    <Feature
                      icon={FaShieldAlt}
                      title="End-to-End Security"
                      text="Your emails are encrypted end-to-end. Only you can access your messages."
                    />
                  </SimpleGrid>
                </Stack>
              </Container>
            </Box>

            {/* CTA Section */}
            <Stack spacing={8} alignItems="center" textAlign="center">
              <Heading size="xl" color="white">
                Ready to take control of your inbox?
              </Heading>
              <Button
                as={RouterLink}
                to="/auth/register"
                size="lg"
                colorScheme="brand"
                px={12}
                fontSize="md"
                rounded="full"
              >
                Get Started - It's Free
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Landing 