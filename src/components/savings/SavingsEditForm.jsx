import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"

const SavingsEditForm = (props) => {
	const {
		item,
		onUpdate,
		onDelete
	} = props

	const [title, setTitle] = useState(item.title)
	const [target, setTarget] = useState(item.target)
	const [current, setCurrent] = useState(item.current)

	const handleSubmit = (e) => {
		e.preventDefault()
		onUpdate({ ...item, title, target: Number(target), current: Number(current) })
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input label="Goal Name" value={title} onChange={(e) => setTitle(e.target.value)} />
			<Input label="Target Amount" type="number" value={target} onChange={(e) => setTarget(e.target.value)} />
			<Input label="Current Saved" type="number" value={current} onChange={(e) => setCurrent(e.target.value)} />

			<div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
				<Button type="submit">Save Changes</Button>
				<Button variant="delete" onClick={() => onDelete(item.id)}>Delete</Button>
			</div>
		</form>
	)
}

export default SavingsEditForm