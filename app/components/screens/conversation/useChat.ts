import { DefaultEventsMap } from '@socket.io/component-emitter'
import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

import {
	IConversation,
	IDeleteMessageFields,
	IMessageFields
} from '@/types/message.interface'

const SERVER_URL = 'http://localhost:80'

export const useChat = (conversationId?: string | string[]) => {
	const [conversation, setConversation] = useState<IConversation>(
		{} as IConversation
	)
	const [isConnected, setIsConnected] = useState(false)

	const [socket, setSocket] = useState<Socket<
		DefaultEventsMap,
		DefaultEventsMap
	> | null>(null)

	useEffect(() => {
		if (!conversationId) return

		const newSocket = io(SERVER_URL, {
			query: { conversationId }
		})

		setSocket(newSocket)

		return () => {
			newSocket.close()
		}
	}, [conversationId, setSocket])

	useEffect(() => {
		if (!socket) return

		socket.emit('message:get', { conversationId })

		socket.on('conversation', conversation => {
			setConversation(conversation)
		})

		socket.on('connect', () => {
			socket.emit('joinRoom', { conversationId })
		})

		socket.on('joinedRoom', room => {
			setIsConnected(true)
		})
		socket.on('leftRoom', room => {
			setIsConnected(false)
		})

		return () => {
			socket.on('connect', () => {
				socket.emit('leaveRoom', { conversationId })
			})
			socket.disconnect()
		}
	}, [conversationId, socket])

	const sendMessage = (body: IMessageFields) => {
		socket?.emit('message:add', body)
	}

	const removeMessage = (body: IDeleteMessageFields) => {
		socket?.emit('message:delete', body)
	}

	return { conversation, sendMessage, removeMessage, isConnected }
}
