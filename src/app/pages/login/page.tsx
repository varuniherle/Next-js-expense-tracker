'use client'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AuthMessages } from '../authMessages'; // adjust path as needed
import { useState } from 'react';
export default function LoginPage() {
  const router = useRouter()

  const [error, setError] = useState(false)
  const [errorDesc, setErrorDesc] = useState('')
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('auth_token', data.token);  
      router.push('/pages/dashboard')
    } else if (response.status == 401) {
      setError(true)
      setErrorDesc(AuthMessages.INVALID_CREDENTIALS)
    } 
    else if (response.status == 404) {
      setError(true)
      setErrorDesc(AuthMessages.USER_NOTFOUND)
    }
    else{
      setError(true)
      setErrorDesc(AuthMessages.GENERIC_ERROR)
    }
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              {AuthMessages.HEADER}
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Get a full insight about your expenses
            </p>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {AuthMessages.LOGIN_TAGLINE}
              </h2>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {AuthMessages.EMAIL_LABEL}
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="name@company.com" 
                    required 
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {AuthMessages.PASSWORD_LABEL}
                  </label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {AuthMessages.BUTTON_TEXT}
                </button>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {AuthMessages.NOT_REGISTERED} <a className="text-blue-600 hover:underline dark:text-blue-500" href='/pages/signup'>{AuthMessages.CREATE_ACCOUNT_LINK}</a>
                </div>
                {error && (
                  <div className="text-red-500 mt-4">
                    {errorDesc}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
