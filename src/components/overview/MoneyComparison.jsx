import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts'
import '../../styles/MoneyComparison.css'

const MoneyComparison = (props) => {
	const {
		totalMonthlyIncome,
		totalMonthlyExpenses,
		expectedMonthlyExpenses,
		expectedMonthlyIncome
	} = props

	const expectedRatio = expectedMonthlyIncome > 0
		? (expectedMonthlyExpenses / expectedMonthlyIncome) * 100
		: 0

	const actualRatio = totalMonthlyIncome > 0
		? (Math.abs(totalMonthlyExpenses) / totalMonthlyIncome) * 100
		: 0

	const data = [
		{
			name: 'EXPECTED',
			income: expectedMonthlyIncome,
			expense: expectedMonthlyExpenses
		},
		{
			name: 'ACTUAL',
			income: totalMonthlyIncome,
			expense: Math.abs(totalMonthlyExpenses)
		}
	]

	const BAR_SIZE = 80
	const BAR_GAP = 20

	const formatValue = (val) => {
		if (val >= 1000000) return (val / 1000000).toFixed(1) + ' M'
		if (val >= 1000) return (val / 1000).toFixed(1) + ' K'
		return val
	}

	return (
		<div className="money-comparison-section">
			<h3 className="main-chart-title">MONEY IN / MONEY OUT</h3>
			<p className="main-chart-subtitle">Actual is month-to-date; expected is full month.</p>

			<div className="single-inner-frame">
				<div className="top-labels">
					<span className="group-header">EXPECTED</span>
					<span className="group-header">ACTUAL</span>
				</div>

				<ResponsiveContainer width="100%" height={300}>
					<BarChart
						data={data}
						margin={{ top: 40, bottom: 0, left: 0, right: 0 }}
						barGap={BAR_GAP}
					>
						<XAxis dataKey="name" hide />
						<YAxis hide width={0} domain={[0, 'auto']} />

						<Bar dataKey="income" fill="#8ce99a" radius={[12, 12, 12, 12]} barSize={BAR_SIZE}>
							<LabelList 
								position="top" 
								fill="#4a4a6a" 
								fontSize={13} 
								fontWeight={900} 
								offset={15}
								formatter={(v) => `${formatValue(v)} ₽`}
							/>
						</Bar>

						<Bar dataKey="expense" fill="#ffa8a8" radius={[12, 12, 12, 12]} barSize={BAR_SIZE}>
							<LabelList 
								position="top" 
								fill="#4a4a6a" 
								fontSize={13} 
								fontWeight={900} 
								offset={15}
								formatter={(v) => `${formatValue(v)} ₽`}
							/>
						</Bar>
					</BarChart>
				</ResponsiveContainer>

				<div className="bottom-labels-row">
					<div className="label-group">
						<span className="in-text">MONEY IN</span>
						<span className="out-text">MONEY OUT</span>
					</div>
					<div className="label-group">
						<span className="in-text">MONEY IN</span>
						<span className="out-text">MONEY OUT</span>
					</div>
				</div>

				<div className="ratios-footer">
					<span>Out / In: {expectedRatio.toFixed(1)}%</span>
					<span>Out / In: {actualRatio.toFixed(1)}%</span>
				</div>
			</div>
		</div>
	)
}

export default MoneyComparison