import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useLoginFormSchema } from '../schemas/user'

export const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(useLoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return { form }
}
