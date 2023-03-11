import { Col, Row } from 'antd'
import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/useAuth'

import styles from './Layout.module.scss'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

const Layout: FC<PropsWithChildren<{ title: string }>> = ({
	children,
	title
}) => {
	const { user } = useAuth()

	return (
		<>
			<Head>
				<title>{title} | VK Clone by htmllessons.ru</title>
			</Head>
			<Header />
			<Row gutter={[20, 30]} className={styles.container}>
				{user && (
					<Col xl={4} xs={24}>
						<Sidebar />
					</Col>
				)}
				<Col span={user ? 20 : 24}>{children}</Col>
			</Row>
		</>
	)
}

export default Layout
