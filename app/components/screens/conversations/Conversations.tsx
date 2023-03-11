import { Card } from 'antd'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'

const Conversations: FC = () => {
	return (
		<Layout title='Диалоги'>
			<Card bordered={false} bodyStyle={{ padding: '30px 0' }}>
				<div>Conversations</div>
			</Card>
		</Layout>
	)
}

export default Conversations
