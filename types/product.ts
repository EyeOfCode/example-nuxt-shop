export interface IProduct {
  id: number
  name: string
  category: string
  price: number
  currency: string
  imageSrc: string
}

export interface ICartProduct {
  id: number
  user: string
  product: IProduct
  quantity: number
  status: string
}
