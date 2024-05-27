import { defineAsyncComponent } from 'vue'

const Avatar = defineAsyncComponent(() => import('./Avatar.vue'))
const Button = defineAsyncComponent(() => import('./Button.vue'))
const DatePicker = defineAsyncComponent(() => import('./DatePicker.vue'))
const EmptyJobOffer = defineAsyncComponent(() => import('./EmptyJobOffer.vue'))
const Input = defineAsyncComponent(() => import('./Input.vue'))
const JobOffer = defineAsyncComponent(() => import('./JobOffer.vue'))
const JobSearch = defineAsyncComponent(() => import('./JobSearch.vue'))
const Rating = defineAsyncComponent(() => import('./Rating.vue'))
const SearchTags = defineAsyncComponent(() => import('./SearchTags.vue'))
const Select = defineAsyncComponent(() => import('./Select.vue'))
const SelectLive = defineAsyncComponent(() => import('./SelectLive.vue'))
const Textarea = defineAsyncComponent(() => import('./Textarea.vue'))
const ThemeColorToggle = defineAsyncComponent(() => import('./ThemeColorToggle.vue'))
const User = defineAsyncComponent(() => import('./User.vue'))
const UserDropdown = defineAsyncComponent(() => import('./UserDropdown.vue'))


export {
	Avatar,
	Button,
	DatePicker,
	EmptyJobOffer,
	Input,
	JobOffer,
	JobSearch,
	Rating,
	SearchTags,
	Select,
	SelectLive,
	Textarea,
	ThemeColorToggle,
	User,
	UserDropdown
}