const WeeklySpending = (props) => {
	const {
		monthlyData,
		selectedDate,
		lastDay
	} = props
	
	const monthShort = new Date(selectedDate + '-01').toLocaleString('en-US', { month: 'short' })
	const weeklyData = [
		{ range: '1-7', start: 1, end: 7, total: 0 },
		{ range: '8-14', start: 8, end: 14, total: 0 },
		{ range: '15-21', start: 15, end: 21, total: 0 },
		{ range: '22-28', start: 22, end: 28, total: 0 },
	]

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
			<h3>Weekly Spending</h3>
			{weeklyData.map(week => (
				<div key={week.range}>
					<span>{monthShort} {week.range}: </span>
					<strong>{week.total} ₽</strong>
				</div>
			))}
		</div>
	)
}

export default WeeklySpending