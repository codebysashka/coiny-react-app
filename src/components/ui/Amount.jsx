const Amount = (props) => {
	const {
		value,
		type,
		showColor = true
	} = props

	const isExpense = type === 'expense'
	const isIncome = type === 'income'

	const colorStyle = !showColor
		? 'inherit'
		: (isExpense ? 'red' : isIncome ? 'green' : 'inherit')

	const style = {
		color: colorStyle,
		fontWeight: 'bold'
	}

	const sign = isExpense ? '-' : isIncome ? '+' : ''

	return (
		<span style={style}>
			{sign}{Math.abs(value)} ₽
		</span>
	)
}

export default Amount