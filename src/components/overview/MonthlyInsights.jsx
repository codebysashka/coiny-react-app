const MonthlyInsights = (props) => {
	const {
		monthlyData,
		totalMonthlyExpenses,
		lastDay
	} = props

	const subCategoryTotals = monthlyData
		.filter(t => t.type === 'expense')
		.reduce((acc, t) => {
			const sub = t.subCategory || 'other'
			acc[sub] = (acc[sub] || 0) + t.amount
			return acc
		}, {})

	const top8Subcategories = Object.keys(subCategoryTotals)
		.map(name => {
			const amount = subCategoryTotals[name]
			const totalExp = Math.abs(totalMonthlyExpenses)
			return {
				name: name,
				amount: amount,
				percent: totalExp > 0 ? ((amount / totalExp) * 100).toFixed(1) : 0
			}
		})
		.sort((a, b) => b.amount - a.amount)
		.slice(0, 8)

	const dailyAverage = (Math.abs(totalMonthlyExpenses) / lastDay).toFixed(2)
	const biggestExpense = monthlyData
		.filter(t => t.type === 'expense')
		.reduce((prev, current) => (prev.amount > current.amount) ? prev : current, { text: 'None', amount: 0 })

	return (
		<div>
			<h3>MONTHLY INSIGHTS</h3>
			{top8Subcategories.map(item => (
				<div key={item.name}>
					<span>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
					<span> {item.percent} %</span>
				</div>
			))}
			<div>Daily average: {dailyAverage} ₽</div>
			<div>Biggest purchase: {biggestExpense.text} ({biggestExpense.amount} ₽)</div>
		</div>
	)
}

export default MonthlyInsights