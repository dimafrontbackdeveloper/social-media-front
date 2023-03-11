export interface IUser {
	_id: string
	email: string
	name: string
	isVerified?: boolean
	birthDate?: string
	city?: string
	gender?: string
	avatarPath: string
	friends?: IUser[]
	postsCount?: number
}

export interface IUserFields extends Pick<IUser, 'name'> {
	avatarPath: string
	birthDate: string
	city: string
	gender: 'male' | 'female'
}
