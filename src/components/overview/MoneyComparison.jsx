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

	return (
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
	)
}

export default MoneyComparison