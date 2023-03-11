import { axiosAuth } from '../api/interceptors'

export interface IMediaResponse {
	name: string
	url: string
}

export const MediaService = {
	async upload(media: FormData, folder?: string) {
		return axiosAuth.post<IMediaResponse>('/media', media, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}
