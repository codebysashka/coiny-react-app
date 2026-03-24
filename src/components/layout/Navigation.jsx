import '../../styles/Navigation.css'

const Navigation = (props) => {
	const {
		activeTab,
		setActiveTab,
	} = props

	return (
		<nav className="nav-bar"> 
			<button
				className={`btn-nav ${activeTab === 'home' ? 'active' : ''}`}
				onClick={() => setActiveTab('home')}
			>
				Home
			</button>
			<button
				className={`btn-nav ${activeTab === 'transactions' ? 'active' : ''}`}
				onClick={() => setActiveTab('transactions')}
			>
				All Transactions
			</button>
			<button
				className={`btn-nav ${activeTab === 'overview' ? 'active' : ''}`}
				onClick={() => setActiveTab('overview')}
			>
				Monthly Overview
			</button>
			<button
				className={`btn-nav ${activeTab === 'currency' ? 'active' : ''}`}
				onClick={() => setActiveTab('currency')}
			>
				Exchange Rate
			</button>
		</nav>
	)
}

export default Navigation