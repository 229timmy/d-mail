import { SimpleGrid, Stack, Text, Icon, Heading, Button, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import PageTemplate from '../components/PageTemplate'
import { FaBuilding, FaUsersCog, FaChartLine, FaHeadset, FaShieldAlt, FaTools } from 'react-icons/fa'

const Enterprise = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: FaBuilding,
      title: 'Custom Deployment',
      description: 'Deploy D-Mail on your own infrastructure or use our dedicated cloud environment.',
    },
    {
      icon: FaUsersCog,
      title: 'User Management',
      description: 'Advanced user management with roles, permissions, and directory integration.',
    },
    {
      icon: FaChartLine,
      title: 'Analytics & Reporting',
      description: 'Detailed insights into email usage, security threats, and user activity.',
    },
    {
      icon: FaHeadset,
      title: 'Dedicated Support',
      description: '24/7 priority support with dedicated account manager and SLA guarantees.',
    },
    {
      icon: FaShieldAlt,
      title: 'Enhanced Security',
      description: 'Additional security features including SSO, audit logs, and custom security policies.',
    },
    {
      icon: FaTools,
      title: 'Custom Integration',
      description: 'Integration with your existing tools and workflows through our enterprise API.',
    },
  ]

  return (
    <PageTemplate
      title="Enterprise"
      description="Powerful features and dedicated support for organizations that need more."
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

      <Box textAlign="center" mt={12}>
        <Button
          size="lg"
          colorScheme="brand"
          px={12}
          fontSize="md"
          rounded="full"
          onClick={() => navigate('/contact')}
        >
          Contact Sales
        </Button>
      </Box>
    </PageTemplate>
  )
}

export default Enterprise 