import WeeklySpending from "./WeeklySpending"
import MoneyComparison from "./MoneyComparison"
import ExpenseBreakdown from "./ExpenseBreakdown"
import MonthlyInsights from "./MonthlyInsights"
import '../../styles/OverviewCharts.css'

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

	const expectedMonthlyIncome = currentMonthBudgets['income'] || 0
	const expectedMonthlyExpenses = Object.keys(currentMonthBudgets).reduce((acc, category) => {
		if (category !== 'income') {
			return acc + (currentMonthBudgets[category] || 0)
		}
		return acc
	}, 0)


	return (
		<>
			<div className="column column-center">
				<div className="glass-card">
					<WeeklySpending
						monthlyData={monthlyData}
						selectedDate={selectedDate}
						lastDay={lastDay}
						totalMonthlyExpenses={totalMonthlyExpenses}
					/>
				</div>
				<div className="glass-card">
					<MoneyComparison
						totalMonthlyIncome={totalMonthlyIncome}
						totalMonthlyExpenses={totalMonthlyExpenses}
						expectedMonthlyExpenses={expectedMonthlyExpenses}
						expectedMonthlyIncome={expectedMonthlyIncome}
					/>
				</div>
				<div className="glass-card">
					<ExpenseBreakdown
						categories={categories}
						currentMonthBudgets={currentMonthBudgets}
						totalMonthlyExpenses={totalMonthlyExpenses}
						categorySummary={categorySummary}
						expectedMonthlyExpenses={expectedMonthlyExpenses}
					/>
				</div>
			</div>
			<div className="column column-right">
				<div className="glass-card">
					<MonthlyInsights
						monthlyData={monthlyData}
						totalMonthlyExpenses={totalMonthlyExpenses}
						selectedDate={selectedDate}
					/>
				</div>
			</div>
		</>
	)
}

export default OverviewCharts