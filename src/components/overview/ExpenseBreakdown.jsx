const ExpenseBreakdown = (props) => {
	const {
		categories,
		currentMonthBudgets,
		totalMonthlyExpenses,
		categorySummary,
		expectedMonthlyExpenses,
	} = props

	const expectedPieData = categories
		.filter(category => category !== 'income')
		.map(category => {
			const budgetValue = currentMonthBudgets[category] || 0
			const percent = expectedMonthlyExpenses > 0
				? (budgetValue / expectedMonthlyExpenses) * 100
				: 0

			return {
				name: category,
				percent: percent.toFixed(1)
			}
		})

	const actualPieData = categorySummary
		.filter(group => group.name !== 'income')
		.map(group => {
			const onlyExpenses = group.transactions
				.filter(t => t.type === 'expense')
				.reduce((acc, t) => acc + t.amount, 0)

			const totalActualExpenses = totalMonthlyExpenses
			const percent = totalActualExpenses > 0
				? (onlyExpenses / totalActualExpenses) * 100
				: 0

			return {
				name: group.name,
				percent: percent.toFixed(1)
			}
		})

	const sortedActualPieData = [...actualPieData].sort((a, b) => b.percent - a.percent)
	const sortedExpectedPieData = [...expectedPieData].sort((a, b) => b.percent - a.percent)

	return (
		<div>
			<h3>Expense Breakdown</h3>
			<div style={{ display: 'flex', gap: '50px' }}>
				<div>
					<h4>EXPECTED</h4>
					{sortedExpectedPieData.map(item => (
						<div key={item.name}>{item.name}: {item.percent}%</div>
					))}
				</div>
				<div>
					<h4>ACTUAL</h4>
					{sortedActualPieData.map(item => (
						<div key={item.name}>{item.name}: {item.percent}%</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ExpenseBreakdown