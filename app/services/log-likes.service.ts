import { axiosAuth, axiosClassic } from '../api/interceptors'

export const LogLikeService = {
	async getCountLikesByPostId(postId: string) {
		return axiosClassic.get<number>(`/log-likes/get-count/${postId}`)
	},

	async checkExists(postId: string) {
		return axiosAuth.get<boolean>(`/log-likes/check-exists/${postId}`)
	},

	async toggleLike(postId: string) {
		return axiosAuth.put(`/log-likes/${postId}`)
	}
}
