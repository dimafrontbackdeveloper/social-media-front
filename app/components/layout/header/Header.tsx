import Link from 'next/link'
import { FC } from 'react'

import Search from '@/components/layout/header/Search/Search'

import BurgerButton from '../sidebar/burger-button/BurgerButton'

import styles from './Header.module.scss'
import logoImg from './vk-logo.png'

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.header__row}>
				<div className={styles['image-wrapper']}>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<Link href={'/'}>
						<img src={logoImg.src} alt='' style={{ cursor: 'pointer' }} />
					</Link>
				</div>
				<Search />
			</div>
			<BurgerButton />
		</header>
	)
}

export default Header
