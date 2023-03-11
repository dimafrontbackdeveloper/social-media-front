import { ReactElement } from 'react'

export interface IUploadField {
	onChange: (...event: any) => void
	folder?: string
	Button: ReactElement
}
