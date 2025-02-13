import { useAppContext } from '../context/Context'
import { Card, Button, Container } from 'react-bootstrap'

export default function Cart() {
  const { cart, removeFromCart, user } = useAppContext()
const processCart = async ()=>{
    const payload = {
	"header": {
		"msgType": "xdmEntityCreate",
		"msgId": "d70ed27c-88e4-4e98-88e3-53eb887365f9",
		"msgVersion": "1.0",
		"xactionId": "b3dad55c-810b-4ded-91ef-f22e211f9071",
		"datasetId": "67ae41f8d0ee342af2a35634",
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
			"_id": "string",
			"_experience": {
				"campaign": {
					"orchestration": {
						"eventID": "2dde89a72a11d526807a1d7867cf139a9d391ea3d49e90b55eef3dff645262d7"
					}
				}
			},
			"timestamp": "2018-05-29T00:00:00.000Z",
   "productListItems": cart.map((item) => ({
         priceTotal: item.price,
          SKU: item.name,
          quantity:item.quantity
   }))
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
        console.log('Login event sent to AEP successfully:', response)
      } else {
        console.error('Failed to send PURCHASE event:', response)
      }
    } catch (error) {
      console.error('Error sending PURCHASE event:', error)
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
      <Button onClick={()=>{processCart()}} disabled={cart.length === 0 || !user}>
        Purchase
      </Button>
      <br />
      <br />
      <br />
      <br />
    </Container>
  )
}
