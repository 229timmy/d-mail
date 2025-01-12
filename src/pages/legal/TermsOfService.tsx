import { Stack, Text, Heading, OrderedList, ListItem } from '@chakra-ui/react'
import PageTemplate from '../../components/PageTemplate'

const TermsOfService = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using D-Mail's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.`
    },
    {
      title: '2. Description of Service',
      content: `D-Mail provides disposable email services that allow users to create temporary email addresses for privacy protection. The service includes:
• Creation of disposable email addresses
• Email forwarding and management
• Spam filtering and protection
• Account management tools`
    },
    {
      title: '3. User Responsibilities',
      content: `You agree to:
• Provide accurate account information
• Maintain the security of your account
• Not use the service for illegal activities
• Not attempt to breach our security measures
• Not send spam or malicious content
• Not impersonate others`
    },
    {
      title: '4. Account Terms',
      content: `• You must be 13 years or older to use this service
• You are responsible for maintaining the security of your account
• You are responsible for all activities that occur under your account
• You must notify us immediately of any unauthorized use of your account`
    },
    {
      title: '5. Service Limitations',
      content: `• Email storage limits apply based on your plan
• We may impose usage limits to prevent abuse
• We reserve the right to delete inactive accounts
• Service availability may vary and is not guaranteed`
    },
    {
      title: '6. Intellectual Property',
      content: `The service and its original content, features, and functionality are owned by D-Mail and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.`
    },
    {
      title: '7. Termination',
      content: `We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including:
• Violation of these Terms
• Suspected illegal activity
• Extended period of inactivity
• At our sole discretion`
    },
    {
      title: '8. Limitation of Liability',
      content: `D-Mail shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.`
    },
    {
      title: '9. Changes to Terms',
      content: `We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "last updated" date.`
    },
    {
      title: '10. Contact',
      content: `If you have any questions about these Terms, please contact us at legal@d-mail.com`
    }
  ]

  return (
    <PageTemplate
      title="Terms of Service"
      description="Last updated: January 2024"
    >
      <Stack spacing={12} maxW="3xl" mx="auto">
        <Text color="gray.400">
          Please read these Terms of Service carefully before using D-Mail's services. These terms govern your use of our website and services.
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
      </Stack>
    </PageTemplate>
  )
}

export default TermsOfService 