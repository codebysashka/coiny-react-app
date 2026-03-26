import Amount from "../ui/Amount"
import '../../styles/Header.css'

const Header = (props) => {
	const {
		balance,
		onEditBalance
	} = props

	return (
		<header className="main-header">
			<div className="logo-wrapper">
				<h1 className="app-logo">Coiny</h1>
				<span className="logo-star">✦</span>
			</div>
			<div className="header-balance"
				onClick={onEditBalance}
				style={{ cursor: 'pointer' }}>
				<span className="balance-label">Total Balance<br />(Click to edit):</span>
				<div className="balance-amount-wrapper">
					<Amount value={balance} showColor={false} />
				</div>
			</div>
		</header>
	)
}

export default Header