import { AppProvider } from '../context/Context'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from '../components/MyNav'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <MyNav />
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
