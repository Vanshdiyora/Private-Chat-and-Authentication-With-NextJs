import "@/styles/globals.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { Provider } from 'react-redux'
import { store } from "@/lib/store";

export default function App({ Component, pageProps }) {
  return<>
  <Provider store={store}>

  <Navbar/>
   <Component {...pageProps} />
   <Footer/>
  </Provider>
   </>;
}
