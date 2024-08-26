import { defineAsyncComponent } from 'vue'

const Avatar = defineAsyncComponent(() => import('./avatar.vue'))
const Button = defineAsyncComponent(() => import('./button.vue'))
const CardRating = defineAsyncComponent(() => import('./cardRating.vue'))
const Checkbox = defineAsyncComponent(() => import('./checkbox.vue'))
const DatePicker = defineAsyncComponent(() => import('./datePicker.vue'))
const EmptyJobOffer = defineAsyncComponent(() => import('./emptyJobOffer.vue'))
const EnergyIndicator = defineAsyncComponent(() => import('./energyIndicator.vue'))
const Input = defineAsyncComponent(() => import('./input.vue'))
const InputFile = defineAsyncComponent(() => import('./inputFile.vue'))
const JobOffer = defineAsyncComponent(() => import('./jobOffer.vue'))
const JobSearch = defineAsyncComponent(() => import('./jobSearch.vue'))
const Message = defineAsyncComponent(() => import('./message.vue'))
const RatingStars = defineAsyncComponent(() => import('./ratingStars.vue'))
const Notifications = defineAsyncComponent(() => import('./notifications.vue'))
const SearchTags = defineAsyncComponent(() => import('./searchTags.vue'))
const Select = defineAsyncComponent(() => import('./select.vue'))
const SelectLive = defineAsyncComponent(() => import('./selectLive.vue'))
const Textarea = defineAsyncComponent(() => import('./textarea.vue'))
import ThemeColorToggle from './themeColorToggle.vue'
const User = defineAsyncComponent(() => import('./user.vue'))
const UserCard = defineAsyncComponent(() => import('./userCard.vue'))
const UserDropdown = defineAsyncComponent(() => import('./userDropdown.vue'))

export {
	Avatar,
	Button,
	CardRating,
	Checkbox,
	DatePicker,
	EmptyJobOffer,
	EnergyIndicator,
	Input,
	InputFile,
	JobOffer,
	JobSearch,
	Message,
	RatingStars,
	Notifications,
	SearchTags,
	Select,
	SelectLive,
	Textarea,
	ThemeColorToggle,
	User,
	UserCard,
	UserDropdown
}