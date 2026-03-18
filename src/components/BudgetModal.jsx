const BudgetModal = (props) => {
	const {
		categories,
		currentMonthBudgets,
		onUpdate,
		onClose,
		selectedDate,
		dateTitle,
	} = props

	return (
		<div className="modal-content">
			<h3>Adjust Budget for {dateTitle}</h3>
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
			<button onClick={onClose}>Save & Close</button>
		</div>
	)
}

export default BudgetModal