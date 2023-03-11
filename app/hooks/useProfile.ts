import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'

import { UserService } from '@/services/user.service'

import { IUser } from '@/types/user.interface'

export const useProfile = (
	successCallback?: (data: AxiosResponse<IUser, any>) => void
) => {
	const { isLoading, data, refetch } = useQuery(
		'get profile',
		() => UserService.getProfile(),
		successCallback
			? {
					onSuccess: successCallback
			  }
			: {}
	)

	return { isLoading, data: data?.data, refetch }
}
