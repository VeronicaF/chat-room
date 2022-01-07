import { useState, useCallback } from 'react'
import { _login } from '@/service';

type user = {
  name: string
}

export default function useAuthModel() {
  const [user, setUser] = useState<API.CurrentUser | undefined>()

  const login = useCallback(async (username: string) => {
    const u = await _login(username)
    setUser(u)
  }, [])

  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, [])

  return {
    user,
    login,
    signout
  }
}
