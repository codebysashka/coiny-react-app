import { useState } from "react"

const TransactionForm = (props) => {
	const {
		onAdd,
	} = props

	const [spendingName, setSpendingName] = useState('')
	const [spendingAmount, setSpendingAmount] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [type, setType] = useState('expense')

	const handleSubmit = (e) => {
		e.preventDefault()
		const newTransaction = { id: Date.now(), text: spendingName, amount: Number(spendingAmount), type: type }
		onAdd(newTransaction)
		setIsOpen(false)
		setSpendingName('');
		setSpendingAmount('');

	}
	return (
		<>
			{isOpen ? (
				<form onSubmit={handleSubmit}>
					<select value={type}
						onChange={(e) => setType(e.target.value)}>
						<option value="income">Income (+)</option>
						<option value="expense">Expense (-)</option>
					</select>
					<input type="text"
						name="description"
						value={spendingName}
						onChange={(e) => setSpendingName(e.target.value)}
					/>
					<input type="number"
						name="amount"
						value={spendingAmount}
						onChange={(e) => setSpendingAmount(e.target.value)}
					/>
					<button type="submit">Add</button>
					<button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
				</form>
			) : (
				<button onClick={() => setIsOpen(true)}>Add New Expense</button>
			)}
		</>
	)
}

export default TransactionForm