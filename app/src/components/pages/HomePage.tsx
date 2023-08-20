import React from 'react'
import { AiFillApi, AiFillDollarCircle, AiFillMoneyCollect, AiFillRead, AiFillWallet, AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const includedFeatures = [
  'Áudios ilimitados',
  'Transcrições ilimitadas',
  'Suporte para vários idiomas',
  'Suporte para vários sotaques',
]

function HomePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 md:px-12">
      <div className="relative isolate lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl">Transforme seus áudios em texto utilizando inteligência artificial</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Aproveite a tecnologia para transformar seus áudios em texto de forma rápida e prática. Não importa qual seja a língua ou o sotaque, nós entendemos e transformamos em texto.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="audio" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Comece agora</Link>
              <a href="#about" className="text-sm font-semibold leading-6 text-gray-100">Saiba mais <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
      <section id="pricing" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">Preços</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              É muito simples, você compra um pacote de créditos e utiliza conforme a sua necessidade. Não tem mensalidade, não tem fidelidade, não tem pegadinha.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-200">Pacote de creditos</h3>
              <p className="mt-6 text-base leading-7 text-gray-100">
                Um pacote de créditos é válido por 1 ano a partir da data da compra. Você pode utilizar os créditos quando quiser, não tem prazo para utilização.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">O que é incluso</h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-200 sm:grid-cols-2 sm:gap-6"
              >
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">Pague o valor que quiser</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">R$1,00</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">BRL</span>
                  </p>
                  <a
                    href="#"
                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Compre créditos
                  </a>
                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Comece a partir de <span className="font-semibold">R$1,00</span> por crédito, e já pode começar a utilizar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">Sobre</h2>
            <p className="mt-8 text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">
              O Transcreve AI é um projeto que visa facilitar a vida de quem precisa transcrever áudios em texto. Utilizando inteligência artificial, nós transformamos seus áudios em texto de forma rápida e prática.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-5 flex-shrink-0">
                <AiFillApi size="2rem"/>
              </div>
              <div className="flex-grow">
                <h2 className="text-white text-lg title-font font-medium mb-3">
                  Inteliência artificial
                </h2>
                <p className="leading-relaxed text-base">
                  Utilizamos modelos de inteligência artificial para transformar seus áudios em texto. Tentando manter a maior fidelidade possível.
                </p>
                <a className="mt-3 text-indigo-400 inline-flex items-center">Saiba mais
                  <AiOutlineArrowRight/>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-5 flex-shrink-0">
                <AiFillRead size="2rem"/>
              </div>
              <div className="flex-grow">
                <h2 className="text-white text-lg title-font font-medium mb-3">
                  Fácil de usar
                </h2>
                <p className="leading-relaxed text-base">
                  Nosso site é simples e fácil de usar. Basta fazer o upload do seu áudio e aguardar o resultado. Você pode fazer o upload de vários áudios e manter um histórico.
                </p>
                <a className="mt-3 text-indigo-400 inline-flex items-center">Saiba mais
                  <AiOutlineArrowRight/>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-5 flex-shrink-0">
                <AiFillDollarCircle size="2rem"/>
              </div>
              <div className="flex-grow">
                <h2 className="text-white text-lg title-font font-medium mb-3">
                  Barato
                </h2>
                <p className="leading-relaxed text-base">
                  Nosso serviço é barato e você só paga pelo que utilizar. Não tem mensalidade, não tem fidelidade, não tem pegadinha.
                </p>
                <a className="mt-3 text-indigo-400 inline-flex items-center">Saiba mais
                  <AiOutlineArrowRight/>
                </a>
              </div>
            </div>
          </div>
        </div>
    </section>
    </main>
  )
}

export default HomePage
