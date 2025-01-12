import { Stack, Text, Heading, Box, SimpleGrid, Icon, Progress } from '@chakra-ui/react'
import PageTemplate from '../components/PageTemplate'
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

const Status = () => {
  const services = [
    {
      name: 'Email Reception',
      status: 'operational',
      uptime: 99.99,
      latency: 120,
    },
    {
      name: 'Email Delivery',
      status: 'operational',
      uptime: 99.95,
      latency: 150,
    },
    {
      name: 'API',
      status: 'operational',
      uptime: 99.98,
      latency: 85,
    },
    {
      name: 'Web Interface',
      status: 'operational',
      uptime: 99.99,
      latency: 95,
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: 100,
      latency: 75,
    },
    {
      name: 'Database',
      status: 'degraded',
      uptime: 99.85,
      latency: 250,
      message: 'Experiencing higher than normal latency',
    },
  ]

  const incidents = [
    {
      date: '2024-01-15',
      title: 'API Performance Degradation',
      status: 'resolved',
      description: 'The API experienced higher than normal latency for approximately 45 minutes.',
    },
    {
      date: '2024-01-10',
      title: 'Scheduled Maintenance',
      status: 'completed',
      description: 'Successfully completed database optimization during scheduled maintenance window.',
    },
  ]

  return (
    <PageTemplate
      title="System Status"
      description="Real-time and historical status information for all D-Mail services."
    >
      <Stack spacing={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {services.map((service) => (
            <Stack
              key={service.name}
              spacing={4}
              bg="gray.800"
              p={6}
              rounded="lg"
            >
              <Flex align="center" justify="space-between">
                <Heading size="md" color="white">
                  {service.name}
                </Heading>
                <Icon
                  as={service.status === 'operational' ? FaCheckCircle : FaExclamationTriangle}
                  color={service.status === 'operational' ? 'green.400' : 'yellow.400'}
                  boxSize={5}
                />
              </Flex>
              <Stack spacing={2}>
                <Text color="gray.400">
                  Uptime: {service.uptime}%
                </Text>
                <Box>
                  <Text color="gray.400" mb={1}>
                    Latency: {service.latency}ms
                  </Text>
                  <Progress
                    value={100 - (service.latency / 5)}
                    colorScheme={service.latency < 200 ? 'green' : 'yellow'}
                    size="sm"
                    rounded="full"
                  />
                </Box>
                {service.message && (
                  <Text color="yellow.400" fontSize="sm">
                    {service.message}
                  </Text>
                )}
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>

        <Stack spacing={6}>
          <Heading size="lg" color="white">Recent Incidents</Heading>
          <Stack spacing={4}>
            {incidents.map((incident) => (
              <Stack
                key={incident.date}
                spacing={3}
                bg="gray.800"
                p={6}
                rounded="lg"
              >
                <Flex justify="space-between" align="center">
                  <Heading size="sm" color="white">
                    {incident.title}
                  </Heading>
                  <Text color="gray.400" fontSize="sm">
                    {incident.date}
                  </Text>
                </Flex>
                <Text color="gray.400">
                  {incident.description}
                </Text>
                <Text
                  color={incident.status === 'resolved' ? 'green.400' : 'blue.400'}
                  fontSize="sm"
                  textTransform="capitalize"
                >
                  {incident.status}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </PageTemplate>
  )
}

export default Status 