import Navigation from './layout/Navigation'
import TransactionsPage from '../pages/TransactionsPage'
import TransactionForm from './transactions/TransactionForm'
import TransactionList from './transactions/TransactionList'
import CurrencyPage from '../pages/CurrencyPage'
import MonthlyOverviewPage from '../pages/MonthlyOverviewPage'
import ModalWindow from './layout/ModalWindow'
import TransactionEditForm from './transactions/TransactionEditForm'
import SavingsEditForm from './savings/SavingsEditForm'
import { useFinance } from '../hooks/useFinance'
import Header from '../components/layout/Header'
import SavingsForm from './savings/SavingsForm'
import SavingsList from './savings/SavingsList'

const Dashboard = () => {
	const finance = useFinance()
	return (
		<>
			<Navigation
				setActiveTab={finance.setActiveTab}
				activeTab={finance.activeTab}
			/>
			{finance.activeTab === 'home' && (
				<div className="app-container">
					<Header balance={finance.totalBalance} />
					<div className='home-layout'>
						<div className='left-side'>
							<div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
								<TransactionForm onAdd={finance.addTransaction} />
							</div>

							<div className="glass-card">
								<h3 style={{ marginTop: 0 }}>Recent Transactions</h3>
								<TransactionList
									items={finance.transaction}
									onEdit={finance.setEditingTransaction}
								/>
							</div>
						</div>
						<div className='right-side'>
							<div className="glass-card" style={{ marginBottom: '20px', textAlign: 'center', background: '#ffe3e3' }}>
								<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZ3bm56bmZ3bm56&ep=v1_internal_gif_by_id&rid=giphy.gif"
									alt="cute gif"
									style={{ width: '100%', borderRadius: '20px' }} />
							</div>
							<div className="glass-card">
								<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
									<h3 style={{ margin: 0 }}>Savings</h3>
									<SavingsForm onAdd={finance.addSavings} />
								</div>
								<SavingsList
									items={finance.savings}
									onDeposit={finance.depositToSavings}
									onWithdrow={finance.withdrawFromSavings}
									onEdit={finance.setEditingSaving}
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			{finance.activeTab === 'transactions' && (
					<TransactionsPage
						items={finance.transaction}
						setTransaction={finance.setTransaction}
						onAdd={finance.addTransaction}
						onEdit={finance.setEditingTransaction}
					/>
			)}

			{finance.activeTab === 'overview' && (
				<main>
					<h2>Monthly Overview & Analytics</h2>
					<MonthlyOverviewPage
						transactions={finance.transaction}
						budgets={finance.budgets}
						onUpdate={finance.updateBudget}
					/>
				</main>
			)}

			{finance.activeTab === 'currency' && (
				<>
					<h2>Currency Settings</h2>
					<CurrencyPage
						rates={finance.rates}
						totalBalance={finance.totalBalance}
					/>
				</>
			)}

			<ModalWindow
				isOpen={!!finance.editingTransaction}
				onClose={() => finance.setEditingTransaction(null)}
				title="Edit Transaction"
			>
				{finance.editingTransaction && (
					<TransactionEditForm
						item={finance.editingTransaction}
						onUpdate={finance.updateTransaction}
						onDelete={finance.deleteTransaction}
					/>
				)}
			</ModalWindow>

			<ModalWindow
				isOpen={!!finance.editingSaving}
				onClose={() => finance.setEditingSaving(null)}
				title="Edit Savings Goal"
			>
				{finance.editingSaving && (
					<SavingsEditForm
						item={finance.editingSaving}
						onUpdate={finance.updateSaving}
						onDelete={finance.deleteSavings}
					/>
				)}
			</ModalWindow>
		</>
	)
}

export default Dashboard