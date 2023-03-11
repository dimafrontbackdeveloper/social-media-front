import { Button, Card } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useMutation } from 'react-query'

import { ConversationService } from '@/services/conversation.service'
import { UserService } from '@/services/user.service'

import { IUser } from '@/types/user.interface'

import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

const ProfileAvatar: FC<{ profile: IUser }> = ({ profile }) => {
	const { user } = useAuth()

	const isMyProfile = user?._id === profile._id

	const { data, refetch } = useProfile()

	const isExistsFriend = data?.friends?.some(
		friend => friend._id === profile._id
	)

	const { mutate } = useMutation(
		'toggle friend',
		() => UserService.toggleFriend(profile._id),
		{
			onSuccess: async () => {
				await refetch()
			}
		}
	)

	const { push } = useRouter()

	const { mutate: createConversation } = useMutation(
		'create conversation',
		() => ConversationService.create(profile._id),
		{
			onSuccess: async ({ data }) => {
				await push(`/conversation/${data._id}?with=${profile._id}`)
			}
		}
	)

	return (
		<Card style={{ textAlign: 'center' }}>
			{profile.avatarPath && (
				<Image
					src={profile.avatarPath}
					alt={profile.name}
					width={300}
					height={300}
					quality={90}
					layout='responsive'
				/>
			)}

			<Button
				type='dashed'
				style={{ margin: '15px 0' }}
				disabled={isMyProfile}
				onClick={() => mutate()}
			>
				{isExistsFriend ? 'Удалить из друзей' : 'Добавить в друзья'}
			</Button>
			<Button
				type='primary'
				disabled={isMyProfile}
				onClick={() => createConversation()}
			>
				Написать сообщение
			</Button>
		</Card>
	)
}

export default ProfileAvatar
