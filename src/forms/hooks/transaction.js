import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateTransaction } from '@/api/hooks/transaction'

import { useCreateTransactionFormSchema } from './schemas/transaction'

export const useCreateTransactionForm = ({ onSuccess, onError }) => {
  const { mutate: createTransaction, isPending } = useCreateTransaction()
  const form = useForm({
    resolver: zodResolver(useCreateTransactionFormSchema),
    defaultValues: {
      name: '',
      amount: 0,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  })

  const onSubmit = async (data) => {
    try {
      createTransaction(data)
      onSuccess()
    } catch (error) {
      console.error('Erro ao criar transação:', error)
      onError()
    }
  }

  return { form, onSubmit, isPending }
}
