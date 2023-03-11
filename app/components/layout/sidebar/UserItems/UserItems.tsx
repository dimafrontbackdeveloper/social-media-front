import { Card, Skeleton, Typography } from 'antd'
import { useRouter } from 'next/router'
import { FC } from 'react'

import UserItem from '@/components/layout/sidebar/UserItems/UserItem'

import { useProfile } from '@/hooks/useProfile'

import styles from '../Sidebar.module.scss'

interface IUserItems {
	closeBurger: () => void
}

const UserItems: FC<IUserItems> = ({ closeBurger }) => {
	const { push } = useRouter()

	const { isLoading, data } = useProfile()

	return (
		<Card className={styles.card} onClick={closeBurger}>
			<Typography.Title level={5} style={{ marginBottom: 15 }}>
				Мои друзья
			</Typography.Title>
			{isLoading ? (
				<Skeleton />
			) : data?.friends?.length ? (
				data.friends?.map(user => <UserItem user={user} key={user._id} />)
			) : (
				<div>Друзей нет</div>
			)}
		</Card>
	)
}

export default UserItems
