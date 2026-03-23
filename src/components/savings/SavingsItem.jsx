import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"

const SavingsItem = (props) => {
	const {
		data,
		onDeposit,
		onWithdrow,
		onEdit
	} = props

	const [depositValue, setDepositValue] = useState('')

	return (
		<li style={{ cursor: 'pointer', marginBottom: '20px' }}>
			<div onClick={() => onEdit(data)}>
				<div>Goal: {data.title}</div>
				<div>Target: {data.target}</div>
				<div>Saved so far: {data.current}</div>
			</div>
			<Input
				type="text"
				name="amount"
				placeholder='Amount'
				value={depositValue}
				onChange={(e) => setDepositValue(e.target.value)}
			/>
			<Button onClick={() => {
				onDeposit(data.id, Number(depositValue))
				setDepositValue('')
			}}>Deposit</Button>
			<Button onClick={() => {
				onWithdrow(data.id, Number(depositValue))
				setDepositValue('')
			}}>Withdraw</Button>
		</li>
	)
}

export default SavingsItem