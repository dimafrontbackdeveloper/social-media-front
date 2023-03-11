import { IMessageFields } from '@/types/message.interface'

import { axiosAuth } from '../api/interceptors'

export const MessageService = {
	async create(body: IMessageFields) {
		return axiosAuth.post(`/message`)
	},

	async delete(messageId: string, conversationId: string) {
		return axiosAuth.delete(`/message/${messageId}`, {
			params: {
				conversationId
			}
		})
	}
}
