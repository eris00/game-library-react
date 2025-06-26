import Footer from "./components/Footer";
import Header from "./components/Header"
import Router from "./Router"
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Header />
      <Router />
      <Footer />
      <Toaster position="top-center" toastOptions={{
        style: {
          background: "#1a202c",
          color: "#facc15",
        }
      }} />
    </>

  )
}

export default App
