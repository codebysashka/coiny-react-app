import Input from "../ui/Input"

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
				const currentValue = currentMonthBudgets[category] || 0
				return (
					<div key={category}>
						<label>
							{category.toUpperCase()}
						</label>
						<Input
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