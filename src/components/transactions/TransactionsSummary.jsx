import Amount from "../ui/Amount"

const TransactionsSummary = (props) => {

	const {
		items
	} = props

	const income = items
		.filter(item => item.type === 'income')
		.reduce((acc, curr) => acc + curr.amount, 0)

	const expenses = items
		.filter(item => item.type === 'expense')
		.reduce((acc, curr) => acc + curr.amount, 0)

	const net = income - expenses

	return (
		<div className="transactions-summary" style={{ display: 'flex', gap: '20px', margin: '15px 0' }}>
			<div>
				<span>Total Income: </span>
				<Amount value={income} type="income" />
			</div>
			<div>
				<span>Total Expenses: </span>
				<Amount value={expenses} type="expense" />
			</div>
			<div>
				<span>Net: </span>
				<Amount value={net} type={net >= 0 ? 'income' : 'expense'} />
			</div>
		</div>
	)
}

export default TransactionsSummary