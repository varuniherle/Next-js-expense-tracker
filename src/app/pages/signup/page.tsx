'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthMessages } from '../authMessages'; // Adjust the path based on your project structure

export default function signup() {
  const [error, setError] = useState(false)
  const [errorDesc, setErrorDesc] = useState('')
  const router = useRouter()

  // Validation function for password
  function validation(password: string) {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    
    if (password.length >= 8 && password.match(numbers) && password.match(lowerCaseLetters) && password.match(upperCaseLetters)) {
      return true;
    } else {
      return false; // Fixed the issue where `false` was not being returned
    }
  }

  // Submit handler for form
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const password1 = formData.get('password1');

    if (password === password1) {
      if (validation(password)) {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.status === 201) {
          alert(AuthMessages.REGISTRATION_SUCCESS);
          router.push('/pages/login');
        } else if (response.status === 400) {
          const data = await response.json();
          setError(true);
          setErrorDesc(data.error || AuthMessages.GENERIC_ERROR);
        } else {
          console.error(response.status);
          router.push('/pages/error');
        }
      } else {
        setError(true);
        setErrorDesc(AuthMessages.PASSWORD_VALIDATION);
      }
    } else {
      setError(true);
      setErrorDesc(AuthMessages.PASSWORD_MISMATCH);
    }
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{AuthMessages.HEADER}</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{AuthMessages.SIGNUP_TAGLINE}</p>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{AuthMessages.SIGNUP_HEADER}</h2>
              <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{AuthMessages.EMAIL_LABEL}</label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{AuthMessages.PASSWORD_LABEL}</label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{AuthMessages.CONFIRM_PASSWORD_LABEL}</label>
                  <input
                    name="password1"
                    type="password"
                    id="repeat-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {AuthMessages.CREATE_ACCOUNT_BUTTON}
                </button>

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
