import { IUser, IUserFields } from '@/types/user.interface'

import { axiosAuth, axiosClassic } from '../api/interceptors'

export const UserService = {
	async findUsers(searchTerm: string) {
		return axiosClassic.get<IUser[]>(`/user/find/${searchTerm}`)
	},

	async getUser(userId: string) {
		return axiosClassic.get<IUser>(`/user/by-id/${userId}`)
	},

	async getProfile() {
		return axiosAuth.get<IUser>(`/user/profile`)
	},

	async updateProfile(body: IUserFields) {
		return axiosAuth.put<IUser>(`/user/profile`, body)
	},

	async toggleFriend(friendId: string) {
		return axiosAuth.patch<boolean>(`/user/${friendId}`)
	}
}
