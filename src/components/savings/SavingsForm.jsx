import { useState } from "react"
import ModalWindow from "../layout/ModalWindow"
import Button from "../ui/Button"
import Input from "../ui/Input"

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
			<Button onClick={() => setIsOpen(true)}>Add New Savings</Button>
			<ModalWindow
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Add new savings"
			>
				<form onSubmit={handleSubmit} name="savingsForm">
					<Input type="text"
						placeholder="Goal name"
						className="input-simple"
						name="savingsName"
						value={savingsName}
						onChange={(e) => setSavingsName(e.target.value)}
					/>
					<Input type="number"
						placeholder="Target amount"
						className="input-simple"
						name="targetAmount"
						value={targetAmount}
						onChange={(e) => setTargetAmount(e.target.value)}
					/>
					<Button type="submit" variant="primary">Add</Button>
				</form>
			</ModalWindow>
		</>
	)
}

export default SavingsForm