import { FC, PropsWithChildren, createContext, useState } from 'react'

interface IBurgerContext {
	isOpenBurger: boolean
	openBurger: () => void
	closeBurger: () => void
}

export const BurgerContext = createContext({} as IBurgerContext)

const BurgerProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [isOpenBurger, setIsOpenBurger] = useState<boolean>(false)

	const openBurger = () => {
		setIsOpenBurger(true)
	}

	const closeBurger = () => {
		setIsOpenBurger(false)
	}

	return (
		<BurgerContext.Provider value={{ isOpenBurger, openBurger, closeBurger }}>
			{children}
		</BurgerContext.Provider>
	)
}

export default BurgerProvider
