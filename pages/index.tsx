import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import ThemeToggle from '../components/ThemeToggle';

const Home: NextPage = () => {
  return (
    <div className="h-full">
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W9M7TVKHRZ"/>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-W9M7TVKHRZ');
          `,
        }}
      />
      <Head>
        <title>Хариул эсвэл Уу</title>
        <meta name="тайлбар" content="Хөгжилтэй, сурталчилгаагүй уух тоглоом." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="absolute top-4 right-4">
        {/* Replace with your actual theme toggle component */}
           <ThemeToggle /> 
      </div>

      <div className="container flex mx-auto p-4 fixmobilevh">
        <div className="m-auto">
          {/* <div className="select-none text-4xl text-header font-semibold mx-auto text-center align-middle pb-2">
            Хариул <span className="text-xl align-middle">эсвэл</span> Уу
          </div> */}

           <div className="select-none text-4xl text-header font-semibold mx-auto text-center align-middle pb-2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 drop-shadow-lg">
              🎉 Хариул <span className="text-4xl md:text-6xl">эсвэл</span> Уу 🍹
            </h1>
          </div>
          

          {/* <Link href='/manipulate' className="cursor-default">
            <div className="select-none rounded-lg bg-[#8D889F] text-center text-white font-bold max-w-fit px-4 m-auto">
              O N L I N E
            </div>
          </Link> */}

          <br/>

          <div className="select-none text-center font-bold max-w-fit px-4 m-auto text-[#8D889F] pb-4 pt-4">
             Асуултын&nbsp;төрөл:
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href='/game?mode=normal'>
              <div className="select-none cursor-pointer text-white font-bold text-xl rounded-xl p-4 shadow-xl w-full flex-1 mx-auto text-center bg-gradient-to-r from-[#00C5FF] to-[#009BFF]">
                Энгийн
              </div>
            </Link>
            <Link href='/game?mode=party'>
              <div className="select-none cursor-pointer text-white font-bold text-xl border-black rounded-xl p-4 shadow-md w-full flex-1 mx-auto text-center bg-gradient-to-r from-[#FFC300] to-[#FF8900]">
                Үдэшлэг
              </div>
            </Link>
          </div>

          <br/>

          <div className="grid grid-cols-2 gap-4">
            <Link href='/game?mode=dirty'>
              <div className="select-none cursor-pointer text-white font-bold text-xl border-black rounded-xl p-4 shadow-md w-full flex-1 mx-auto text-center bg-gradient-to-r from-[#FF006D] to-[#FC0023]">
                +21
              </div>
            </Link>
            <Link href='/game?mode=dares'>
              <div className="select-none cursor-pointer text-white font-bold text-xl border-black rounded-xl p-4 shadow-md w-full flex-1 mx-auto text-center bg-gradient-to-r from-[#EA00C3] to-[#BE00FF]">
                Хий эсвэл Уу
              </div>
            </Link>
          </div>

          <br/> 

          <Link href='/game?mode=mix'>
            <div className="select-none cursor-pointer text-white font-bold text-xl border-black rounded-xl p-4 shadow-md w-full flex-1 mx-auto text-center bg-black">
              Холимог
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Home
