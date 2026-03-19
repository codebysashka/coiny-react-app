const OverviewCharts = (props) => {
	const {
		monthlyData,
		currentMonthBudgets,
		categories,
		selectedDate,
		totalMonthlyExpenses,
		totalMonthlyIncome,
		categorySummary,
	} = props

	const [year, month] = selectedDate.split('-').map(Number)
	const lastDay = new Date(year, month, 0).getDate()
	const weeklyData = [
		{ range: '1-7', start: 1, end: 7, total: 0 },
		{ range: '8-14', start: 8, end: 14, total: 0 },
		{ range: '15-21', start: 15, end: 21, total: 0 },
		{ range: '22-28', start: 22, end: 28, total: 0 },
	]
	const monthShort = new Date(selectedDate + '-01').toLocaleString('en-US', { month: 'short' })

	const expectedMonthlyIncome = currentMonthBudgets['income'] || 0
	const expectedMonthlyExpenses = Object.keys(currentMonthBudgets).reduce((acc, category) => {
		if (category !== 'income') {
			return acc + (currentMonthBudgets[category] || 0)
		}
		return acc
	}, 0)

	const expectedRatio = expectedMonthlyIncome > 0
		? (expectedMonthlyExpenses / expectedMonthlyIncome) * 100
		: 0

	const actualRatio = totalMonthlyIncome > 0
		? (Math.abs(totalMonthlyExpenses) / totalMonthlyIncome) * 100
		: 0

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

	if (lastDay > 28) {
		weeklyData.push({
			range: `29-${lastDay}`,
			start: 29,
			end: lastDay,
			total: 0
		})
	}

	monthlyData.forEach(t => {
		if (t.type === 'expense') {
			const day = Number(t.date.split('-')[2])
			const week = weeklyData.find(w => day >= w.start && day <= w.end)
			if (week) {
				week.total += t.amount
			}
		}
	})

	return (
		<div>
			<div>
				<h3>Weekly Spending</h3>
				{weeklyData.map(week => (
					<div key={week.range}>
						<span>{monthShort} {week.range}: </span>
						<strong>{week.total} ₽</strong>
					</div>
				))}
			</div>
			<div>
				<h3>MONEY IN / MONEY OUT</h3>
				<div style={{ display: 'flex', gap: '40px' }}>
					<div>
						<p>EXPECTED</p>
						<div style={{ display: 'flex', gap: '15px' }}>
							<div>
								<strong>{expectedMonthlyIncome} ₽</strong>
								<div>MONEY IN</div>
							</div>
							<div>
								<strong>{expectedMonthlyExpenses} ₽</strong>
								<div>MONEY OUT</div>
							</div>
						</div>
						<p>Out / In: {expectedRatio.toFixed(1)}%</p>
					</div>
					<div>
						<p>ACTUAL</p>
						<div style={{ display: 'flex', gap: '15px' }}>
							<div>
								<strong>{totalMonthlyIncome} ₽</strong>
								<div>MONEY IN</div>
							</div>
							<div>
								<strong>{Math.abs(totalMonthlyExpenses)} ₽</strong>
								<div>MONEY OUT</div>
							</div>
						</div>
						<p>Out / In: {actualRatio.toFixed(1)}%</p>
					</div>
				</div>
			</div>
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
			<div>
				<h3>MONTHLY INSIGHTS</h3>
				{top8Subcategories.map(item => (
					<div>
						<span>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
						<span> {item.percent} %</span>
					</div>
				))}
				<div>Daily average: {dailyAverage} ₽</div>
				<div>Biggest purchase: {biggestExpense.text} ({biggestExpense.amount} ₽)</div>
			</div>
		</div>
	)
}

export default OverviewCharts