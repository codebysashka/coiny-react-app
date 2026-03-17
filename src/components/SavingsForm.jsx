import { useState } from "react"

const SavingsForm = (props) => {
	const {
		onAdd,
	} = props

	const [savingsName, setSavingsName] = useState('')
	const [targetAmount, setTargetAmount] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		const newSavings = {
			id: Date.now(),
			title: savingsName,
			target: Number(targetAmount),
			current: 0
		}
		onAdd(newSavings)
		setSavingsName('')
		setTargetAmount('')
		setIsOpen(false)
	}

	return (
		<>
			{isOpen ? (
				<form onSubmit={handleSubmit}>
					<input type="text"
						name="savingsName"
						value={savingsName}
						onChange={(e) => setSavingsName(e.target.value)}
					/>
					<input type="number"
						name="targetAmount"
						value={targetAmount}
						onChange={(e) => setTargetAmount(e.target.value)}
					/>
					<button type="submit">Add</button>
					<button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
				</form>
			) : (
				<button onClick={() => setIsOpen(true)}>Add New Savings</button>
			)}
		</>
	)
}

export default SavingsForm