import { DeleteOutlined } from '@ant-design/icons'
import { Alert, Avatar, Button, Card, Input, List } from 'antd'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC, KeyboardEvent, useState } from 'react'

import Layout from '@/components/layout/Layout'
import { isCurrentUserMessage } from '@/components/screens/conversation/conversation.utils'
import { useChat } from '@/components/screens/conversation/useChat'
import UserInfo from '@/components/ui/posts/post-item/UserInfo'

import { IUser } from '@/types/user.interface'

import { useAuth } from '@/hooks/useAuth'
import { useProfileById } from '@/hooks/useProfileById'

import styles from './Conversation.module.scss'

const ConversationPage: FC = () => {
	const { query } = useRouter()

	const { data: userTo } = useProfileById(query.with)

	const conversationId = query?.id

	const { conversation, sendMessage, removeMessage, isConnected } =
		useChat(conversationId)

	/*	const { isLoading: isLoadingConversation, data } = useQuery(
			['get conversation', conversationId],
			() => ConversationService.get(String(conversationId)),
			{
				select: ({ data }) => data,
				enabled: !!conversationId
			}
		)*/

	const [message, setMessage] = useState('')

	const { user } = useAuth()

	const addMessageHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			sendMessage({
				conversationId: String(conversationId),
				text: message,
				userFromId: String(user?._id),
				userToId: String(userTo?._id)
			})

			setMessage('')
		}
	}

	const removeMessageHandler = async (messageId: string) => {
		removeMessage({
			conversationId: String(conversationId),
			messageId
		})
	}

	return (
		<Layout title='Диалог'>
			<div style={{ marginTop: '1rem' }}>
				<Card
					bodyStyle={{
						paddingBottom: 10
					}}
					style={{
						backgroundColor: '#eaf4ff'
					}}
				>
					<UserInfo user={userTo || ({} as IUser)} />
				</Card>
				{isConnected ? (
					<Alert type='success' message='Connected' />
				) : (
					<Alert type='error' message='Not connected' />
				)}
				<Card
					id='scrollableDiv'
					style={{
						maxHeight: 400,
						overflow: 'auto',
						margin: '1rem 0'
					}}
				>
					<List
						dataSource={conversation.messages || []}
						renderItem={item => (
							<List.Item
								key={item._id}
								className={styles.item}
								style={
									isCurrentUserMessage(item, String(user?._id))
										? {
												justifyContent: 'flex-end'
										  }
										: {}
								}
							>
								<List.Item.Meta
									avatar={
										<Avatar src={item.userFrom.avatarPath} size='large' />
									}
									title={item.userFrom.name}
									description={item.text}
									className={cn(styles.message, {
										[styles.current]: isCurrentUserMessage(
											item,
											String(user?._id)
										)
									})}
								/>
								{isCurrentUserMessage(item, String(user?._id)) && (
									<Button
										type='text'
										style={{
											position: 'absolute',
											bottom: 10,
											right: 47,
											opacity: 0.5
										}}
										title='Удалить сообщение'
										onClick={() => removeMessageHandler(item._id)}
									>
										<DeleteOutlined style={{ color: '#F8466E' }} />
									</Button>
								)}
							</List.Item>
						)}
					/>
				</Card>
				<Input
					placeholder='Введите сообщение'
					value={message}
					onChange={e => setMessage(e.target.value)}
					onKeyPress={addMessageHandler}
				/>
			</div>
		</Layout>
	)
}

export default ConversationPage
