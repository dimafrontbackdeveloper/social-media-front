import { SearchOutlined } from '@ant-design/icons'
import { Card, Skeleton } from 'antd'
import cn from 'classnames'
import { FC } from 'react'

import { useSearch } from '@/components/layout/header/Search/useSearch'
import UserCard from '@/components/ui/user-card/UserCard'

import styles from '../Header.module.scss'

const Search: FC = () => {
	const { data, handleSearch, setSearchTerm, searchTerm, isLoading, visible } =
		useSearch()

	const hideResult = () => {
		setSearchTerm('')
		visible.setIsShow(false)
	}

	return (
		<div
			ref={visible.ref}
			className={cn(styles.wrapper, {
				[styles.active]: visible.isShow
			})}
		>
			<SearchOutlined className='fade' />
			<input
				type='text'
				placeholder='Поиск пользователей...'
				value={searchTerm}
				onChange={handleSearch}
			/>
			{visible.isShow && (
				<Card bordered={false} className={cn(styles.result, 'fade')}>
					{isLoading ? (
						<Skeleton />
					) : data?.length ? (
						data.map(user => (
							<UserCard user={user} key={user._id} hideResult={hideResult} />
						))
					) : (
						<div>Пользователей не найдено!</div>
					)}
				</Card>
			)}
		</div>
	)
}

export default Search
