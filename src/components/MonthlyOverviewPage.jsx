import { useState } from "react"
import React from "react"
import BudgetModal from "./BudgetModal"

const MonthlyOverviewPage = (props) => {
	const {
		transactions,
		budgets,
		onUpdate,
	} = props

	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 7))
	const [isModalOpen, setIsModalOpen] = useState(false)
	const categories = ['food', 'shopping', 'transport', 'entertainment', 'salary', 'savings', 'other']

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

	const totalPlanned = Object.values(currentMonthBudgets).reduce((acc, val) => acc + val, 0)

	const categorySummary = categories.map(cat => {
		const catTransactions = monthlyData.filter(t => t.category.toLowerCase() === cat.toLowerCase())

		const netActual = catTransactions.reduce((acc, t) => {
			return t.type === 'income' ? acc + t.amount : acc - t.amount
		}, 0)

		const budget = currentMonthBudgets[cat] || 0

		return {
			name: cat,
			transactions: catTransactions,
			totalSpent: netActual,
			budget: budget,
			remaining: budget + netActual
		}
	})

	return (
		<>
			<input
				type="month"
				value={selectedDate}
				onChange={(e) => setSelectedDate(e.target.value)}
			/>
			<h2>{dateTitle}</h2>
			<button onClick={() => setIsModalOpen(true)}>Set Monthly Budget</button>
			<section>
				<div>
					<div>
						<strong>Total Income:</strong> {totalMonthlyIncome} ₽
					</div>
					<div>
						<strong>Total Expenses:</strong> {totalMonthlyExpenses} ₽
					</div>
					<div>
						<strong>Remaining Budget:</strong> {totalPlanned - totalMonthlyExpenses} ₽
					</div>
				</div>
				<table>
					<thead>
						<tr>
							<th>CATEGORY</th>
							<th>EXPECTED</th>
							<th>ACTUAL</th>
							<th>REMAINING</th>
						</tr>
					</thead>
					<tbody>
						{categorySummary.map((group) => (
							<React.Fragment key={group.name}>
								<tr style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}>
									<td>{group.name.toUpperCase()}</td>
									<td>{group.budget} ₽</td>
									<td>{group.totalSpent} ₽</td>
									<td style={{ color: group.remaining < 0 ? 'red' : 'green' }}>
										{group.remaining} ₽
									</td>
								</tr>
								{group.transactions.map((t) => (
									<tr key={t.id} style={{ fontSize: '0.9em', color: '#555' }}>
										<td>{t.text}</td>
										<td></td>
										<td>{t.type === 'expense' ? '-' : '+'}{t.amount}</td>
										<td></td>
									</tr>
								))}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</section>
			{isModalOpen && (
				<BudgetModal
					onClose={() => setIsModalOpen(false)}
					categories={categories}
					currentMonthBudgets={currentMonthBudgets}
					selectedDate={selectedDate}
					onUpdate={onUpdate}
					dateTitle={dateTitle}
				/>
			)}
		</>
	)
}

export default MonthlyOverviewPage