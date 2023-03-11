import { IConversation } from '@/types/message.interface'

import { axiosAuth } from '../api/interceptors'

export const ConversationService = {
	async get(conversationId: string) {
		return axiosAuth.get<IConversation>(`/conversation/${conversationId}`)
	},

	async create(withUserId: string) {
		return axiosAuth.post<IConversation>(`/conversation`, { withUserId })
	}
}
