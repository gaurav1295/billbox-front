interface CreditCardProps {
    balance: number
    cardHolder: string
    validThru: string
    cardNumber: string
    isActive?: boolean
  }
  
  export function CreditCard({ balance, cardHolder, validThru, cardNumber, isActive = false }: CreditCardProps) {
    return (
      <div className={`w-80 h-48 rounded-2xl p-6 ${isActive ? 'bg-blue-600 text-white' : 'bg-white'}`}>
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-sm opacity-80 mb-1">Balance</div>
            <div className="text-2xl font-bold">${balance.toLocaleString()}</div>
          </div>
          <div className="flex space-x-1">
            <div className="w-8 h-8 rounded-full bg-gray-200 opacity-80"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300 opacity-80"></div>
          </div>
        </div>
        <div className="mb-6">
          <div className="text-sm opacity-80 mb-1">CARD HOLDER</div>
          <div className="font-medium uppercase">{cardHolder}</div>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-xl tracking-wider font-medium">{cardNumber}</div>
          <div>
            <div className="text-sm opacity-80 mb-1">VALID THRU</div>
            <div>{validThru}</div>
          </div>
        </div>
      </div>
    )
  }
  
  