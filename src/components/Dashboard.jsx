import { useState } from 'react'
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
import Gif from '../assets/c1c67dbb72e66025162d85c2dc8d7501.gif'
import Input from './ui/Input'
import Button from './ui/Button'

const Dashboard = () => {
	const [isEditBalanceOpen, setIsEditBalanceOpen] = useState(false)

	const finance = useFinance()
	const currentMonth = new Date().toISOString().slice(0, 7)
	const homeTransactions = finance.transaction
		.filter(t => t.date.startsWith(currentMonth))
		.sort((a, b) => {
			if (b.date !== a.date) {
				return b.date.localeCompare(a.date)
			}
			return b.id - a.id
		})

	return (
		<>
			<Navigation
				setActiveTab={finance.setActiveTab}
				activeTab={finance.activeTab}
			/>
			{finance.activeTab === 'home' && (
				<div className="app-container">
					<Header balance={finance.totalBalance}
						onEditBalance={() => setIsEditBalanceOpen(true)} />
					<div className='home-layout'>
						<div className='left-side'>
							<div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
								<TransactionForm onAdd={finance.addTransaction} />
							</div>

							<div className="glass-card">
								<h3 className="title-homepage">Recent Transactions</h3>
								<TransactionList
									items={homeTransactions}
									onEdit={finance.setEditingTransaction}
								/>
							</div>
						</div>
						<div className='right-side'>
							<img src={Gif}
								alt="gif" />
							<div className="glass-card">
								<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
									<h3 className="title-homepage">Savings</h3>
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
				<MonthlyOverviewPage
					transactions={finance.transaction}
					budgets={finance.budgets}
					onUpdate={finance.updateBudget}
				/>
			)}

			{finance.activeTab === 'currency' && (
				<>
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
				title="Edit savings goal"
			>
				{finance.editingSaving && (
					<SavingsEditForm
						item={finance.editingSaving}
						onUpdate={finance.updateSaving}
						onDelete={finance.deleteSavings}
					/>
				)}
			</ModalWindow>

			<ModalWindow
				isOpen={isEditBalanceOpen}
				onClose={() => setIsEditBalanceOpen(false)}
				title="Edit starting balance"
			>
				<div className="modal-body">
					<label>Set your current physical balance to adjust the total.</label>
					<Input
						className="input-simple"
						type="number"
						value={finance.initialBalance}
						onChange={(e) => finance.setInitialBalance(Number(e.target.value))}
					/>
					<Button onClick={() => setIsEditBalanceOpen(false)} variant="primary">Confirm</Button>
				</div>
			</ModalWindow>
		</>
	)
}

export default Dashboard