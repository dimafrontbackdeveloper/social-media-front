import { CheckCircleTwoTone } from '@ant-design/icons'
import { Avatar } from 'antd'
import Link from 'next/link'
import { FC } from 'react'

import { IUser } from '@/types/user.interface'

const UserItem: FC<{ user: IUser }> = ({ user }) => {
	return (
		<Link key={user._id} href={`/profile/${user._id}`}>
			<a
				style={{
					display: 'flex',
					alignItems: 'center',
					textDecoration: 'none',
					color: '#111',
					marginBottom: 12
				}}
			>
				<div
					style={{
						position: 'relative',
						marginRight: 5,
						width: 50,
						height: 50
					}}
				>
					<Avatar src={user.avatarPath} alt='' size={46} />
				</div>
				<span style={{ fontSize: 14 }}>
					{user.name}
					{user.isVerified && (
						<CheckCircleTwoTone
							style={{ color: '#5B9CE6', opacity: '0.8', marginLeft: 5 }}
						/>
					)}
				</span>
			</a>
		</Link>
	)
}

export default UserItem
