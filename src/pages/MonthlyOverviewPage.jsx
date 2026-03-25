import { useState } from "react"
import BudgetModal from "../components/overview/BudgetForm"
import ModalWindow from "../components/layout/ModalWindow"
import OverviewCharts from "../components/overview/OverviewCharts"
import Amount from "../components/ui/Amount"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import OverviewTable from "../components/overview/OverviewTable"

const MonthlyOverviewPage = (props) => {
	const {
		transactions,
		budgets,
		onUpdate,
	} = props

	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 7))
	const [isModalOpen, setIsModalOpen] = useState(false)
	const categories = ['food', 'shopping', 'transport', 'entertainment', 'income', 'savings', 'other']

	const monthlyData = transactions.filter((transaction) => {
		return transaction.date.startsWith(selectedDate)
	})

	const dateTitle = new Date(selectedDate + '-01').toLocaleString('en-US', {
		month: 'long',
		year: 'numeric',
	})

	const currentMonthBudgets = budgets[selectedDate] || {}

	const totalMonthlyIncome = monthlyData
		.filter(t => t.type === 'income')
		.reduce((acc, t) => acc + t.amount, 0)

	const totalMonthlyExpenses = monthlyData
		.filter(t => t.type === 'expense')
		.reduce((acc, t) => acc + t.amount, 0)

	const totalPlanned = Object.keys(currentMonthBudgets).reduce((acc, category) => {
		if (category.toLowerCase() !== 'income') {
			return acc + (currentMonthBudgets[category] || 0);
		}
		return acc
	}, 0)

	const categorySummary = categories.map(category => {
		const categoryTransactions = monthlyData.filter(t => t.category.toLowerCase() === category.toLowerCase())
		const netActual = categoryTransactions.reduce((acc, t) => {
			return t.type === 'income' ? acc + t.amount : acc - t.amount
		}, 0)

		const budget = currentMonthBudgets[category] || 0

		return {
			name: category,
			transactions: categoryTransactions,
			totalSpent: netActual,
			budget: budget,
			remaining: category.toLowerCase() === 'income'
				? netActual - budget
				: budget + netActual
		}
	})

	const incomeData = categorySummary.find(item => item.name === 'income')
	const expenseSummary = categorySummary.filter(item => item.name !== 'income')

	return (
		<div className="overview-page-container">
			<div className="overview-header">
				<h2>Monthly Overview & Analytics</h2>
				<h2>{dateTitle}</h2>
				<Input
					name="date"
					type="month"
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.target.value)}
				/>
				<Button onClick={() => setIsModalOpen(true)}>Set Monthly Budget</Button>
			</div>
			<div className="overview-grid">
				<div className="column column-left">
					<div className="glass-card">
						<div>
							<div>
								<strong>Total Income:</strong> <Amount value={totalMonthlyIncome} showColor={false} />
							</div>
							<div>
								<strong>Total Budget (Limit):</strong> <Amount value={totalPlanned} showColor={false} />
							</div>
							<div>
								<strong>Total Expenses:</strong> <Amount value={totalMonthlyExpenses} showColor={false} />
							</div>
							<div>
								<strong>Remaining Budget:</strong> <Amount value={totalPlanned - totalMonthlyExpenses} showColor={false} />
							</div>
						</div>
						<div>
							<h3>Income Tracking</h3>
							<p>Expected: <Amount value={incomeData?.budget} /> | Actual: <Amount value={incomeData?.totalSpent} /></p>
							<p>Difference: <Amount value={incomeData?.remaining} type="income" showColor={false} /></p>
						</div>
						<hr />
						<h3>Expense Limits</h3>
						<OverviewTable
							data={expenseSummary}
						/>
					</div>
				</div>
				<OverviewCharts
					monthlyData={monthlyData}
					currentMonthBudgets={currentMonthBudgets}
					categories={categories}
					selectedDate={selectedDate}
					totalMonthlyExpenses={totalMonthlyExpenses}
					totalMonthlyIncome={totalMonthlyIncome}
					categorySummary={categorySummary}
				/>
			</div>
			<ModalWindow
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={`Adjust Budget for ${dateTitle}`}
			>
				<BudgetModal
					categories={categories}
					currentMonthBudgets={currentMonthBudgets}
					selectedDate={selectedDate}
					onUpdate={onUpdate}
					onClose={() => setIsModalOpen(false)}
				/>
			</ModalWindow>
		</div>
	)
}

export default MonthlyOverviewPage