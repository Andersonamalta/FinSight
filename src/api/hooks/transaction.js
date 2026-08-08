import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getUserBalanceQueryKey } from '@/api/hooks/user'
import { TransactionService } from '@/api/services/transaction'
import { useAuthContext } from '@/contexts/auth'

export const createTransactionMutationKey = ['createTransaction']

export const useCreateTransaction = () => {
  const { user } = useAuthContext()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: async (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      })
    },
  })
}
