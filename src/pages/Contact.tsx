import {
  Stack,
  Text,
  Heading,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import PageTemplate from '../components/PageTemplate'

const Contact = () => {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: 'Message sent!',
        description: "We'll get back to you as soon as possible.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
      })
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <PageTemplate
      title="Contact Us"
      description="Get in touch with our team for support, sales inquiries, or general questions."
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} maxW="4xl" mx="auto">
        <Stack spacing={8}>
          <Stack spacing={4} bg="gray.800" p={6} rounded="lg">
            <Heading size="md" color="white">
              Sales Inquiries
            </Heading>
            <Text color="gray.400">
              Interested in enterprise features or volume pricing? Our sales team is here to help.
            </Text>
            <Text color="brand.400" fontSize="lg">
              sales@d-mail.com
            </Text>
          </Stack>

          <Stack spacing={4} bg="gray.800" p={6} rounded="lg">
            <Heading size="md" color="white">
              Technical Support
            </Heading>
            <Text color="gray.400">
              Need help with your account or experiencing technical issues? Our support team is available 24/7.
            </Text>
            <Text color="brand.400" fontSize="lg">
              support@d-mail.com
            </Text>
          </Stack>

          <Stack spacing={4} bg="gray.800" p={6} rounded="lg">
            <Heading size="md" color="white">
              Office Location
            </Heading>
            <Text color="gray.400">
              123 Privacy Street
              <br />
              San Francisco, CA 94105
              <br />
              United States
            </Text>
          </Stack>
        </Stack>

        <Stack
          as="form"
          onSubmit={handleSubmit}
          spacing={6}
          bg="gray.800"
          p={8}
          rounded="lg"
        >
          <Heading size="md" color="white">
            Send us a message
          </Heading>

          <FormControl isRequired>
            <FormLabel color="gray.300">Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              bg="gray.700"
              border={0}
              _focus={{ ring: 2, ringColor: 'brand.500' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.300">Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              bg="gray.700"
              border={0}
              _focus={{ ring: 2, ringColor: 'brand.500' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.300">Category</FormLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              bg="gray.700"
              border={0}
              _focus={{ ring: 2, ringColor: 'brand.500' }}
            >
              <option value="">Select a category</option>
              <option value="sales">Sales Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="billing">Billing Question</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.300">Subject</FormLabel>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              bg="gray.700"
              border={0}
              _focus={{ ring: 2, ringColor: 'brand.500' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.300">Message</FormLabel>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              bg="gray.700"
              border={0}
              _focus={{ ring: 2, ringColor: 'brand.500' }}
              rows={5}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="brand"
            size="lg"
            isLoading={isSubmitting}
          >
            Send Message
          </Button>
        </Stack>
      </SimpleGrid>
    </PageTemplate>
  )
}

export default Contact 