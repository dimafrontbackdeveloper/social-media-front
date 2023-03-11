import { ForwardRefExoticComponent } from 'react'

export interface IMenuItem {
	title: string
	link: string
	icon: ForwardRefExoticComponent<any>
}
