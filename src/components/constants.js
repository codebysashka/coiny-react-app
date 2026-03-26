import foodIcon from '../assets/food.png'
import shoppingIcon from '../assets/shopping.png'
import transportIcon from '../assets/transport.png'
import entertainmentIcon from '../assets/entertainment.png'
import incomeIcon from '../assets/income.png'
import savingsIcon from '../assets/savings.png'
import otherIcon from '../assets/other.png'

export const CATEGORIES = ['food', 'shopping', 'transport', 'entertainment', 'income', 'savings', 'other']

export const SUBCATEGORIES = {
	food: ['groceries', 'cafe', 'delivery'],
	shopping: ['clothes', 'home', 'beauty'],
	transport: ['taxi', 'fuel', 'bus'],
	entertainment: ['cinema', 'games', 'hobbies'],
	income: ['salary', 'freelance', 'gift'],
	savings: ['emergency', 'vacation', 'car'],
	other: ['misc']
}

export const CATEGORY_ICONS = {
	food: foodIcon,
	shopping: shoppingIcon,
	transport: transportIcon,
	entertainment: entertainmentIcon,
	income: incomeIcon,
	savings: savingsIcon,
	other: otherIcon
}