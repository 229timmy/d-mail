import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Heading,
  Icon,
  Flex,
  Divider,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/d-mail' },
    { icon: FaTwitter, href: 'https://twitter.com/d_mail' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/d-mail' },
  ]

  const productLinks = [
    { text: 'Features', to: '/features' },
    { text: 'Pricing', to: '/pricing' },
    { text: 'Security', to: '/security' },
    { text: 'Enterprise', to: '/enterprise' },
  ]

  const supportLinks = [
    { text: 'Documentation', to: '/docs' },
    { text: 'API', to: '/api' },
    { text: 'Status', to: '/status' },
    { text: 'Contact', to: '/contact' },
  ]

  const legalLinks = [
    { text: 'Privacy Policy', to: '/legal/privacy' },
    { text: 'Terms of Service', to: '/legal/terms' },
    { text: 'Cookie Policy', to: '/legal/cookies' },
    { text: 'GDPR', to: '/legal/gdpr' },
  ]

  return (
    <Box borderTop="1px solid" borderColor={borderColor} mt={20} py={10}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          <Stack spacing={4}>
            <Heading size="md">D-Mail</Heading>
            <Text color="gray.500">
              Secure, disposable email addresses for your privacy needs.
            </Text>
            <Stack direction="row" spacing={4}>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  isExternal
                  _hover={{ color: 'brand.500' }}
                >
                  <Icon as={social.icon} boxSize={6} color="gray.500" cursor="pointer" />
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={4}>
            <Heading size="sm">Product</Heading>
            <Stack spacing={2} color="gray.500">
              {productLinks.map((link, index) => (
                <Link
                  key={index}
                  as={RouterLink}
                  to={link.to}
                  _hover={{ color: 'brand.500' }}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={4}>
            <Heading size="sm">Support</Heading>
            <Stack spacing={2} color="gray.500">
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  as={RouterLink}
                  to={link.to}
                  _hover={{ color: 'brand.500' }}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={4}>
            <Heading size="sm">Legal</Heading>
            <Stack spacing={2} color="gray.500">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  as={RouterLink}
                  to={link.to}
                  _hover={{ color: 'brand.500' }}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Stack>
        </SimpleGrid>

        <Divider my={8} />

        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text color="gray.500">
            © {new Date().getFullYear()} D-Mail. All rights reserved.
          </Text>
          <Text color="gray.500">
            Made with ❤️ for privacy
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer 