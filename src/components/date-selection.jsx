import { useQueryClient } from '@tanstack/react-query'
import { addMonths, format, isValid } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'

import { DatePickerWithRange } from './ui/date-picker-with-range'

const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd')

const getInitialDateState = (searchParams) => {
  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  }
  if (!searchParams) return defaultDate
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  if (!from || !to) {
    return defaultDate
  }
  // Neste ponto, eu tenho os dois valores de data, mas preciso validar se eles são datas válidas
  const datesAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to))
  // Se forem inválidas, eu retorno a data padrão
  if (datesAreInvalid) {
    return defaultDate
  }
  // Neste ponto, eu tenho certeza que as datas são válidas, então posso retornar o objeto com as datas convertidas para Date
  return {
    from: new Date(from + 'T00:00:00'),
    to: new Date(to + 'T00:00:00'),
  }
}

const DateSelection = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const [date, setDate] = useState(getInitialDateState(searchParams))
  // 1. Sempre que o state "date" mudar, eu preciso persisti-lo na url (?from&to=)
  useEffect(() => {
    if (!date?.from || !date?.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDateToQueryParam(date.from))
    queryParams.set('to', formatDateToQueryParam(date.to))
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries({
      queryKey: [
        'balance',
        user.id,
        formatDateToQueryParam(date.from),
        formatDateToQueryParam(date.to),
      ],
    })
  }, [navigate, date, queryClient, user.id])
  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection
