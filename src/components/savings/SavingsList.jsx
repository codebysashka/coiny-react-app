import SavingsItem from "./SavingsItem"

const SavingsList = (props) => {
	const {
		items,
		onDelete,
		onDeposit,
		onWithdrow,
		onEdit
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
						onEdit={onEdit}
					/>
				)
			})}
		</ul>
	)
}

export default SavingsList