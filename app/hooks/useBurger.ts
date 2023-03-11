import { useContext } from 'react'

import { BurgerContext } from '@/providers/burger-provider/BurgerProvider'

export const useBurger = () => useContext(BurgerContext)
