import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FC } from 'react'
import { useMutation, useQuery } from 'react-query'

import { LogLikeService } from '@/services/log-likes.service'

import { useAuth } from '@/hooks/useAuth'

const isActive = true

const PostLikesButton: FC<{ postId: string }> = ({ postId }) => {
	const { user } = useAuth()

	const { data: likes, refetch } = useQuery(
		['get likes', postId],
		() => LogLikeService.getCountLikesByPostId(postId),
		{
			enabled: !!postId,
			select: ({ data }) => data
		}
	)

	const { data: isLiked, refetch: refetchLikeStatus } = useQuery(
		['check like by post id', postId],
		() => LogLikeService.checkExists(postId),
		{
			enabled: !!postId && !!user,
			select: ({ data }) => data
		}
	)

	const { mutate } = useMutation(
		['toggle like', postId],
		() => LogLikeService.toggleLike(postId),
		{
			onSuccess: async () => {
				await refetchLikeStatus()
				await refetch()
			}
		}
	)

	return (
		<Button
			icon={
				isLiked ? (
					<HeartFilled style={{ color: '#40a9ff' }} />
				) : (
					<HeartOutlined />
				)
			}
			type='dashed'
			onClick={() => mutate()}
			className='outline-none'
		>
			<span>{likes}</span>
		</Button>
	)
}

export default PostLikesButton
