import TransactionItem from "./TransactionItem"
import '../../styles/TransactionList.css'

const TransactionList = (props) => {
	const {
		items,
		onDelete,
		onEdit
	} = props

	const grouped = items.reduce((acc, item) => {
		const date = new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
		if (!acc[date]) acc[date] = [];
		acc[date].push(item);
		return acc;
	}, {});

	return (
		<div className="transactions-list-container">
			{Object.keys(grouped).map(date => (
				<div key={date} className="date-group">
					<div className="date-divider">{date}</div> 
					{grouped[date].map(item => (
						<TransactionItem key={item.id} data={item} onEdit={onEdit} />
					))}
				</div>
			))}
		</div>
		// <ul>
		// 	{items.map((item) => {
		// 		return (
		// 			<TransactionItem
		// 				key={item.id}
		// 				data={item}
		// 				onDelete={onDelete}
		// 				onEdit={onEdit}
		// 			/>
		// 		)
		// 	})}
		// </ul>
	)
}

export default TransactionList