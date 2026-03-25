import '../../styles/MonthlyInsights.css'
import React, { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import IMG from '../../assets/aafc75a8e72ec4b0e7c011646facf925.jpg'
import Amount from '../ui/Amount'

const MonthlyInsights = (props) => {
	const {
		monthlyData,
		totalMonthlyExpenses,
	} = props

	const [activeText, setActiveText] = useState('Hover a slice for details')
	const COLORS = [
		'#9d8df1', 
		'#ff85a1', 
		'#6bcbff', 
		'#ffd93d', 
		'#8ce99a', 
		'#ad1deb',
		'#ff9f43',
		'#3bc9db', 
		'#f783ac', 
		'#748ffc', 
		'#e599f7', 
		'#20c997',
		'#ffacba',
		'#dee2e6',
		'#94d82d', 
		'#ffa8a8'
	]

	const subCategoryTotals = monthlyData
		.filter(t => t.type === 'expense')
		.reduce((acc, t) => {
			const sub = t.subCategory || 'other'
			acc[sub] = (acc[sub] || 0) + t.amount
			return acc
		}, {})

	const allSubcategories = Object.keys(subCategoryTotals)
		.map(name => {
			const amount = subCategoryTotals[name]
			const totalExp = Math.abs(totalMonthlyExpenses)
			return {
				name: name,
				amount: amount,
				value: amount,
				percent: totalExp > 0 ? ((amount / totalExp) * 100).toFixed(1) : 0
			}
		})
		.sort((a, b) => b.value - a.value)

	const biggestExpense = monthlyData
		.filter(t => t.type === 'expense')
		.reduce((prev, current) => (prev.amount > current.amount) ? prev : current, { text: 'None', amount: 0 })

	return (
		<div className="monthly-insights-section">
			<h3 className="main-chart-title">MONTHLY INSIGHTS</h3>
			<br />
			<div className="single-inner-frame">
				<span className="pie-title-tag" style={{ display: 'block', textAlign: 'center', fontSize: '18px', color: '#4a4a6a', marginBottom: '20px' }}>ALL SUBCATEGORIES</span>
				<div className="insights-wrapper">
					<div className="insights-pie-container">
						<PieChart width={360} height={360}>
							<Pie
								data={allSubcategories}
								innerRadius={100}
								outerRadius={180}
								paddingAngle={0}
								dataKey="value"
								stroke="none"
								cx="50%"
								cy="50%"
								onMouseEnter={(_, index) => {
									if (allSubcategories[index]) {
										setActiveText(`${allSubcategories[index].name}: ${allSubcategories[index].value} ₽`)
									}
								}}
								onMouseLeave={() => setActiveText('Hover a slice for details')}
							>
								{allSubcategories.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
						</PieChart>
						<img src={IMG} className="insights-center-img" alt="center" />
					</div>

					<p className="insights-hover-text">{activeText}</p>
				</div>

				<div className="biggest-purchase-box">
					<div className="stat-row">
						Biggest purchase: <strong>{biggestExpense.text} (<Amount value={biggestExpense.amount} type="expense" showColor={false} />)</strong>
					</div>
				</div>

				<div className="pie-legend" style={{ borderTop: '1px solid #f1f3f5', marginTop: '10px' }}>
					{allSubcategories.map((item, index) => (
						<div key={item.name} className="legend-item" style={{ gap: '10px' }}>
							<div className="legend-left">
								<div className="color-dot" style={{ background: COLORS[index % COLORS.length] }}></div>
								<span style={{ fontSize: '14px' }}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
							</div>
							<span style={{ fontSize: '16px', color: '#8e94a5', fontWeight: '800' }}>{item.percent}%</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default MonthlyInsights