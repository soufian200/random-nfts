import type { NextPage } from 'next'
import Head from 'next/head'
import { FiChevronDown, FiChevronUp, FiLayers } from 'react-icons/fi'
import { FiRefreshCw } from 'react-icons/fi'
import { ChangeEvent, useContext, useState } from 'react'
import Input from '../components/Input'
import Preview from '../components/Preview'
import Navbar from '../components/Navbar'
import Overlay from '../components/Overlay'
import { AppContext } from '../context/AppContext'
import { AiFillWarning, AiOutlinePlus } from 'react-icons/ai'
import NewLayerForm from '../components/NewLayerForm'
import LayersContainer from '../components/LayersContainer'



const Home: NextPage = () => {

  const [opened, setOpened] = useState(!false)
  const { overlayVisible, setOverlayVisible, layers, setLayers, setRefresh, refresh, formData, setFormData } = useContext(AppContext)
  const [newLayerFormVisible, setNewLayerFormVisible] = useState(false)

  const [err, setErr] = useState('')


  const handleRefresh = () => {
    if (!layers.length) return
    setRefresh(!refresh)
  }

  const handleCreate = () => {
    if (!layers.length) return

    const { width, height, collectionName, description, size } = formData;
    if (!Number(width)) return setErr("Width Not Valid")
    else if (!Number(height)) return setErr("Height Not Valid")
    else if (!collectionName) return setErr("Collection Name Not Valid")
    else if (!description) return setErr("Description Not Valid")
    else if (!Number(size)) return setErr("Size Not Valid")


    setErr("") // hide err

    setOverlayVisible(true)
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({ ...formData, [name]: e.target.value })
  }

  const handleChangeFormData = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({ ...formData, [name]: e.target.value })
  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value })
  }

  const handleNewLayer = () => {

    setNewLayerFormVisible((prev: boolean) => !prev)
  }



  return <div className='bg-slate-900 h-screen overflow-hidden' >
    <Head>
      <title>Create Random NFTs</title>
      <meta property="og:url" content={`https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/`} />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`Generate up to 10 000+ unique NFTs collection | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
      />
      <meta
        name="description"
        content="NFTs Generator is a tool that lets create up to 10 000+ unique and random NFTs easly and without code."
        key="description"
      />

      <meta
        property="og:description"
        content="NFTs Generator is a tool that lets create up to 10 000+ unique and random NFTs easly and without code."
      />
      <meta
        property="og:image"
        content="/nftsgenerator.svg"
      />
      <meta
        name="google"
        content="nositelinkssearchbox"
        key="sitelinks"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className='relative'>
      {overlayVisible && <Overlay setOverlayVisible={setOverlayVisible} />}
      <Navbar />
      <div className="  text-white flex w-full ">
        <div className=' w-2/5 p-5 pb-20 h-screen  overflow-auto' >
          <div className=' mx-auto  max-w-xl  '>
            <div className=''>
              <div className=' flex justify-center '>
                <div>
                  <Preview />
                  <div className='mt-3 flex justify-between  '>
                    <div className=' flex items-center  '>
                      <Input onChange={handleChangeInput} value={formData['width']} name='width' placeholder='Width' styles='mb-0 w-[80px]' />
                      <h1 className='mx-1 text-slate-500'>x</h1>
                      <Input onChange={handleChangeInput} value={formData['height']} name='height' placeholder='Height' styles='mb-0 w-[80px]' />
                    </div>
                    <button
                      onClick={handleRefresh}
                      title='Refresh' className='active:scale-95 bg-blue-400 hover:bg-blue-500  flex justify-center items-center p-2 w-12 h-12 rounded-md text-slate-900 font-bold'>
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
                  <Input onChange={handleChangeFormData} value={formData['collectionName']} name='collectionName' placeholder='Collection Name' />
                  <Input onChange={handleChangeFormData} value={formData['ipfs']} name='ipfs' placeholder='IPFS Address (optional)' />
                  <textarea
                    placeholder='Description'
                    className='bg-slate-800 p-2 rounded-md mb-3'
                    rows={3}
                    name="description"
                    onChange={handleTextAreaChange}
                    value={formData['description']}
                  ></textarea>
                  <Input onChange={handleChangeFormData} value={formData['size']} name='size' placeholder='Size' />
                </div>
                {err && <div className='flex text-red-500 items-center justify-center mt-8'>
                  <AiFillWarning size={25} />
                  <p className=' ml-2'>{err}</p>
                </div>}
                <div className='flex justify-center mt-8'>
                  <button
                    disabled={layers.length === 0}
                    onClick={handleCreate}
                    className={` bg-yellow-400 hover:bg-yellow-500 py-3 px-20 rounded-md text-slate-900 font-bold`}>
                    Create</button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className='bg-slate-800 w-3/5 p-4 px-5 pb-20 h-screen overflow-auto' >
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center'>
              <FiLayers size={30} />
              <h1 className='text-2xl font-bold ml-2'>Layers</h1>
            </div>
            <div className='relative'>
              <div
                onClick={handleNewLayer}
                className='bg-slate-600 hover:bg-slate-700 cursor-pointer flex items-center p-2 rounded-md'
              >
                <AiOutlinePlus size={25} />
                <h1 className='ml-1'>New Layer</h1>
              </div>
              {
                newLayerFormVisible && <NewLayerForm setNewLayerFormVisible={setNewLayerFormVisible} />
              }
            </div>
          </div>

          <LayersContainer />
        </div>
      </div>
    </main>
  </div>
}

export default Home
