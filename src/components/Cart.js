import { useAppContext } from '../context/Context'
import { Card, Button, Container } from 'react-bootstrap'

export default function Cart() {
  const { cart, removeFromCart, user } = useAppContext()
  const submitCart = async () => {
    // if (!user || !user.name || !user.email) {
    //   alert('You must be logged in to submit your cart.')
    //   return
    // }
    const payload = {
      name: user.name,
      email: user.email,
      products: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    }

    try {
      const response = await fetch(
        'https://your-aep-endpoint.com/submit-cart',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      if (response.ok) {
        alert('Cart submitted successfully!')
      } else {
        console.error('Failed to submit cart:', response.statusText)
        alert('Failed to submit cart.')
      }
    } catch (error) {
      console.error('Error submitting cart:', error)
      alert('An error occurred while submitting the cart.')
    }
  }

  return (
    <Container>
      <h2 className='my-4'>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <Card key={item.id} className='mb-3'>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>Price: ${item.price}</Card.Text>
              <Card.Text>Quantity: {item.quantity}</Card.Text>
              <Button variant='danger' onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
      <Button onClick={submitCart} disabled={cart.length === 0 || !user}>
        Purchase
      </Button>
      <br />
      <br />
      <br />
      <br />
    </Container>
  )
}
