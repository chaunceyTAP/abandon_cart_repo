import { useAppContext } from '../context/Context'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap'
// import { loadEnvConfig } from '@next/env'
// import '../../envConfig.js'
function Login() {
  const envtest = () => {
    // const projectDir = process.cwd()
    // loadEnvConfig(projectDir)
    const blah = process.env.SANDBOX_NAME
    console.log(blah)
    console.log('this is the env test')
    return blah
  }
  envtest()
  const { user, loginUser } = useAppContext()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  let dt = new Date().getTime()
  const eventId = 'xxxxxxxx-xxxx-8xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  // Redirect if user is already logged in
  useEffect(() => {
    if (user && user.name && user.email && user.password) {
      router.push('/') // Redirect to dashboard or another page
    }
  }, [user, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    loginUser(formData)
    const payload = {
      header: {
        msgType: 'xdmEntityCreate',
        msgId: 'b6b60754-ca9f-4f82-a40f-d3fc93554478',
        msgVersion: '1.0',
        xactionId: 'a54cabf5-cf94-44f8-93ee-4af15f2cf7ee',
        datasetId: '67ad176f47602e2aef0f999f',
        imsOrgId: '18F332CC5B4DB4150A495DF0@AdobeOrg',
        schemaRef: {
          id: 'https://ns.adobe.com/taplondonptrsd/schemas/25000f93e3a2af3fcbae41ea180d8dbebeda3d937bb62b06',
          contentType: 'application/vnd.adobe.xed-full+json;version=1',
        },
        source: {
          name: 'Journeys',
        },
        strictValidation: true,
      },
      body: {
        xdmMeta: {
          schemaRef: {
            id: 'https://ns.adobe.com/taplondonptrsd/schemas/25000f93e3a2af3fcbae41ea180d8dbebeda3d937bb62b06',
            contentType: 'application/vnd.adobe.xed-full+json;version=1',
          },
        },
        xdmEntity: {
          _taplondonptrsd: {
            email: {
              address: formData.email,
            },
          },
          _id: eventId,
          _experience: {
            campaign: {
              orchestration: {
                eventID:
                  'c23cc36651be08ba8a00340171e67c327c70c86cdf056582208e692c8dc37263',
              },
            },
          },
          person: {
            name: {
              firstName: formData.name,
            },
          },
          timestamp: new Date().toISOString(),
        },
      },
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
        console.error('Failed to send login event:', response)
      }
    } catch (error) {
      console.error('Error sending login event:', error)
    }
  }

  return (
    <Container>
      <br />
      <br />
      <br />
      <br />
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='firstname'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
