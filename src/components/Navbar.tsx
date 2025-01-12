import {
  Box,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Tooltip,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaSearch, FaMoon, FaSun, FaSync, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const isDark = useColorModeValue(false, true)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <Box 
      bg="gray.800" 
      py={4} 
      shadow="md" 
      position="fixed"
      w="full"
      zIndex={10}
      borderBottom="1px"
      borderColor="gray.700"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" gap={8}>
          <Flex align="center" gap={2} as={RouterLink} to="/">
            <FaEnvelope size={24} color="#7c4dff" />
            <Heading size="md" color="white">D-Mail</Heading>
          </Flex>

          {user ? (
            <>
              <InputGroup maxW="600px">
                <InputLeftElement pointerEvents="none">
                  <FaSearch color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search emails..."
                  bg="gray.700"
                  border={0}
                  _focus={{
                    bg: 'gray.600',
                    boxShadow: 'none',
                  }}
                />
              </InputGroup>

              <Flex gap={2}>
                <Tooltip label="Refresh">
                  <IconButton
                    aria-label="Refresh"
                    icon={<FaSync />}
                    variant="ghost"
                    colorScheme="brand"
                  />
                </Tooltip>
                <Tooltip label={isDark ? 'Light Mode' : 'Dark Mode'}>
                  <IconButton
                    aria-label="Toggle color mode"
                    icon={isDark ? <FaSun /> : <FaMoon />}
                    variant="ghost"
                    colorScheme="brand"
                  />
                </Tooltip>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<Avatar size="sm" bg="brand.500" icon={<FaUser fontSize="1.2rem" />} />}
                    variant="ghost"
                  />
                  <MenuList bg="gray.800" borderColor="gray.700">
                    <MenuItem
                      icon={<FaUser />}
                      onClick={() => navigate('/profile')}
                      bg="gray.800"
                      _hover={{ bg: 'gray.700' }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      icon={<FaCog />}
                      onClick={() => navigate('/settings')}
                      bg="gray.800"
                      _hover={{ bg: 'gray.700' }}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem
                      icon={<FaSignOutAlt />}
                      onClick={logout}
                      bg="gray.800"
                      _hover={{ bg: 'gray.700' }}
                      color="red.300"
                    >
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </>
          ) : (
            <Flex gap={4} ml="auto">
              <Button
                as={RouterLink}
                to="/auth/login"
                variant="ghost"
                colorScheme="brand"
              >
                Login
              </Button>
              <Button
                as={RouterLink}
                to="/auth/register"
                colorScheme="brand"
              >
                Sign Up
              </Button>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar 