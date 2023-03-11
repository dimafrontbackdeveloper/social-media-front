import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useQuery } from 'react-query'

import Layout from '@/components/layout/Layout'
import AddPost from '@/components/ui/posts/AddPost'
import Posts from '@/components/ui/posts/Posts'

import { PostService } from '@/services/post.service'

import { useAuth } from '@/hooks/useAuth'

const Home: FC = () => {
	const { push } = useRouter()
	const { user } = useAuth()

	const { data, isLoading, refetch } = useQuery(
		'get all posts',
		() => PostService.getAll(),
		{
			select: ({ data }) => data
		}
	)

	useEffect(() => {
		if (!user) push('/auth')
	}, [])

	return (
		<Layout title='Главная'>
			<div>
				<AddPost refetch={refetch} />
				<Posts
					posts={data || []}
					isLoading={isLoading}
					refetchPosts={refetch}
				/>
			</div>
		</Layout>
	)
}

export default Home
