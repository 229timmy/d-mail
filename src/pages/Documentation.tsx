import { Stack, Text, Heading, Box, SimpleGrid, Icon, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import PageTemplate from '../components/PageTemplate'
import { FaBook, FaCode, FaRocket, FaQuestion } from 'react-icons/fa'

const Documentation = () => {
  const navigate = useNavigate()

  const sections = [
    {
      icon: FaRocket,
      title: 'Getting Started',
      description: 'Learn the basics of D-Mail and set up your first disposable email address.',
      links: [
        { title: 'Quick Start Guide', to: '/docs/quickstart' },
        { title: 'Basic Concepts', to: '/docs/concepts' },
        { title: 'First Steps', to: '/docs/first-steps' },
      ]
    },
    {
      icon: FaBook,
      title: 'User Guide',
      description: 'Detailed documentation about all features and functionalities.',
      links: [
        { title: 'Managing Addresses', to: '/docs/managing-addresses' },
        { title: 'Email Filtering', to: '/docs/email-filtering' },
        { title: 'Security Settings', to: '/docs/security-settings' },
      ]
    },
    {
      icon: FaCode,
      title: 'API Reference',
      description: 'Complete API documentation for developers.',
      links: [
        { title: 'REST API', to: '/api' },
        { title: 'Authentication', to: '/api#authentication' },
        { title: 'Webhooks', to: '/api#webhooks' },
      ]
    },
    {
      icon: FaQuestion,
      title: 'FAQs',
      description: 'Common questions and troubleshooting guides.',
      links: [
        { title: 'Common Issues', to: '/docs/common-issues' },
        { title: 'Best Practices', to: '/docs/best-practices' },
        { title: 'Troubleshooting', to: '/docs/troubleshooting' },
      ]
    },
  ]

  return (
    <PageTemplate
      title="Documentation"
      description="Everything you need to know about using D-Mail effectively."
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {sections.map((section, index) => (
          <Stack
            key={index}
            spacing={6}
            bg="gray.800"
            p={8}
            rounded="lg"
            align="flex-start"
          >
            <Icon as={section.icon} boxSize={10} color="brand.400" />
            <Stack spacing={2}>
              <Heading size="md" color="white">
                {section.title}
              </Heading>
              <Text color="gray.400">
                {section.description}
              </Text>
            </Stack>
            <Stack spacing={2} w="full">
              {section.links.map((link, linkIndex) => (
                <Button
                  key={linkIndex}
                  variant="ghost"
                  colorScheme="brand"
                  justifyContent="flex-start"
                  w="full"
                  onClick={() => navigate(link.to)}
                >
                  {link.title}
                </Button>
              ))}
            </Stack>
          </Stack>
        ))}
      </SimpleGrid>
    </PageTemplate>
  )
}

export default Documentation 