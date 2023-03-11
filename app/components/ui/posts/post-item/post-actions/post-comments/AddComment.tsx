import { SendOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification } from 'antd'
import { FC } from 'react'
import { useMutation } from 'react-query'

import { CommentService } from '@/services/comment.service'

import { ICommentFields } from '@/types/comment.interface'

const AddComment: FC<{ postId: string; refetch: any }> = ({
	postId,
	refetch
}) => {
	const [form] = Form.useForm()

	const { mutateAsync } = useMutation(
		'add comment',
		(data: ICommentFields) => CommentService.create({ ...data, postId }),
		{
			onSuccess(data) {
				form.resetFields()
				refetch()
			}
		}
	)

	const onFinish = async (values: ICommentFields) => {
		await mutateAsync(values)
	}

	const onFinishFailed = (errorInfo: any) => {
		notification.error({
			message: errorInfo
		})
	}

	return (
		<Form
			form={form}
			name='basic'
			wrapperCol={{ span: 24 }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete='off'
			style={{ position: 'relative', marginTop: 25, maxWidth: 350 }}
		>
			<Form.Item
				name='message'
				rules={[{ required: true, message: 'Message is required' }]}
			>
				<Input placeholder='Add a public comment' />
			</Form.Item>

			<Button
				type='primary'
				htmlType='submit'
				style={{ position: 'absolute', right: 0, top: 0 }}
				icon={<SendOutlined />}
			/>
		</Form>
	)
}

export default AddComment
