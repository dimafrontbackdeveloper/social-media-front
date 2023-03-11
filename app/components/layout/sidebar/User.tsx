import { CheckCircleTwoTone, EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, List, Row } from 'antd'
import Link from 'next/link'
import { FC } from 'react'

import ListItem from '@/components/layout/sidebar/ListItem'

import { AuthService } from '@/services/auth/auth.service'

import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

import styles from './Sidebar.module.scss'

interface IUser {
	closeBurger: () => void
}

const User: FC<IUser> = ({ closeBurger }) => {
	const { setUser } = useAuth()
	const { user } = useAuth()

	const { data } = useProfile()

	return (
		<Card className={styles.card} onClick={closeBurger}>
			<div style={{ cursor: 'pointer' }}>
				<Link href={`${process.env.APP_URL}/profile/${user?._id}`}>
					<Row gutter={[5, 5]}>
						<Col span={5}>
							<Avatar alt='' src={data?.avatarPath} size={'large'} />
						</Col>
						<Col span={19} style={{ display: 'flex', alignItems: 'center' }}>
							<div>
								{data?.name}{' '}
								{data?.isVerified && (
									<CheckCircleTwoTone
										style={{ color: '#5B9CE6', opacity: '0.8', marginLeft: 5 }}
									/>
								)}
							</div>
						</Col>
					</Row>
				</Link>
			</div>

			<List style={{ marginTop: '1rem' }}>
				<ListItem
					item={{
						link: '/profile/edit',
						title: 'Редактирование профиля',
						icon: EditOutlined
					}}
				/>
			</List>

			<Button
				type='dashed'
				onClick={() => {
					AuthService.logout()
					setUser && setUser(null)
				}}
			>
				Выйти
			</Button>
		</Card>
	)
}

export default User
