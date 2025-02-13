import { createContext, useState, useContext } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  // User State
  const [user, setUser] = useState(null)

  // Cart State
  const [cart, setCart] = useState([])

  // Function to update user state (Login)
  const loginUser = (userData) => {
    setUser(userData)
  }

  // Function to log out the user
  const logoutUser = () => {
    setUser(null)
    setCart([]) // Clear cart on logout
  }

  // Function to add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  // Function to remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  return (
    <AppContext.Provider
      value={{ user, loginUser, logoutUser, cart, addToCart, removeFromCart }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Custom Hook
export const useAppContext = () => useContext(AppContext)
