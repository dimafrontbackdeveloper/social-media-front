import { CheckCircleTwoTone } from '@ant-design/icons'
import { Avatar, Button, Card, Typography } from 'antd'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { IUser } from '@/types/user.interface'

import styles from './UserCard.module.scss'

const UserCard: FC<{ user: IUser; hideResult?: () => void }> = ({
	user,
	hideResult
}) => {
	const { push } = useRouter()

	return (
		<Card className={styles.card}>
			<Avatar src={user.avatarPath} alt={user.name} size={100} />
			<div style={{ marginTop: 5 }}>
				<Typography.Title level={4}>
					{user.name}
					{user.isVerified && (
						<CheckCircleTwoTone
							style={{ color: '#5B9CE6', opacity: '0.8', marginLeft: 5 }}
						/>
					)}
				</Typography.Title>
			</div>
			<div>
				<Button
					type='dashed'
					onClick={() => {
						push(`/profile/${user._id}`).then(hideResult)
					}}
				>
					Перейти в профиль
				</Button>
			</div>
		</Card>
	)
}

export default UserCard
