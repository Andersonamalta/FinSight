import z from 'zod'

export const useCreateTransactionFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome da transação é obrigatório.',
  }),
  amount: z.number({
    required_error: 'O valor da transação é obrigatório.',
  }),
  date: z.date({
    required_error: 'A data da transação é obrigatória.',
  }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT']),
})
