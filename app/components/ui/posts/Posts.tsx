import { Alert, Skeleton } from 'antd'
import { FC } from 'react'

import PostItem from '@/components/ui/posts/post-item/PostItem'

import { IPost } from '@/types/post.interface'

const Posts: FC<{ posts: IPost[]; isLoading: boolean; refetchPosts: any }> = ({
	posts,
	isLoading,
	refetchPosts
}) => {
	return (
		<>
			{isLoading ? (
				<Skeleton />
			) : posts?.length ? (
				posts.map(post => (
					<PostItem post={post} key={post._id} refetchPosts={refetchPosts} />
				))
			) : (
				<Alert message='Постов не найдено!' style={{ marginTop: 17 }} />
			)}
		</>
	)
}

export default Posts
