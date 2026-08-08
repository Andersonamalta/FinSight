import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  /**
   * Cria uma nova transação para o usuário autenticado
   * @param {object} input
   * @param {string} input.name - Nome da transação
   * @param {string} input.date - Data da transação (YYYY-MM-DD)
   * @param {number} input.amount - Valor da transação
   * @param {string} input.type - Tipo da transação (Earning, Expense ou Investment)
   * @param {string} input.category - Categoria da transação
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },
}
