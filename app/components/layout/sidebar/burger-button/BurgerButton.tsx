import { useBurger } from '@/hooks/useBurger'

import styles from './BurgerButton.module.scss'

const BurgerButton = () => {
	const { openBurger } = useBurger()

	return (
		<div className={styles.burgerMenu} onClick={openBurger}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default BurgerButton
