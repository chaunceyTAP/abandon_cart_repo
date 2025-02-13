import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useAppContext } from '../context/Context'

export default function AppNavbar() {
  const { user, logoutUser, cart } = useAppContext()

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>Shop</Navbar.Brand>
        <Nav className='ms-auto'>
          <Nav.Link href='/'>Products</Nav.Link>
          <Nav.Link href='/cart'>Cart ({cart.length})</Nav.Link>
          {user ? (
            <>
              <Navbar.Text className='mx-3'>Hello, {user.name}</Navbar.Text>
              <Button variant='outline-light' onClick={logoutUser}>
                Logout
              </Button>
            </>
          ) : (
            <Nav.Link href='/login'>Login</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}
