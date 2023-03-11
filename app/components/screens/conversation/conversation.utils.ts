import { IMessage } from '@/types/message.interface'

export const isCurrentUserMessage = (item: IMessage, currentUserId?: string) =>
	currentUserId === item.userFrom._id
