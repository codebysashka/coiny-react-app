import SavingsItem from "./SavingsItem"

const SavingsList = (props) => {
	const {
		items,
		onDelete,
		onDeposit,
		onWithdrow,
	} = props

	return (
		<ul>
			{items.map((item) => {
				return (
					<SavingsItem 
						key={item.id}
						data={item}
						onDelete={onDelete}
						onDeposit={onDeposit}
						onWithdrow={onWithdrow}
					/>
				)
			})}
		</ul>
	)
}

export default SavingsList