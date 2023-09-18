export interface CurrencyData {
  code: string
  rates: Rate[]
}

export interface Rate {
  mid: number
}
