import { Card, Row, Typography } from 'antd'
import { FC } from 'react'

import CountItem from '@/components/screens/profile/view/ProfileInfo/CountItem'
import InfoItem from '@/components/screens/profile/view/ProfileInfo/InfoItem'
import { numWord } from '@/components/utils/numWord'

import { IUser } from '@/types/user.interface'

const ProfileInfo: FC<{ profile: IUser }> = ({ profile }) => {
	return (
		<Card style={{ textAlign: 'center' }}>
			<Typography.Title level={1}>{profile.name}</Typography.Title>

			<div style={{ marginBottom: 25 }}>
				<InfoItem name='Дата рождения:' value={profile.birthDate} />
				<InfoItem name='Город:' value={profile.city} />
				<InfoItem name='Пол:' value={profile.gender} />
			</div>

			<Row gutter={[15, 15]}>
				<CountItem
					title={numWord(profile.friends?.length || 0, [
						'друг',
						'друга',
						'друзей'
					])}
					number={profile.friends?.length}
				/>
				<CountItem
					title={numWord(profile.friends?.length || 0, [
						'пост',
						'поста',
						'постов'
					])}
					number={profile.postsCount}
				/>
			</Row>
		</Card>
	)
}

export default ProfileInfo
