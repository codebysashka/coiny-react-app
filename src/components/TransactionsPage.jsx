import { useState } from "react"
import TransactionForm from "./TransactionForm"

const TransactionsPage = (props) => {
	const {
		items,
		setTransaction,
		onAdd,
	} = props

	const [searchTerm, setSearchTerm] = useState('')
	const [filterType, setFilterType] = useState('all')
	const [filterCategory, setFilterCategory] = useState('all')
	const [selectedIds, setSelectedIds] = useState([])
	const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })

	const filteredItems = items.filter((item) => {
		const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.merchant?.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesType = filterType === 'all' || item.type === filterType
		const matchesCategory = filterCategory === 'all' || item.category === filterCategory
		return matchesSearch && matchesType && matchesCategory
	})

	const toggleSelect = (id) => {
		if (selectedIds.includes(id)) {
			setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
		} else {
			setSelectedIds([...selectedIds, id])
		}
	}

	const handleSort = (key) => {
		let direction = 'desc'
		if (sortConfig.key === key) {
			direction = sortConfig.direction === 'desc' ? 'asc' : 'desc'
		}
		setSortConfig({ key, direction })
	}

	const sortedItems = [...filteredItems].sort((a, b) => {
		const valA = a[sortConfig.key]
		const valB = b[sortConfig.key]

		if (valA < valB) {
			return sortConfig.direction === 'asc' ? -1 : 1
		}
		if (valA > valB) {
			return sortConfig.direction === 'asc' ? 1 : -1
		}
		return 0;
	});

	return (
		<>
			<TransactionForm onAdd={onAdd} />
			<input type="text" name="search"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button onClick={() => setFilterType('all')}>All</button>
			<button onClick={() => setFilterType('income')}>Income</button>
			<button onClick={() => setFilterType('expense')}>Expense</button>
			<select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
				<option value="all">All Categories</option>
				<option value="food">Food</option>
				<option value="shopping">Shopping</option>
				<option value="transport">Transport</option>
				<option value="entertainment">Entertainment</option>
				<option value="salary">Salary</option>
				<option value="savings">Savings</option>
				<option value="other">Other</option>
			</select>
			<button
				disabled={selectedIds.length === 0}
				onClick={() => {
					const remaining = items.filter(item => !selectedIds.includes(item.id))
					setTransaction(remaining)
					setSelectedIds([])
				}}
			>
				Delete Selected ({selectedIds.length})
			</button>
			<table>
				<thead>
					<tr>
						<th>Select</th>
						<th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
							Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
						</th>
						<th onClick={() => handleSort('text')} style={{ cursor: 'pointer' }}>
							Description {sortConfig.key === 'text' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
						</th>
						<th onClick={() => handleSort('merchant')} style={{ cursor: 'pointer' }}>
							Merchant {sortConfig.key === 'merchant' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
						</th>
						<th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
							Category {sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
						</th>
						<th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
							Amount {sortConfig.key === 'amount' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedItems.map((item) => (
						<tr key={item.id} style={{ color: item.type === 'income' ? 'green' : 'red' }}>
							<td>
								<input
									type="checkbox"
									checked={selectedIds.includes(item.id)}
									onChange={() => toggleSelect(item.id)}
								/>
							</td>
							<td>{new Date(item.date).toLocaleDateString('ru-RU')}</td>
							<td>{item.text}</td>
							<td>{item.merchant}</td>
							<td>{item.category}</td>
							<td>{item.type === 'expense' ? '-' : '+'}{item.amount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default TransactionsPage