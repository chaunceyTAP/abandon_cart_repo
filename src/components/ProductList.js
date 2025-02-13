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

  let dt = new Date().getTime()
  const eventId = 'xxxxxxxx-xxxx-8xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )

export default function ProductList() {
  const { addToCart, cart, user } = useAppContext()
  const processCart = async (product)=>{
   addToCart(product)
    const payload = {
	"header": {
		"msgType": "xdmEntityCreate",
		"msgId": "d70ed27c-88e4-4e98-88e3-53eb887365f9",
		"msgVersion": "1.0",
		"xactionId": "b3dad55c-810b-4ded-91ef-f22e211f9071",
		"datasetId": "67ae3ccf635e342aee49ee1f",
		"imsOrgId": "18F332CC5B4DB4150A495DF0@AdobeOrg",
		"schemaRef": {
			"id": "https://ns.adobe.com/taplondonptrsd/schemas/1821e745e4835f357400385329571973fae47eee99d5ce51",
			"contentType": "application/vnd.adobe.xed-full+json;version=1"
		},
		"source": {
			"name": "Journeys"
		},
		"strictValidation": true
	},
	"body": {
		"xdmMeta": {
			"schemaRef": {
				"id": "https://ns.adobe.com/taplondonptrsd/schemas/1821e745e4835f357400385329571973fae47eee99d5ce51",
				"contentType": "application/vnd.adobe.xed-full+json;version=1"
			}
		},
		"xdmEntity": {
			"_taplondonptrsd": {
				"email": {
					"address": user.email
				}
			},
			"_id": eventID,
			"_experience": {
				"campaign": {
					"orchestration": {
						"eventID": "865d42065aa9a89e5ca569a1a9ba62b46f1a95c74ceea5ced25823d72c555558"
					}
				}
			},
			"timestamp": new Date().toISOString(),
   "productListItems": [{
         priceTotal: product.price,
          SKU: product.name,
          
   }]
   }
		}
	}

    console.log(payload)
    // Send login event to AEP
    try {
      const response = await fetch(
        'https://dcs.adobedc.net/collection/e0958467cfc1dc3938c59affa11874dde158b2f903f3dfe9c45b4e331eb97669?synchronousValidation=true',
        {
          method: 'POST',

          body: JSON.stringify(payload),
        }
      )

      if (response.ok) {
        console.log('updated_cart event sent to AEP successfully:', response)
      } else {
        console.error('Failed to send updated_cart event:', response)
      }
    } catch (error) {
      console.error('Error sending updated_cart event:', error)
    }
  
  }

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
                <Button onClick={() => processCart(product)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
 }