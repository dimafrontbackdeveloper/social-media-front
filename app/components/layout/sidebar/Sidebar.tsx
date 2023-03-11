import { FC } from 'react'

import { useBurger } from '@/hooks/useBurger'

import Menu from './Menu'
import styles from './Sidebar.module.scss'
import User from './User'
import UserItems from './UserItems/UserItems'
import Close from './close/Close'

const Sidebar: FC = () => {
	const { isOpenBurger, closeBurger } = useBurger()

	return (
		<div
			className={`${styles.sidebar} ${isOpenBurger && styles.sidebarActive}`}
		>
			<User closeBurger={closeBurger} />
			<UserItems closeBurger={closeBurger} />
			<Menu closeBurger={closeBurger} />

			<Close closeBurger={closeBurger} />
		</div>
	)
}

export default Sidebar
