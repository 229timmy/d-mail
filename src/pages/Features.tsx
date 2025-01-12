import { SimpleGrid, Stack, Text, Icon, Heading } from '@chakra-ui/react'
import PageTemplate from '../components/PageTemplate'
import { FaShieldAlt, FaClock, FaGlobe, FaRocket, FaEnvelope, FaLock } from 'react-icons/fa'

const Features = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: 'Privacy First',
      description: 'Create disposable email addresses that protect your real identity. Perfect for online signups and trials.',
    },
    {
      icon: FaClock,
      title: 'Auto-Expiring Addresses',
      description: 'Set automatic expiration times for your disposable addresses. No need to manually clean up.',
    },
    {
      icon: FaGlobe,
      title: 'Custom Domains',
      description: 'Use your own domain names for disposable addresses. Full control over your email infrastructure.',
    },
    {
      icon: FaRocket,
      title: 'Instant Setup',
      description: 'Get started in seconds. No credit card required for basic features.',
    },
    {
      icon: FaEnvelope,
      title: 'Smart Filtering',
      description: 'Advanced spam protection and smart filtering keeps your inbox clean.',
    },
    {
      icon: FaLock,
      title: 'End-to-End Security',
      description: 'Your emails are encrypted end-to-end. Only you can access your messages.',
    },
  ]

  return (
    <PageTemplate
      title="Features"
      description="Discover all the powerful features that make D-Mail the best choice for disposable email addresses."
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {features.map((feature, index) => (
          <Stack
            key={index}
            spacing={4}
            bg="gray.800"
            p={8}
            rounded="lg"
            align="flex-start"
          >
            <Icon as={feature.icon} boxSize={10} color="brand.400" />
            <Stack spacing={2}>
              <Heading size="md" color="white">
                {feature.title}
              </Heading>
              <Text color="gray.400">
                {feature.description}
              </Text>
            </Stack>
          </Stack>
        ))}
      </SimpleGrid>
    </PageTemplate>
  )
}

export default Features 