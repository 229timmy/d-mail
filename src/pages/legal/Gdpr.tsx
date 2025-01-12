import { Stack, Text, Heading, UnorderedList, ListItem, Button, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import PageTemplate from '../../components/PageTemplate'

const Gdpr = () => {
  const navigate = useNavigate()
  
  const sections = [
    {
      title: 'Your GDPR Rights',
      content: `Under GDPR, you have the following rights:

• Right to Access: You can request a copy of your personal data.
• Right to Rectification: You can request corrections to your personal data.
• Right to Erasure: You can request deletion of your personal data.
• Right to Restrict Processing: You can limit how we use your data.
• Right to Data Portability: You can request a copy of your data in a portable format.
• Right to Object: You can object to our processing of your data.
• Rights Related to Automated Decision Making: You can request human intervention in automated decisions.`
    },
    {
      title: 'How We Process Your Data',
      content: `We process your personal data based on the following legal grounds:

• Contract Performance: To provide our email services
• Legal Obligation: To comply with legal requirements
• Legitimate Interests: To improve our services and protect against fraud
• Consent: When you explicitly agree to specific data processing

We ensure that all data processing is:
• Lawful, fair, and transparent
• Limited to specified purposes
• Minimized to what's necessary
• Accurate and up-to-date
• Stored only as long as necessary
• Secure and confidential`
    },
    {
      title: 'International Data Transfers',
      content: `When we transfer your data outside the EU/EEA, we ensure adequate protection through:

• EU Standard Contractual Clauses
• Adequacy decisions by the European Commission
• Appropriate security measures
• Regular audits of data protection practices`
    },
    {
      title: 'Data Protection Measures',
      content: `We implement appropriate technical and organizational measures including:

• Encryption of personal data
• Regular security assessments
• Access controls and authentication
• Staff training on data protection
• Incident response procedures
• Regular backups and disaster recovery`
    },
    {
      title: 'Data Protection Officer',
      content: `Our Data Protection Officer ensures compliance with GDPR and can be contacted at:

D-Mail Data Protection Officer
Email: dpo@d-mail.com
Address: 123 Privacy Street, San Francisco, CA 94105, United States`
    },
    {
      title: 'Exercising Your Rights',
      content: `To exercise your GDPR rights:

1. Log into your account and use the privacy settings
2. Contact our Data Protection Officer
3. Submit a formal request through our GDPR request form

We will respond to your request within 30 days.`
    }
  ]

  return (
    <PageTemplate
      title="GDPR Compliance"
      description="Information about your rights under the General Data Protection Regulation (GDPR)"
    >
      <Stack spacing={12} maxW="3xl" mx="auto">
        <Text color="gray.400">
          D-Mail is committed to protecting your privacy rights under the General Data Protection Regulation (GDPR). This page explains your rights and how we comply with GDPR requirements.
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

        <Box textAlign="center">
          <Button
            size="lg"
            colorScheme="brand"
            onClick={() => navigate('/contact')}
          >
            Contact Data Protection Officer
          </Button>
        </Box>
      </Stack>
    </PageTemplate>
  )
}

export default Gdpr 