import { useState } from 'react'
//import {useAuthContext} from './useAuthContext'


export const useSignup = () => {
  
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  //const { dispatch } = useAuthContext()
  
    const signup = async (customerName, email, phone, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/customer', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ customerName, email, phone, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      //dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}