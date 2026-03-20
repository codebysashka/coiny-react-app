import WeeklySpending from "./WeeklySpending"
import MoneyComparison from "./MoneyComparison"
import ExpenseBreakdown from "./ExpenseBreakdown"
import MonthlyInsights from "./MonthlyInsights"

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
		<div>
			<WeeklySpending
				monthlyData={monthlyData}
				selectedDate={selectedDate}
				lastDay={lastDay}
			/>
			<MoneyComparison
				totalMonthlyIncome={totalMonthlyIncome}
				totalMonthlyExpenses={totalMonthlyExpenses}
				expectedMonthlyExpenses={expectedMonthlyExpenses}
				expectedMonthlyIncome={expectedMonthlyIncome}
			/>
			<ExpenseBreakdown
				categories={categories}
				currentMonthBudgets={currentMonthBudgets}
				totalMonthlyExpenses={totalMonthlyExpenses}
				categorySummary={categorySummary}
				expectedMonthlyExpenses={expectedMonthlyExpenses}
			/>

			<MonthlyInsights
				monthlyData={monthlyData}
				totalMonthlyExpenses={totalMonthlyExpenses}
				selectedDate={selectedDate}
				lastDay={lastDay}
			/>
		</div>
	)
}

export default OverviewCharts