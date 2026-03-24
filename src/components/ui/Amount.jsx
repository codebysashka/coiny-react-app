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
		: (isExpense ? '#ff4757' : isIncome ? '#26de81' : 'inherit')

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