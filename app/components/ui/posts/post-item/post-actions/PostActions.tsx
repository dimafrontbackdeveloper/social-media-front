import { FC } from 'react'

import PostLikesButton from '@/components/ui/posts/post-item/post-actions/PostLikesButton'
import PostCommentsButton from '@/components/ui/posts/post-item/post-actions/post-comments/PostCommentsButton'

export interface IPostCommentsButton {
	postId: string
	countComments: number
	toggleComments: () => void
}

const PostActions: FC<IPostCommentsButton> = ({
	postId,
	countComments,
	toggleComments
}) => {
	return (
		<div style={{ marginTop: 15 }}>
			<PostLikesButton postId={postId} />
			<PostCommentsButton
				postId={postId}
				countComments={countComments}
				toggleComments={toggleComments}
			/>
		</div>
	)
}

export default PostActions
