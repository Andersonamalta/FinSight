import { Card, CardContent } from './ui/card'

const BalanceItem = ({ icon, label, amount }) => {
  return (
    <Card className="bg-[#171717]">
      <CardContent className="p-6 space-y-2">
        {/* ICONE E LABEL */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-muted">
            {icon}
          </div>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        <h3 className="text-2xl font-semibold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amount)}
        </h3>
      </CardContent>
    </Card>
  )
}

export default BalanceItem
