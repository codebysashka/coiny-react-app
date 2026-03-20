import Input from "../ui/Input"
import Amount from "../ui/Amount"

const TransactionsTable = (props) => {
	const {
		items,         
		selectedIds,    
		onToggleSelect, 
		onSort,         
		sortConfig      
	} = props

	return (
		<table>
			<thead>
				<tr>
					<th>Select</th>
					<th onClick={() => onSort('date')} style={{ cursor: 'pointer' }}>
						Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '↓' : '↑') : ''}
					</th>
					<th onClick={() => onSort('text')} style={{ cursor: 'pointer' }}>
						Description {sortConfig.key === 'text' ? (sortConfig.direction === 'asc' ? '↓' : '↑') : ''}
					</th>
					<th onClick={() => onSort('merchant')} style={{ cursor: 'pointer' }}>
						Merchant {sortConfig.key === 'merchant' ? (sortConfig.direction === 'asc' ? '↓' : '↑') : ''}
					</th>
					<th onClick={() => onSort('category')} style={{ cursor: 'pointer' }}>
						Category {sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? '↓' : '↑') : ''}
					</th>
					<th onClick={() => onSort('subCategory')} style={{ cursor: 'pointer' }}>
						SubCategory {sortConfig.key === 'subCategory' ? (sortConfig.direction === 'asc' ? '↓' : '↑') : ''}
					</th>
					<th onClick={() => onSort('amount')} style={{ cursor: 'pointer' }}>
						Amount {sortConfig.key === 'amount' ? (sortConfig.direction === 'asc' ? '↓' : '↑') : ''}
					</th>
				</tr>
			</thead>
			<tbody>
				{items.map((item) => (
					<tr key={item.id} style={{ color: item.type === 'income' ? 'green' : 'red' }}>
						<td>
							<Input
								type="checkbox"
								checked={selectedIds.includes(item.id)}
								onChange={() => onToggleSelect(item.id)}
							/>
						</td>
						<td>{new Date(item.date).toLocaleDateString('ru-RU')}</td>
						<td>{item.text}</td>
						<td>{item.merchant}</td>
						<td>{item.category}</td>
						<td>{item.subCategory}</td>
						<td><Amount value={item.amount} type={item.type} /></td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default TransactionsTable