import { SimpleGrid, Stack, Text, Icon, Heading } from '@chakra-ui/react'
import PageTemplate from '../components/PageTemplate'
import { FaLock, FaShieldAlt, FaUserSecret, FaKey, FaBug, FaServer } from 'react-icons/fa'

const Security = () => {
  const features = [
    {
      icon: FaLock,
      title: 'End-to-End Encryption',
      description: 'All emails are encrypted in transit and at rest using industry-standard encryption protocols.',
    },
    {
      icon: FaShieldAlt,
      title: 'Advanced Threat Protection',
      description: 'Real-time scanning of all incoming emails for malware, phishing attempts, and other threats.',
    },
    {
      icon: FaUserSecret,
      title: 'Privacy by Design',
      description: 'We don\'t track you or sell your data. Your privacy is our top priority.',
    },
    {
      icon: FaKey,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account with 2FA support.',
    },
    {
      icon: FaBug,
      title: 'Bug Bounty Program',
      description: 'We work with security researchers to continuously improve our security.',
    },
    {
      icon: FaServer,
      title: 'Secure Infrastructure',
      description: 'Our infrastructure is hosted in SOC 2 compliant data centers with 24/7 monitoring.',
    },
  ]

  return (
    <PageTemplate
      title="Security"
      description="Learn about our comprehensive security measures that keep your data safe and private."
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

export default Security 