import '../../styles/WeeklySpending.css'
import Amount from '../ui/Amount'

const WeeklySpending = (props) => {
	const {
		monthlyData,
		selectedDate,
		lastDay,
		totalMonthlyExpenses
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

	const totalMonth = weeklyData.reduce((acc, week) => acc + week.total, 0)
	const avgWeek = (totalMonth / weeklyData.length).toFixed(2)
	const maxWeekly = Math.max(...weeklyData.map(w => w.total), 1)
	const dailyAverage = (Math.abs(totalMonthlyExpenses) / lastDay).toFixed(2)

	return (
		<div className="weekly-spending-section">
			<h3 className="main-chart-title">WEEKLY SPENDING</h3>
			<p className="main-chart-subtitle">savings excluded</p>

			<div className="single-inner-frame">
				<div className="weeks-list">
					{weeklyData.map(week => {
						const barWidth = (week.total / maxWeekly) * 100

						return (
							<div key={week.range} className="week-row">
								<span className="week-label">
									{monthShort.toUpperCase()} {week.range}
								</span>

								<div className="bar-container">
									<div
										className="bar-fill"
										style={{ width: `${barWidth}%` }}
									></div>
								</div>

								<span className="week-amount">
									<Amount value={week.total} type="expense" showColor={false} />
								</span>
							</div>
						)
					})}
				</div>

				<div className="weekly-footer">
					<div>Month to date: <strong><Amount value={totalMonth} type="expense" showColor={false} /></strong></div>
					<div>Daily average: <strong><Amount value={dailyAverage} type="expense" showColor={false} /></strong></div>
					<div>Avg/week: <strong><Amount value={avgWeek} type="expense" showColor={false} /></strong></div>
				</div>
			</div>
		</div>
	)
}

export default WeeklySpending