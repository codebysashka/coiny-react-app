import Input from "../ui/Input"

const BudgetModal = (props) => {
	const {
		categories,
		currentMonthBudgets,
		onUpdate,
		selectedDate
	} = props

	return (
		<div className="budget-form-container">
			{categories.map((category) => {
				const currentValue = currentMonthBudgets[category] || 0
				return (
					<div key={category}>
						<label>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</label>
						<Input
							className="input-simple"
							type='number'
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