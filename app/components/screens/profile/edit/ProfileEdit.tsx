import { UploadOutlined } from '@ant-design/icons'
import {
	Avatar,
	Button,
	Card,
	DatePicker,
	Form,
	Input,
	Select,
	Skeleton,
	Typography,
	notification
} from 'antd'
import moment from 'moment'
import { FC, useState } from 'react'
import { useMutation } from 'react-query'

import Layout from '@/components/layout/Layout'
import UploadField from '@/components/ui/upload-field/UploadField'

import { IMediaResponse } from '@/services/media.service'
import { UserService } from '@/services/user.service'

import { IUserFields } from '@/types/user.interface'

import { useProfile } from '@/hooks/useProfile'

import { errorCatch } from '../../../../api/api.utils'

const DEFAULT_FORMAT = 'DD.MM.YYYY'

const ProfileEdit: FC = () => {
	const [image, setImage] = useState<IMediaResponse>({} as IMediaResponse)
	const { isLoading, data, refetch } = useProfile(({ data }) => {
		setImage({
			name: 'default',
			url: data.avatarPath
		})
	})

	const { mutateAsync } = useMutation(
		'update profile',
		(body: IUserFields) => UserService.updateProfile(body),
		{
			onError: error =>
				notification.error({
					message: errorCatch(error)
				}),
			onSuccess: async () => {
				notification.success({
					message: 'Профиль успешно обновлен!'
				})
				await refetch()
			}
		}
	)

	const onFinish = async (values: IUserFields) => {
		console.log(1)

		await mutateAsync({
			...values,
			avatarPath: image.url,
			birthDate: moment(values.birthDate).format(DEFAULT_FORMAT)
		})
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log(2)

		// notification.error({
		// 	message: errorInfo
		// })
	}

	return (
		<Layout title='Редактирование профиля'>
			<Card style={{ marginTop: '1rem' }}>
				<Typography.Title level={1} style={{ marginBottom: 25 }}>
					Редактирование профиля
				</Typography.Title>
				{isLoading ? (
					<Skeleton />
				) : (
					<Form
						labelCol={{ span: 2 }}
						wrapperCol={{ span: 5 }}
						layout='horizontal'
						initialValues={
							data
								? { ...data, birthDate: moment(data.birthDate, DEFAULT_FORMAT) }
								: {}
						}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Form.Item
							name='name'
							label='Имя'
							rules={[{ required: true, message: 'Пожалуйста укажите имя!' }]}
						>
							<Input placeholder='Введите имя' />
						</Form.Item>

						<Form.Item
							name='city'
							label='Город'
							rules={[{ required: true, message: 'Пожалуйста укажите город!' }]}
						>
							<Input placeholder='Введите город' />
						</Form.Item>

						<Form.Item
							name='birthDate'
							label='Дата рождения'
							rules={[
								{ required: true, message: 'Пожалуйста укажите дату рождения!' }
							]}
						>
							<DatePicker format={DEFAULT_FORMAT} />
						</Form.Item>

						<Form.Item
							name='gender'
							label='Пол'
							rules={[{ required: true, message: 'Пожалуйста укажите пол!' }]}
						>
							<Select>
								<Select.Option value='male'>Мужской</Select.Option>
								<Select.Option value='female'>Женский</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item>
							{image?.url && (
								<Avatar
									src={image.url}
									alt={image.name}
									size={120}
									style={{ marginBottom: 10 }}
								/>
							)}
							<UploadField
								onChange={setImage}
								Button={
									<div className='ant-btn ant-btn-default'>
										<UploadOutlined />
										<span>Нажмите для загрузки</span>
									</div>
								}
							/>
						</Form.Item>

						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Обновить профиль
							</Button>
						</Form.Item>
					</Form>
				)}
			</Card>
		</Layout>
	)
}

export default ProfileEdit
