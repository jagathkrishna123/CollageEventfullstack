
import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }
  return (
    <form className='min-h-[100vh] flex item-cneter'>
<div className='flex flex-col gap-3 m-auto items-start p-8 pt-10 min-w-[340px] sm:min-w-96 
bg-gray-700/30 backdrop-blur-lg border border-white/10 rounded-xl text-gray-200 text-sm shadow-xl'>
          <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
          <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
          {
            state === "Sign Up" && 
            <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-gray-500 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.name)} value={name} />
          </div>
          }
          
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-gray-500 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.email)} value={email} />
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-gray-500 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.password)} value={password} />
          </div>
          <button className='bg-blue-950 text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up"
          ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-blue-800 underline cursor-pointer'>Login here</span></p>
          : <p>Create a new account? <span onClick={()=>setState('Sign Up')} className='text-blue-800 underline cursor-pointer'>Click here</span></p>
        }
        </div>
    </form>
  )
}

export default Login