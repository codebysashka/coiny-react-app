const TransactionItem = (props) => {
	const {
		data,
		onDelete,
	} = props

	const textColor = data.type === 'income' ? 'green' : 'red'

	return (
		<li>
			<span>{data.text} </span>
			<span style={{ color: textColor }}>
				{data.type === 'income' ? '+' : '-'}{data.amount}
			</span>
			<button onClick={() => onDelete(data.id)}>Delete</button>
		</li>
	)
}

export default TransactionItem