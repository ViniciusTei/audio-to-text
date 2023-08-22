import React from 'react'

import { CheckoutButton } from 'components/domain'

function PricingSection() {
  return (
      <section id="pricing" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200 sm:text-4xl">Preços</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              É muito simples, você compra um pacote de créditos e utiliza conforme a sua necessidade. Não tem mensalidade, não tem fidelidade, não tem pegadinha.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-600 dark:ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-200">Pacote de créditos</h3>
              <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-100">
                Um pacote de créditos é válido por 1 ano a partir da data da compra. Você ganha 1 crédito ao fazer seu primeiro cadastro. Você pode comprar mais créditos quando quiser por apenas R$1,00.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">O que é incluso</h4>
                <div className="h-px flex-auto bg-gray-900 dark:bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 dark:text-gray-100 sm:grid-cols-2 sm:gap-6"
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
                  <p className="text-base font-semibold text-gray-600">Pague um valor mínimo</p>
                  
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">R$1,00</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">BRL</span>
                  </p>

                  <CheckoutButton />

                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Você tem 1 crédito para utilizar ao fazer seu primeiro cadastro. Você pode comprar mais créditos quando quiser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

const includedFeatures = [
  '10 créditos para usar',
  'Créditos válidos por 1 ano',
  '1 crédito ao fazer o cadastro',
  'Acesso ao histórico de transcrições',
]

export default PricingSection
