export interface IDropdownMenuItem {
	text: string
	to?: string
	can?: boolean
	action?: () => void
	created?: string
	checked?: boolean
}