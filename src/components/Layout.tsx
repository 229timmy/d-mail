import { Box, Container, Flex, useColorModeValue } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box minH="100vh" bg="gray.900">
      <Navbar />
      <Flex>
        <Box
          w="280px"
          h="calc(100vh - 72px)"
          bg="gray.800"
          borderRight="1px"
          borderColor={borderColor}
          position="fixed"
          top="72px"
          left="0"
          overflowY="auto"
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#4A5568',
              borderRadius: '4px',
            },
          }}
        >
          <Sidebar />
        </Box>
        <Box
          flex="1"
          ml="280px"
          p={8}
          bg="gray.900"
          minH="calc(100vh - 72px)"
          mt="72px"
          overflowX="hidden"
          position="relative"
        >
          <Container maxW="container.xl" p={0}>
            <Outlet />
          </Container>
        </Box>
      </Flex>
    </Box>
  )
}

export default Layout 