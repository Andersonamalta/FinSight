import { Navigate } from 'react-router'

import AddTransactionButton from '@/components/add-transaction-button'
import Balance from '@/components/balance'
import DateSelection from '@/components/date-selection'
import Header from '@/components/header'
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
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Dashboard</h2>
          <div className="flex gap-2 items-center">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <Balance />
        </div>
      </div>
    </>
  )
}

export default HomePage
