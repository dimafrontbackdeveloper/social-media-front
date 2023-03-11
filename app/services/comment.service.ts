import { IComment, ICommentFields } from '@/types/comment.interface'

import { axiosAuth, axiosClassic } from '../api/interceptors'

export const CommentService = {
	async getByPostId(postId: string) {
		return axiosClassic.get<IComment[]>(`/comment/by-post/${postId}`)
	},

	async create(body: ICommentFields) {
		return axiosAuth.post<IComment>(`/comment`, body)
	}
}
