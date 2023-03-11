import Cookies from 'js-cookie'

import { IUser } from '@/types/user.interface'

export type TypeUser = IUser | null

export interface IAuthData {
	user: TypeUser
	accessToken: string
}

export const saveTokenToStorage = (accessToken: string) => {
	Cookies.set('accessToken', accessToken)
}

export const removeTokenFromStorage = () => {
	Cookies.remove('accessToken')
}

export const saveToStorage = (data: IAuthData) => {
	saveTokenToStorage(data.accessToken)
	localStorage.setItem('user', JSON.stringify(data.user))
}
