import React from 'react'

interface Props {
  title: string
  text: string
  button?: boolean
  buttonText?: string
  buttonClick?: () => void
}
function Card({ title, text, button = false, buttonText, buttonClick }: Props) {
  return (
    <div className="text-start mx-auto my-4 max-w-2xl p-6 bg-white border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">{title}</h5>

      <p className="mb-6 font-normal text-gray-700 dark:text-gray-400">
        {text}
      </p>
      
      {button && (
        <button onClick={buttonClick} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{buttonText || 'Ver mais'}</button>
      )}

    </div>
  )
}

export default Card
