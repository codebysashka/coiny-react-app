import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import '../../styles/SavingsItems.css'
import Amount from "../ui/Amount"

const SavingsItem = (props) => {
	const {
		data,
		onDeposit,
		onWithdrow,
		onEdit
	} = props

	const [depositValue, setDepositValue] = useState('')
	const progress = Math.min((data.current / data.target) * 100, 100)

	return (
		<div className="saving-card">
			<div className="saving-info" onClick={() => onEdit(data)}>
				<div className="saving-header">
					<span className="saving-title">{data.title}</span>
					<span className="saving-percent">{progress.toFixed(0)}%</span>
				</div>

				<div className="progress-bar-bg">
					<div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
				</div>

				<div className="saving-details">
					<span>Saved: <Amount value={data.current} showColor={false} /></span>
					<span>Target: <Amount value={data.target} showColor={false} /></span>
				</div>
			</div>

			<div className="saving-actions">
				<Input
				className="input-simple"
					type="number"
					placeholder='Sum'
					value={depositValue}
					onChange={(e) => setDepositValue(e.target.value)}
				/>
				<div className="saving-btns">
					<Button onClick={() => { onDeposit(data.id, Number(depositValue)); setDepositValue(''); }}>Deposit</Button>
					<Button onClick={() => { onWithdrow(data.id, Number(depositValue)); setDepositValue(''); }}>Withdraw</Button>
				</div>
			</div>
		</div>
	)
}

export default SavingsItem