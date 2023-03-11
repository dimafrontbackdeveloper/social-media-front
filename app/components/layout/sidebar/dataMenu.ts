import {
	FileTextOutlined,
	HomeOutlined,
	ProfileOutlined
} from '@ant-design/icons'

import { IMenuItem } from '@/types/menu.interface'

export const menu: IMenuItem[] = [
	{
		title: 'Моя страница',
		link: '/profile',
		icon: HomeOutlined
	},
	{
		title: 'Друзья',
		link: '/friends',
		icon: ProfileOutlined
	},
	{
		title: 'Новости',
		link: '/',
		icon: FileTextOutlined
	}
]
