import { addMonths, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { DatePickerWithRange } from './date-picker-with-range'

const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd')

const DateSelection = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [date, setDate] = useState({
    // 2. Quando eu recarrego a página, eu pego o from e o to da url e persisto eles no state
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T00:00:00')
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T00:00:00')
      : addMonths(new Date(), 1),
  })
  // 1. Sempre que o state "date" mudar, eu preciso persisti-lo na url (?from&to=)
  useEffect(() => {
    if (!date?.from || !date?.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDateToQueryParam(date.from))
    queryParams.set('to', formatDateToQueryParam(date.to))
    navigate(`/?${queryParams.toString()}`)
  }, [navigate, date])
  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection
