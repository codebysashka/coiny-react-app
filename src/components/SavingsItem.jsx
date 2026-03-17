import { useState } from "react"

const SavingsItem = (props) => {
	const {
		data,
		onDelete,
		onDeposit,
		onWithdrow,
	} = props

	const [depositValue, setDepositValue] = useState('')

	return (
		<li>
			<div>Goal: {data.title}</div>
			<div>Target: {data.target}</div>
			<div>Saved so far: {data.current}</div>
			<input type="text" 
				value={depositValue}
				onChange={(e) => setDepositValue(e.target.value)}
			/>
			<button onClick={() => {
				onDeposit(data.id, Number(depositValue))
				setDepositValue('')
			}}>Deposit</button>
			<button onClick={() => {
				onWithdrow(data.id, Number(depositValue))
				setDepositValue('')
			}}>Withdraw</button>
			<button onClick={() => onDelete(data.id)}>Delete</button>
		</li>
	)
}

export default SavingsItem