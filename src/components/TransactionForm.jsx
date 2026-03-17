import { useState } from "react"

const TransactionForm = (props) => {
	const {
		onAdd,
	} = props

	const [spendingName, setSpendingName] = useState('')
	const [spendingAmount, setSpendingAmount] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [category, setCategory] = useState('food')
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
				category: category
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
			{isOpen ? (
				<form onSubmit={handleSubmit}>
					<input type="text"
						name="description"
						value={spendingName}
						onChange={(e) => setSpendingName(e.target.value)}
					/>
					<input type="text"
						name="amount"
						value={spendingAmount}
						onChange={(e) => {
							const val = e.target.value.replace(/[^0-9+\-*/.]/g, '');
							setSpendingAmount(val);
						}}
						placeholder="e.g. -35-45 or 100+50"
					/>
					<input type="text"
						value={merchant}
						onChange={(e) => setMerchant(e.target.value)}
					/>
					<input type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<select value={category} onChange={(e) => setCategory(e.target.value)}>
						<option value="food">Food</option>
						<option value="shopping">Shopping</option>
						<option value="transport">Transport</option>
						<option value="entertainment">Entertainment</option>
						<option value="salary">Salary</option>
						<option value="savings">Savings</option>
						<option value="other">Other</option>
					</select>
					<button type="submit">Add</button>
					<button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
				</form>
			) : (
				<button onClick={() => setIsOpen(true)}>New</button>
			)}
		</>
	)
}

export default TransactionForm