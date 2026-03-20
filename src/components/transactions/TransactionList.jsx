import TransactionItem from "./TransactionItem"

const TransactionList = (props) => {
	const {
		items,
		onDelete,
	} = props

	return (
		<ul>
			{items.map((item) => {
				return (
					<TransactionItem
						key={item.id}
						data={item}
						onDelete={onDelete}
					/>
				)
			})}
		</ul>
	)
}

export default TransactionList