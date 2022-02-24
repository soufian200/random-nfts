import type { NextPage } from 'next'
import Head from 'next/head'
import { FiChevronDown, FiChevronUp, FiLayers } from 'react-icons/fi'
import { FiRefreshCw } from 'react-icons/fi'
import { useState } from 'react'
import Image from 'next/image'
import Layer from '../components/Layer'
import Input from '../components/Input'
import Preview from '../components/Preview'

const Home: NextPage = () => {

  const [opened, setOpened] = useState(!false)

  const [layers, setLayers] = useState([
    {
      name: "Backgrounds",
      items: [
        {
          name: "1",
          src: '/layers/backgrounds/1.jpeg',

        },
        {
          name: "2",
          src: '/layers/backgrounds/2.jpeg',

        },
        {
          name: "1",
          src: '/layers/backgrounds/1.jpeg',

        },
        {
          name: "2",
          src: '/layers/backgrounds/2.jpeg',

        },
        {
          name: "1",
          src: '/layers/backgrounds/1.jpeg',

        },
        {
          name: "2",
          src: '/layers/backgrounds/2.jpeg',

        },
        {
          name: "1",
          src: '/layers/backgrounds/1.jpeg',

        },
        {
          name: "2",
          src: '/layers/backgrounds/2.jpeg',

        },
      ]
    },
    {
      name: "Eyes",
      items: [
        {
          name: "1",
          src: '/layers/backgrounds/1.jpeg'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.jpeg'
        },
        {
          name: "1",
          src: '/layers/backgrounds/1.jpeg'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.jpeg'
        },
      ]
    },
    {
      name: "Heads",
      items: [
        {
          name: "1",
          src: '/layers/backgrounds/1.jpeg'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.jpeg'
        },
        {
          name: "1",
          src: '/layers/backgrounds/1.jpeg'
        },
        {
          name: "2",
          src: '/layers/backgrounds/2.jpeg'
        },
      ]
    },
  ])


  return <div className='bg-slate-900 h-screen overflow-hidden' >
    <Head>
      <title>Create Random NFTs</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className=''>
      <nav className='bg-slate-900 border-b border-slate-600 py-3 px-20 flex items-center justify-between w-full'>
        <div>
          <h1 className='font-bold text-3xl text-white'>NFTs Generator</h1>
        </div>
        <div className=''>
          <a href="#" className='text-blue-500 hover:text-blue-600'>Buy A Coffee</a>
        </div>
      </nav>

      <div className="  text-white flex w-full ">
        <div className='bg-slate-80 w-2/5 p-5 pb-20 h-screen  overflow-auto' >
          <div className=' mx-auto  max-w-xl  '>
            <div className=''>
              <div className=' flex justify-center '>
                <div>
                  <Preview src='/layers/backgrounds/1.jpeg' />
                  <div className='mt-3 flex justify-between '>
                    <div className=' flex   '>
                      <Input name='width' placeholder='Width' styles='mb-0 mr-3 w-[80px]' />
                      <Input name='height' placeholder='Height' styles='mb-0 w-[80px]' />
                    </div>
                    <button title='Random Preview' className='bg-blue-400 hover:bg-blue-500 py-3 px-4 rounded-md text-slate-900 font-bold'>
                      <FiRefreshCw size={26} />
                    </button>
                  </div>
                </div>
              </div>
              <div className=' mt-10'>
                <div className={`bg-slate-700 transition-all  rounded-t-lg ${!opened && "rounded-b-lg"} p-2 px-3 items-center flex justify-between cursor-pointer`}
                  onClick={() => setOpened(!opened)}
                >
                  <h1 className='font-bold transform '>More</h1>
                  <div

                    className='hover:bg-slate-600   p-1 rounded-full'>

                    {
                      opened
                        ? <FiChevronUp size={25} />
                        : <FiChevronDown size={25} />
                    }
                  </div>
                </div>
                <div className={`flex flex-col overflow-hidden transition-all rounded-b-lg p-2 ${opened ? 'h-auto ' : 'h-0 py-0'} bg-[#3c495c]`}>
                  <Input name='collectionName' placeholder='Collection Name' />
                  <textarea
                    placeholder='Description'
                    className='bg-slate-800 p-2 rounded-md mb-3'
                    rows={3}
                  ></textarea>
                  <Input name='size' placeholder='Size' />
                </div>
                <div className='flex justify-center mt-8'>
                  <button className='bg-yellow-400 hover:bg-yellow-500 py-3 px-20 rounded-md text-slate-900 font-bold'>
                    Create</button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className='bg-slate-800 w-3/5 p-4 pb-20 h-screen overflow-auto' >
          <div className='flex items-center mb-6'>
            <FiLayers size={30} />
            <h1 className='text-2xl font-bold ml-2'>Layers</h1>
          </div>
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
