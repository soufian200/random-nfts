import type { NextPage } from 'next'
import Head from 'next/head'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { BsUpload } from 'react-icons/bs'
import { useState } from 'react'
import Image from 'next/image'
import Layer from '../components/Layer'

const Home: NextPage = () => {

  const [layers, setLayers] = useState([
    {
      name: "Backgrounds",
      items: [
        {
          name: "1",
          src: '/layers/backgrounds/1.png'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.png'
        },
        {
          name: "1",
          src: '/layers/backgrounds/1.png'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.png'
        },
        {
          name: "1",
          src: '/layers/backgrounds/1.png'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.png'
        },
        {
          name: "1",
          src: '/layers/backgrounds/1.png'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.png'
        },
      ]
    },
    {
      name: "Eyes",
      items: [
        {
          name: "1",
          src: '/layers/backgrounds/1.png'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.png'
        },
        {
          name: "1",
          src: '/layers/backgrounds/1.png'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.png'
        },
      ]
    },
    {
      name: "Heads",
      items: [
        {
          name: "1",
          src: '/layers/backgrounds/1.png'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.png'
        },
        {
          name: "1",
          src: '/layers/backgrounds/1.png'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.png'
        },
      ]
    },
  ])


  return <div>
    <Head>
      <title>Create Random NFTs</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <div className="bg-slate-900 h-screen w-screen text-white flex flex-1">
        <div className='bg-slate-80 w-1/2' >left</div>
        <div className='bg-slate-800 w-1/2 p-4 overflow-auto' >
          {
            layers.map((layer, index) => {
              return <Layer key={index} layer={layer} />
            })
          }
        </div>
      </div>
    </main>
  </div>
}

export default Home
