import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import CategorySelector from "./CategorySelector"

const TransactionEditForm = (props) => {
	const {
		item,
		onUpdate,
		onDelete
	} = props

	const [spendingName, setSpendingName] = useState(item.text)
	const [spendingAmount, setSpendingAmount] = useState(item.amount.toString())
	const [merchant, setMerchant] = useState(item.merchant || '')
	const [date, setDate] = useState(item.date)
	const [category, setCategory] = useState(item.category)
	const [subCategory, setSubCategory] = useState(item.subCategory)

	const handleSubmit = (e) => {
		e.preventDefault();
		const updatedTransaction = {
			...item,
			text: spendingName,
			amount: Number(spendingAmount),
			merchant: merchant,
			date: date,
			category: category,
			subCategory: subCategory
		}
		onUpdate(updatedTransaction)
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input label="Description" value={spendingName} onChange={(e) => setSpendingName(e.target.value)} />
			<Input label="Amount" type="number" value={spendingAmount} onChange={(e) => setSpendingAmount(e.target.value)} />
			<Input label="Merchant" value={merchant} onChange={(e) => setMerchant(e.target.value)} />
			<Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
			
			<CategorySelector
				category={category}
				setCategory={setCategory}
				subCategory={subCategory}
				setSubCategory={setSubCategory}
			/>

			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
				<Button type="submit">Save Changes</Button>
				<Button variant="delete" onClick={() => onDelete(item.id)}>Delete</Button>
			</div>
		</form>
	)
}

export default TransactionEditForm