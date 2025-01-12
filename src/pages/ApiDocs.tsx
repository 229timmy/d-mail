import { Stack, Text, Heading, Box, Code, Button, Flex } from '@chakra-ui/react'
import PageTemplate from '../components/PageTemplate'

const ApiDocs = () => {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/addresses',
      description: 'List all email addresses',
      example: `curl -X GET "https://api.d-mail.com/v1/addresses" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "addresses": [
    {
      "id": "addr_123",
      "address": "test@d-mail.com",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}`
    },
    {
      method: 'POST',
      path: '/api/v1/addresses',
      description: 'Create a new email address',
      example: `curl -X POST "https://api.d-mail.com/v1/addresses" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prefix": "test"}'`,
      response: `{
  "id": "addr_123",
  "address": "test@d-mail.com",
  "created_at": "2024-01-01T00:00:00Z"
}`
    },
    {
      method: 'DELETE',
      path: '/api/v1/addresses/:id',
      description: 'Delete an email address',
      example: `curl -X DELETE "https://api.d-mail.com/v1/addresses/addr_123" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "status": "success",
  "message": "Address deleted"
}`
    }
  ]

  return (
    <PageTemplate
      title="API Documentation"
      description="Integrate D-Mail into your applications with our REST API."
    >
      <Stack spacing={12}>
        <Stack spacing={4}>
          <Heading size="lg" color="white">Authentication</Heading>
          <Text color="gray.400">
            All API requests must include your API key in the Authorization header:
          </Text>
          <Box bg="gray.800" p={4} rounded="lg">
            <Code display="block" whiteSpace="pre" color="brand.300">
              Authorization: Bearer YOUR_API_KEY
            </Code>
          </Box>
        </Stack>

        <Stack spacing={8}>
          <Heading size="lg" color="white">Endpoints</Heading>
          {endpoints.map((endpoint, index) => (
            <Stack key={index} spacing={4} bg="gray.800" p={6} rounded="lg">
              <Flex align="center" gap={4}>
                <Code colorScheme={endpoint.method === 'GET' ? 'green' : endpoint.method === 'POST' ? 'blue' : 'red'} px={2} py={1}>
                  {endpoint.method}
                </Code>
                <Code color="brand.300">{endpoint.path}</Code>
              </Flex>
              <Text color="gray.400">{endpoint.description}</Text>
              <Box bg="gray.900" p={4} rounded="md">
                <Text color="gray.400" fontSize="sm" mb={2}>Example Request:</Text>
                <Code display="block" whiteSpace="pre" color="brand.300">
                  {endpoint.example}
                </Code>
              </Box>
              <Box bg="gray.900" p={4} rounded="md">
                <Text color="gray.400" fontSize="sm" mb={2}>Example Response:</Text>
                <Code display="block" whiteSpace="pre" color="brand.300">
                  {endpoint.response}
                </Code>
              </Box>
            </Stack>
          ))}
        </Stack>

        <Box textAlign="center">
          <Button
            size="lg"
            colorScheme="brand"
            onClick={() => window.location.href = '/docs'}
          >
            View Full Documentation
          </Button>
        </Box>
      </Stack>
    </PageTemplate>
  )
}

export default ApiDocs 