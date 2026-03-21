import { Navigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, isInitializing, signout } = useAuthContext()

  if (isInitializing) return null
  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <h1>Olá, {user.firstName}</h1>
      <Button onClick={signout}>Sair</Button>
    </>
  )
}

export default HomePage
