import { useState } from "react"
import { CATEGORIES, SUBCATEGORIES } from "./constants"
import CategorySelector from "./CategorySelector"
import ModalWindow from "./ModalWindow"

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
			<button onClick={() => setIsOpen(true)}>New</button>
			<ModalWindow
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Add New Transaction"
			>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Description"
						value={spendingName}
						onChange={(e) => setSpendingName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Amount"
						value={spendingAmount}
						onChange={(e) => setSpendingAmount(e.target.value.replace(/[^0-9+\-*/.]/g, ''))}
					/>
					<input
						type="text"
						placeholder="Merchant"
						value={merchant}
						onChange={(e) => setMerchant(e.target.value)}
					/>
					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<CategorySelector
						category={category}
						setCategory={setCategory}
						subCategory={subCategory}
						setSubCategory={setSubCategory}
					/>
					<button type="submit">Add</button>
				</form>
			</ModalWindow>
		</>
	)
}

export default TransactionForm