import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import AppProvider from '../context/AppContext'
import axios from 'axios';
/**
 * Set A Default API BaseUrl 
 */
axios.defaults.baseURL = String(process.env.NEXT_PUBLIC_API_BASE_URL);

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Script
      strategy='lazyOnload'
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
    />
    <Script
      id='google-analytics'
      strategy='lazyOnload'>
      {
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date())
        gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');`
      }
    </Script>
    <div>
      <div className={`md:hidden h-screen w-screen flex justify-center items-center bg-yellow-400 p-4 sm:p-10`}>
        <h1 className={`text-4xl sm:text-7xl font-bold text-center`} >Mobile  Not Supported Right Now!</h1>
      </div>
      <div className={`hidden md:block`}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </div>
    </div>
  </>

}

export default MyApp
