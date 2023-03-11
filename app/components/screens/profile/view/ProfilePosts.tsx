import { FC } from 'react'
import { useQuery } from 'react-query'

import AddPost from '@/components/ui/posts/AddPost'
import Posts from '@/components/ui/posts/Posts'

import { PostService } from '@/services/post.service'

const ProfilePosts: FC<{ userId: string }> = ({ userId }) => {
	const { data, isLoading, refetch } = useQuery(
		['get post by user id', userId],
		() => PostService.getByUserId(userId),
		{
			select: ({ data }) => data,
			enabled: !!userId
		}
	)

	return (
		<div>
			<AddPost col={2} refetch={refetch} />
			<Posts posts={data || []} isLoading={isLoading} refetchPosts={refetch} />
		</div>
	)
}

export default ProfilePosts
