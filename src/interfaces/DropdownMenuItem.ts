export interface IDropdownMenuItem {
	text: string
	to?: string
	can?: boolean
	action?: () => void
}