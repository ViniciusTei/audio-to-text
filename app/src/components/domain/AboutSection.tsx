import React from 'react'

import { AiFillApi, AiFillDollarCircle, AiFillRead } from 'react-icons/ai'

function AboutSection() {
  return (
      <section id="about" className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200 sm:text-4xl">Sobre</h2>
            <p className="mt-8 text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-600 dark:text-gray-200 text-opacity-80">
              O Transcreve AI é um projeto que visa facilitar a vida de quem precisa transcrever áudios em texto. Utilizando inteligência artificial, nós transformamos seus áudios em texto de forma rápida e prática.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-indigo-400 mb-5 flex-shrink-0">
                <AiFillApi size="2rem"/>
              </div>
              <div className="flex-grow">
                <h2 className="dark:text-white text-lg title-font font-medium mb-3">
                  Inteliência artificial
                </h2>
                <p className="leading-relaxed text-base text-gray-600 dark:text-gray-100">
                  Utilizamos modelos de inteligência artificial para transformar seus áudios em texto. Tentando manter a maior fidelidade possível.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-indigo-400 mb-5 flex-shrink-0">
                <AiFillRead size="2rem"/>
              </div>
              <div className="flex-grow">
                <h2 className="dark:text-white text-lg title-font font-medium mb-3">
                  Fácil de usar
                </h2>
                <p className="leading-relaxed text-base text-gray-600 dark:text-gray-100">
                  Nosso site é simples e fácil de usar. Basta fazer o upload do seu áudio e aguardar o resultado. Você pode fazer o upload de vários áudios e manter um histórico.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-indigo-400 mb-5 flex-shrink-0">
                <AiFillDollarCircle size="2rem"/>
              </div>
              <div className="flex-grow">
                <h2 className="dark:text-white text-lg title-font font-medium mb-3">
                  Barato
                </h2>
                <p className="leading-relaxed text-base text-gray-600 dark:text-gray-100">
                  Nosso serviço é barato e você só paga pelo que utilizar. Não tem mensalidade, não tem fidelidade, não tem pegadinha.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default AboutSection
