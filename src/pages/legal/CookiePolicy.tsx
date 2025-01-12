import { Stack, Text, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import PageTemplate from '../../components/PageTemplate'

const CookiePolicy = () => {
  const cookieTypes = [
    {
      category: 'Essential',
      purpose: 'These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take such as logging in or filling in forms.',
      examples: ['Session ID', 'CSRF token', 'Authentication status']
    },
    {
      category: 'Functional',
      purpose: 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers.',
      examples: ['Language preferences', 'Theme settings', 'Email display preferences']
    },
    {
      category: 'Analytics',
      purpose: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: ['Pages visited', 'Time spent on site', 'Error encounters']
    },
    {
      category: 'Performance',
      purpose: 'These cookies help us measure and improve the performance of our site. They help us understand which pages are the most and least popular.',
      examples: ['Load times', 'Server response time', 'Error rates']
    }
  ]

  const sections = [
    {
      title: 'What Are Cookies',
      content: `Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better user experience.`
    },
    {
      title: 'How We Use Cookies',
      content: `We use cookies to:
• Keep you signed in
• Remember your preferences
• Understand how you use our website
• Improve our services
• Protect against fraud and abuse`
    },
    {
      title: 'Cookie Management',
      content: `You can control and manage cookies in your browser settings. You can:
• View cookies stored on your computer
• Delete all or specific cookies
• Block all or specific types of cookies
• Configure cookie settings for specific websites

Please note that blocking some types of cookies may impact your experience on our website.`
    },
    {
      title: 'Updates to This Policy',
      content: `We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.`
    }
  ]

  return (
    <PageTemplate
      title="Cookie Policy"
      description="Last updated: January 2024"
    >
      <Stack spacing={12} maxW="3xl" mx="auto">
        <Text color="gray.400">
          This Cookie Policy explains how D-Mail uses cookies and similar technologies to recognize you when you visit our website.
        </Text>

        {sections.map((section, index) => (
          <Stack key={index} spacing={4}>
            <Heading size="md" color="white">
              {section.title}
            </Heading>
            <Text color="gray.400" whiteSpace="pre-line">
              {section.content}
            </Text>
          </Stack>
        ))}

        <Stack spacing={4}>
          <Heading size="md" color="white">
            Types of Cookies We Use
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="gray.300">Category</Th>
                <Th color="gray.300">Purpose</Th>
                <Th color="gray.300">Examples</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cookieTypes.map((type, index) => (
                <Tr key={index}>
                  <Td color="white" fontWeight="medium">
                    {type.category}
                  </Td>
                  <Td color="gray.400">
                    {type.purpose}
                  </Td>
                  <Td color="gray.400">
                    {type.examples.join(', ')}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Stack>
    </PageTemplate>
  )
}

export default CookiePolicy 