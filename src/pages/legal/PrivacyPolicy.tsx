import { Stack, Text, Heading } from '@chakra-ui/react'
import PageTemplate from '../../components/PageTemplate'

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, including:
• Account information (email, password)
• Usage data (email addresses created, email metadata)
• Technical information (IP address, browser type)
We do not read or store the content of your emails.`
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to:
• Provide and maintain our services
• Protect against spam and abuse
• Improve our services
• Communicate with you about your account`
    },
    {
      title: 'Data Storage and Security',
      content: `Your data is stored securely in SOC 2 compliant data centers. We employ industry-standard security measures including:
• End-to-end encryption
• Regular security audits
• Access controls and monitoring
• Secure backup systems`
    },
    {
      title: 'Data Retention',
      content: `We retain your data for as long as your account is active or as needed to provide you services. You can request deletion of your data at any time through your account settings.`
    },
    {
      title: 'Third-Party Services',
      content: `We may use third-party services for:
• Payment processing
• Analytics
• Infrastructure and hosting
All third-party providers are carefully selected and bound by data protection agreements.`
    },
    {
      title: 'Your Rights',
      content: `You have the right to:
• Access your personal data
• Correct inaccurate data
• Request deletion of your data
• Export your data
• Object to data processing
Contact us to exercise these rights.`
    },
    {
      title: 'Updates to This Policy',
      content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.`
    },
    {
      title: 'Contact Us',
      content: `If you have any questions about this privacy policy, please contact us at privacy@d-mail.com`
    }
  ]

  return (
    <PageTemplate
      title="Privacy Policy"
      description="Last updated: January 2024"
    >
      <Stack spacing={12} maxW="3xl" mx="auto">
        <Text color="gray.400">
          At D-Mail, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information.
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

export default PrivacyPolicy 