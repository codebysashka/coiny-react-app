import { useState } from "react"
import { CATEGORIES, SUBCATEGORIES } from "../constants"
import CategorySelector from "./CategorySelector"
import ModalWindow from "../layout/ModalWindow"
import Input from "../ui/Input"
import Button from "../ui/Button"

const TransactionForm = (props) => {
	const {
		onAdd,
	} = props

	const [category, setCategory] = useState('food')
	const [subCategory, setSubCategory] = useState(SUBCATEGORIES['food'][0])
	const [spendingName, setSpendingName] = useState('')
	const [spendingAmount, setSpendingAmount] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [merchant, setMerchant] = useState('')
	const [date, setDate] = useState(new Date().toISOString().split('T')[0])

	const handleSubmit = (e) => {
		e.preventDefault()
		try {
			const calculatedResult = Function(`"use strict"; return (${spendingAmount})`)()
			const isExpense = calculatedResult < 0
			const newTransaction = {
				id: Date.now(),
				text: spendingName,
				amount: Math.abs(calculatedResult),
				type: isExpense ? 'expense' : 'income',
				merchant: merchant,
				date: date,
				category: category,
				subCategory: subCategory
			}
			onAdd(newTransaction)
			setSpendingName('')
			setSpendingAmount('')
			setMerchant('')
			setIsOpen(false)
		} catch (err) {
			alert(err.message)
		}
	}

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>New</Button>
			<ModalWindow
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title='Add New Transaction'
			>
				<form onSubmit={handleSubmit}>
					<Input
						type='text'
						name='description'
						placeholder='Description'
						value={spendingName}
						onChange={(e) => setSpendingName(e.target.value)}
					/>
					<Input
						type='text'
						name='amount'
						placeholder='Amount (e.g. 50-30+8)'
						value={spendingAmount}
						onChange={(e) => setSpendingAmount(e.target.value.replace(/[^0-9+\-*/.]/g, ''))}
					/>
					<Input
						type='text'
						name='merchant'
						placeholder='Merchant'
						value={merchant}
						onChange={(e) => setMerchant(e.target.value)}
					/>
					<Input
						type='date'
						name='date'
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<CategorySelector
						category={category}
						setCategory={setCategory}
						subCategory={subCategory}
						setSubCategory={setSubCategory}
					/>
					<Button type='submit' variant='close'>Add</Button>
				</form>
			</ModalWindow>
		</>
	)
}

export default TransactionForm