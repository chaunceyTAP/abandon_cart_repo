import { useAppContext } from '../context/Context'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'

const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Headphones', price: 199 },
  { id: 4, name: 'Smartwatch', price: 249 },
  { id: 5, name: 'Tablet', price: 499 },
  { id: 6, name: 'Monitor', price: 299 },
  { id: 7, name: 'Keyboard', price: 99 },
  { id: 8, name: 'Mouse', price: 59 },
  { id: 9, name: 'Speaker', price: 149 },
  { id: 10, name: 'Charger', price: 39 },
]

export default function ProductList() {
  const { addToCart } = useAppContext()

  return (
    <Container>
      <h2 className='my-4'>Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button onClick={() => addToCart(product)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
