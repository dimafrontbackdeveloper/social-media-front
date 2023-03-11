import { Card, Image } from 'antd'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'

import UserInfo from '@/components/ui/posts/post-item/UserInfo'
import DeletePostButton from '@/components/ui/posts/post-item/post-actions/DeletePostButton'
import PostActions from '@/components/ui/posts/post-item/post-actions/PostActions'
import PostComments from '@/components/ui/posts/post-item/post-actions/post-comments/PostComments'

import { CommentService } from '@/services/comment.service'

import { IPost } from '@/types/post.interface'

import { useAuth } from '@/hooks/useAuth'

import styles from '../Post.module.scss'

const PostItem: FC<{ post: IPost; refetchPosts: any }> = ({
	post,
	refetchPosts
}) => {
	const { user } = useAuth()

	const commentsQuery = useQuery(
		['get comments', post._id],
		() => CommentService.getByPostId(post._id),
		{
			enabled: !!post._id,
			select: ({ data }) => data
		}
	)

	const [isOpenComment, setIsOpenComment] = useState(false)

	return (
		<Card
			className={styles.item}
			bodyStyle={{
				transition: 'all .4s ease-in-out'
			}}
		>
			<UserInfo postDate={post.createdAt} user={post.user} />
			<p>{post.content}</p>
			{post.image && <Image width={200} src={post.image} alt='' />}
			<PostActions
				postId={post._id}
				countComments={commentsQuery.data?.length || 0}
				toggleComments={() => setIsOpenComment(!isOpenComment)}
			/>
			{isOpenComment && (
				<PostComments commentsQuery={commentsQuery} postId={post._id} />
			)}
			{post.user._id === user?._id && (
				<DeletePostButton postId={post._id} refetch={refetchPosts} />
			)}
		</Card>
	)
}

export default PostItem
