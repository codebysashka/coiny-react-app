import Amount from '../ui/Amount'
import '../../styles/TransactionItems.css'


const TransactionItem = ({ data, onEdit }) => {
	return (
		<div className="transaction-pill" onClick={() => onEdit(data)}>
			<div className="pill-left">
				<div className="pill-info">
					<span className="pill-title">{data.text}</span>
					<span className="pill-merchant">{data.merchant}</span>
				</div>
			</div>
			<div className="pill-right">
				<div className="pill-category-tag">{data.subCategory}</div>
				<Amount value={data.amount} type={data.type} />
			</div>
		</div>
	)
}
export default TransactionItem