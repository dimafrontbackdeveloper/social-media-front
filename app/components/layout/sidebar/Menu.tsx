import { Card, List } from 'antd'
import { useRouter } from 'next/router'
import { FC } from 'react'

import ListItem from '@/components/layout/sidebar/ListItem'

import styles from './Sidebar.module.scss'
import { menu } from './dataMenu'

interface IMenu {
	closeBurger: () => void
}

const Menu: FC<IMenu> = ({ closeBurger }) => {
	const { push } = useRouter()

	return (
		<Card className={styles.card} onClick={closeBurger}>
			<List itemLayout='vertical'>
				{menu.map(item => (
					<ListItem key={item.link} item={item} />
				))}
			</List>
		</Card>
	)
}

export default Menu
