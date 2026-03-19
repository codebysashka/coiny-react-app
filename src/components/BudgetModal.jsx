const BudgetModal = (props) => {
	const { 
		categories, 
		currentMonthBudgets, 
		onUpdate, 
		selectedDate 
	} = props

	return (
		<div>
			{categories.map((category) => {
				const currentValue = currentMonthBudgets[category] || 0;
				return (
					<div key={category} style={{ marginBottom: '10px' }}>
						<label style={{ display: 'block' }}>{category.toUpperCase()}</label>
						<input
							type="number"
							value={currentValue}
							onChange={(e) => onUpdate(selectedDate, category, Number(e.target.value))}
						/>
					</div>
				)
			})}
		</div>
	)
}

export default BudgetModal