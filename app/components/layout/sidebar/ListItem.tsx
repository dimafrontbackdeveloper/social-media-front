import { List } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { IMenuItem } from '@/types/menu.interface'

import { useAuth } from '@/hooks/useAuth'

import styles from './Sidebar.module.scss'

const ListItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const { asPath } = useRouter()

	const { user } = useAuth()

	if (item.link === '/profile') item.link = `${item.link}/${user?._id}`

	return (
		<List.Item className={styles.itemLink}>
			<List.Item.Meta
				title={
					<Link href={item.link}>
						<a
							style={
								asPath === item.link
									? {
											color: '#1890ff'
									  }
									: {}
							}
						>
							<span style={{ marginRight: 8 }}>
								<item.icon />
							</span>
							<span>{item.title}</span>
						</a>
					</Link>
				}
			/>
		</List.Item>
	)
}

export default ListItem
