'use client'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function signup(){
  const [error, setError] = useState(false)
  const [errorDesc, setErrorDesc] = useState('')
  const router = useRouter()
  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type':'application/json'},
      body: JSON.stringify({email,password}),
    })

    if (response.status === 201) {
        router.push('/pages/login')
    }
    else if(response.status ==400){
      const data = await response.json()
      setError(true)
      setErrorDesc(data.error || 'An error occurred')
    }
    else{
      console.error(response.status) 
      router.push('/pages/error')
    }
  }

  return( 
    <div>
      HI Register hear 
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input type="email" name="email" required />
      <label>Password</label>
      <input type="password" name="password"  required />
      <button type="submit">Login</button>
    </form>
    {error? <div> 
      {errorDesc}
    </div>:<></>}

    </div>
  )
}