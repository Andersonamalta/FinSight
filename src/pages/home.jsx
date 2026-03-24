import { PlusIcon } from 'lucide-react'
import { Navigate } from 'react-router'

import DateSelection from '@/components/date-selection'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext()

  if (isInitializing) return null
  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <Header />
      <div className="p-8">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Dashboard</h2>
          <div className="flex gap-2 items-center">
            <DateSelection />
            <Button>
              <PlusIcon />
              Nova transação
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
