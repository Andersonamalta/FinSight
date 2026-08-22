import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useLoginFormSchema, useSignupFormSchema } from '../schemas/user'

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

export const useSignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(useSignupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })
  return { form }
}
