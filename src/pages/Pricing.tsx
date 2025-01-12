import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Badge,
  Divider,
} from '@chakra-ui/react'
import { FaCheck, FaTimes, FaEnvelope, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'
import Footer from '../components/Footer'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingTier {
  name: string
  price: string
  description: string
  features: PricingFeature[]
  highlighted?: boolean
  buttonText: string
  storageLimit: string
  addressLimit: string
  retentionDays: number
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out D-Mail',
    buttonText: 'Get Started',
    storageLimit: '100 MB',
    addressLimit: '3 addresses',
    retentionDays: 7,
    features: [
      { text: 'Up to 3 disposable addresses', included: true },
      { text: '100 MB storage', included: true },
      { text: '7-day email retention', included: true },
      { text: 'Basic spam protection', included: true },
      { text: 'Web access only', included: true },
      { text: 'Community support', included: true },
      { text: 'Custom domains', included: false },
      { text: 'API access', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$4.99',
    description: 'Everything you need for personal use',
    buttonText: 'Start Free Trial',
    storageLimit: '2 GB',
    addressLimit: '20 addresses',
    retentionDays: 30,
    highlighted: true,
    features: [
      { text: 'Up to 20 disposable addresses', included: true },
      { text: '2 GB storage', included: true },
      { text: '30-day email retention', included: true },
      { text: 'Advanced spam protection', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'Email support', included: true },
      { text: '1 custom domain', included: true },
      { text: 'Basic API access', included: true },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Business',
    price: '$12.99',
    description: 'For teams and power users',
    buttonText: 'Contact Sales',
    storageLimit: '5 GB',
    addressLimit: 'Unlimited',
    retentionDays: 90,
    features: [
      { text: 'Unlimited disposable addresses', included: true },
      { text: '5 GB storage', included: true },
      { text: '90-day email retention', included: true },
      { text: 'Enterprise spam protection', included: true },
      { text: 'Mobile app access', included: true },
      { text: '24/7 phone support', included: true },
      { text: 'Unlimited custom domains', included: true },
      { text: 'Full API access', included: true },
      { text: 'Priority support', included: true },
    ],
  },
]

const PricingCard = ({ tier }: { tier: PricingTier }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const bgColor = useColorModeValue('white', 'gray.800')
  const highlightedBg = useColorModeValue('brand.50', 'gray.700')

  return (
    <Box
      position="relative"
      bg={tier.highlighted ? highlightedBg : bgColor}
      border="1px solid"
      borderColor={borderColor}
      rounded="xl"
      shadow={tier.highlighted ? 'xl' : 'md'}
      p={6}
      transform={tier.highlighted ? 'scale(1.05)' : undefined}
      zIndex={tier.highlighted ? 1 : 0}
    >
      {tier.highlighted && (
        <Badge
          colorScheme="brand"
          position="absolute"
          top="-4"
          right="-4"
          rounded="full"
          px={3}
          py={1}
          fontSize="sm"
          textTransform="none"
        >
          Most Popular
        </Badge>
      )}

      <VStack spacing={4} align="stretch">
        <Stack spacing={1}>
          <Heading size="lg">{tier.name}</Heading>
          <Flex align="baseline" gap={2}>
            <Text fontSize="4xl" fontWeight="bold">
              {tier.price}
            </Text>
            <Text fontSize="md" color="gray.500">
              /month
            </Text>
          </Flex>
          <Text color="gray.500">{tier.description}</Text>
        </Stack>

        <Button
          size="lg"
          colorScheme={tier.highlighted ? 'brand' : 'gray'}
          variant={tier.highlighted ? 'solid' : 'outline'}
          w="full"
        >
          {tier.buttonText}
        </Button>

        <Stack spacing={4}>
          <Stack spacing={2}>
            <Flex align="center" gap={2}>
              <Icon as={FaEnvelope} color="brand.500" />
              <Text>{tier.addressLimit}</Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Icon as={FaCheck} color="green.500" />
              <Text>{tier.storageLimit} storage</Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Icon as={FaCheck} color="green.500" />
              <Text>{tier.retentionDays}-day retention</Text>
            </Flex>
          </Stack>

          <Divider />

          <List spacing={3}>
            {tier.features.map((feature, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <ListIcon
                  as={feature.included ? FaCheck : FaTimes}
                  color={feature.included ? 'green.500' : 'red.500'}
                  fontSize="1.2em"
                />
                <Text color={feature.included ? undefined : 'gray.500'}>
                  {feature.text}
                </Text>
              </ListItem>
            ))}
          </List>
        </Stack>
      </VStack>
    </Box>
  )
}

const Pricing = () => {
  return (
    <Box minH="100vh" bg="gray.900">
      <Container maxW="container.xl" py={20}>
        <Stack spacing={12}>
          <Stack spacing={4} textAlign="center">
            <Heading size="2xl" color="white">
              Simple, transparent pricing
            </Heading>
            <Text fontSize="xl" color="gray.400" maxW="2xl" mx="auto">
              Choose the plan that's right for you. All plans include a 14-day free trial.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 8, lg: 4 }}>
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </SimpleGrid>

          <Stack spacing={8} textAlign="center">
            <Heading size="lg" color="white">
              Frequently Asked Questions
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="4xl" mx="auto">
              <Stack spacing={4} p={6} bg="gray.800" rounded="lg">
                <Heading size="md" color="white">
                  Can I upgrade or downgrade my plan?
                </Heading>
                <Text color="gray.400">
                  Yes, you can change your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle.
                </Text>
              </Stack>
              <Stack spacing={4} p={6} bg="gray.800" rounded="lg">
                <Heading size="md" color="white">
                  What payment methods do you accept?
                </Heading>
                <Text color="gray.400">
                  We accept all major credit cards, PayPal, and cryptocurrency payments.
                </Text>
              </Stack>
              <Stack spacing={4} p={6} bg="gray.800" rounded="lg">
                <Heading size="md" color="white">
                  Is there a long-term contract?
                </Heading>
                <Text color="gray.400">
                  No, all plans are month-to-month and you can cancel at any time.
                </Text>
              </Stack>
              <Stack spacing={4} p={6} bg="gray.800" rounded="lg">
                <Heading size="md" color="white">
                  What happens to my emails if I cancel?
                </Heading>
                <Text color="gray.400">
                  Upon cancellation, your emails will be retained for 7 days before being permanently deleted. Make sure to back up any important data before canceling.
                </Text>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </Box>
  )
}

export default Pricing 