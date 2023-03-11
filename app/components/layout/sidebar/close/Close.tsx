import { FC } from 'react'

import { useBurger } from '@/hooks/useBurger'

import styles from './Close.module.scss'

interface IClose {
	closeBurger: () => void
}

const Close: FC<IClose> = ({ closeBurger }) => {
	return (
		<div className={`${styles.close}`} onClick={closeBurger}>
			<div></div>
			<div></div>
		</div>
	)
}

export default Close
