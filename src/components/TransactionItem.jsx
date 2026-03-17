const TransactionItem = (props) => {
	const {
		data,
		onDelete,
	} = props

	const isExpense = data.type === 'expense';

	return (
		<li>
			<span>{data.text} </span>
			<span style={{ color: isExpense ? 'red' : 'green' }}>
				{isExpense ? '-' : ''}{data.amount}
			</span>
			<span> {data.merchant}</span>
			<span> {new Date(data.date).toLocaleDateString('ru-RU')}</span>
			<span> {data.category}</span>
			<button onClick={() => onDelete(data.id)}>Delete</button>
		</li>
	)
}

export default TransactionItem