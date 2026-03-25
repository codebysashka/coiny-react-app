import { useState } from 'react'
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'
import PLAN_IMG from '../../assets/120ea965ef1a6ec99f90068c9b6ed765.jpg'
import FACT_IMG from '../../assets/786a63d28803c3bd21b7cd09c6046842.jpg'
import '../../styles/ExpenseBreakdown.css'

const ExpenseBreakdown = (props) => {
	const {
		categories,
		currentMonthBudgets,
		totalMonthlyExpenses,
		categorySummary,
		expectedMonthlyExpenses
	} = props

	const [activePlan, setActivePlan] = useState('Hover a slice for details')
	const [activeFact, setActiveFact] = useState('Hover a slice for details')

	const COLORS = ['#9d8df1', '#ff85a1', '#ffd93d', '#6bcbff', '#8ce99a', '#ff9f43', '#adb5bd']

	const expectedData = categories
		.filter(cat => cat !== 'income')
		.map(cat => ({
			name: cat,
			value: Number(currentMonthBudgets[cat]) || 0
		}))
		.filter(item => item.value > 0)

	const actualData = categorySummary
		.filter(group => group.name !== 'income')
		.map(group => {
			const onlyExpenses = group.transactions
				.filter(t => t.type === 'expense')
				.reduce((acc, t) => acc + t.amount, 0)
			return {
				name: group.name,
				value: onlyExpenses
			}
		})
		.filter(item => item.value > 0)

	const renderDonut = (data, img, title, activeText, setActiveText) => (
		<div className="pie-block">
			<span className="pie-title-tag">{title}</span>
			<div className="pie-wrapper">
				<PieChart width={250} height={250}>
					<Pie
						data={data}
						innerRadius={70}
						outerRadius={120}
						paddingAngle={0}
						dataKey="value"
						stroke="none"
						cx="50%"
						cy="50%"
						onMouseEnter={(_, index) => setActiveText(`${data[index].name}: ${data[index].value} ₽`)}
						onMouseLeave={() => setActiveText('Hover a slice for details')}
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
				</PieChart>
				<img src={img} className="pie-center-img" alt="center" />
			</div>
			<p className="hover-details">{activeText}</p>
		</div>
	)

	return (
		<div className="expense-breakdown-section">
			<h3 className="main-chart-title">EXPENSE BREAKDOWN</h3>
			<br />
			<div className="single-inner-frame">
				<div className="pies-container">
					{renderDonut(expectedData, PLAN_IMG, 'EXPECTED', activePlan, setActivePlan)}
					{renderDonut(actualData, FACT_IMG, 'ACTUAL', activeFact, setActiveFact)}
				</div>
				<div className="pie-legend">
					<div className="legend-item header-item">
						<span>Category</span>
						<div className="legend-right-group">
							<span className="plan-pct">Plan %</span>
							<span className="fact-pct">Fact %</span>
						</div>
					</div>

					{categories.filter(cat => cat !== 'income').map((cat, index) => {
						const planVal = Number(currentMonthBudgets[cat]) || 0
						const planPercent = expectedMonthlyExpenses > 0
							? ((planVal / expectedMonthlyExpenses) * 100).toFixed(1)
							: 0

						const factGroup = categorySummary.find(g => g.name === cat)
						const factVal = Math.abs(factGroup?.totalSpent || 0)
						const totalExp = Math.abs(totalMonthlyExpenses)
						const factPercent = totalExp > 0
							? ((factVal / totalExp) * 100).toFixed(1)
							: 0

						return (
							<div key={cat} className="legend-item">
								<div className="legend-left">
									<div className="color-dot" style={{ background: COLORS[index % COLORS.length] }}></div>
									<span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
								</div>
								<div className="legend-right-group">
									<span className="plan-pct">{planPercent}%</span>
									<span className="fact-pct">{factPercent}%</span>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default ExpenseBreakdown