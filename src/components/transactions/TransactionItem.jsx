import Amount from "../ui/Amount"

const TransactionItem = (props) => {
	const {
		data,
		onDelete,
	} = props

	return (
		<li>
			<span>{data.text} </span>
			<span>
				<Amount value={data.amount} type={data.type} />
			</span>
			<span> {data.merchant}</span>
			<span> {new Date(data.date).toLocaleDateString('ru-RU')}</span>
			<span> {data.category}</span>
			<span> {data.subCategory}</span>
			<button onClick={() => onDelete(data.id)}>Delete</button>
		</li>
	)
}

export default TransactionItem