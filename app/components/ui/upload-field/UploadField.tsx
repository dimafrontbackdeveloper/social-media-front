import { FC } from 'react'

import { IUploadField } from '@/components/ui/upload-field/upload-field.interface'
import { useUploadFile } from '@/components/ui/upload-field/useUploadFile'

import styles from './UploadField.module.scss'

const UploadField: FC<IUploadField> = ({ Button, onChange, folder }) => {
	const { uploadFile } = useUploadFile(onChange, folder)

	return (
		<div className={styles.file}>
			<label>
				{Button}
				<input type='file' onChange={uploadFile} />
			</label>
		</div>
	)
}

export default UploadField
