import { useState } from "react"
import TransactionForm from "../components/transactions/TransactionForm"
import CategorySelector from "../components/transactions/CategorySelector"
import TransactionsTable from "../components/transactions/TransactionsTable"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"


//Добавить общие траты расходы общую сумму доходов и расходов типо если выбран определенный период и 
// показаны несколько транзакций то только эти транзакции плюсуются разделяясь на доходы и расходы

const TransactionsPage = (props) => {
	const {
		items,
		setTransaction,
		onAdd,
	} = props

	const [searchTerm, setSearchTerm] = useState('')
	const [filterType, setFilterType] = useState('all')
	const [filterCategory, setFilterCategory] = useState('all')
	const [filterSubCategory, setFilterSubCategory] = useState('all')
	const [selectedIds, setSelectedIds] = useState([])
	const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
	const [dateFilter, setDateFilter] = useState('all')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')

	const now = new Date()
	const todayStr = now.toISOString().split('T')[0]

	const yesterday = new Date()
	yesterday.setDate(now.getDate() - 1)
	const yesterdayStr = yesterday.toISOString().split('T')[0]

	const startOfWeek = new Date()
	startOfWeek.setDate(now.getDate() - 7)

	const filteredItems = items.filter((item) => {
		const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.merchant?.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesType = filterType === 'all' || item.type === filterType
		const matchesCategory = filterCategory === 'all' || item.category === filterCategory
		const matchesSubCategory = filterSubCategory === 'all' || item.subCategory === filterSubCategory
		let matchesDate = true

		if (dateFilter === 'today') {
			matchesDate = item.date === todayStr
		} else if (dateFilter === 'yesterday') {
			matchesDate = item.date === yesterdayStr
		} else if (dateFilter === 'thisWeek') {
			matchesDate = item.date >= startOfWeek.toISOString().split('T')[0]
		} else if (dateFilter === 'thisMonth') {
			const itemDate = new Date(item.date)
			matchesDate = itemDate.getMonth() === now.getMonth() &&
				itemDate.getFullYear() === now.getFullYear()
		} else if (dateFilter === 'thisYear') {
			const itemDate = new Date(item.date)
			matchesDate = itemDate.getFullYear() === now.getFullYear()
		} else if (dateFilter === 'custom') {
			matchesDate = item.date >= startDate && item.date <= endDate
		}

		return matchesSearch && matchesType && matchesCategory && matchesSubCategory && matchesDate
	})

	const toggleSelect = (id) => {
		if (selectedIds.includes(id)) {
			setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
		} else {
			setSelectedIds([...selectedIds, id])
		}
	}

	const handleSort = (key) => {
		let direction = 'asc'
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc'
		}
		setSortConfig({ key, direction })
	}

	const sortedItems = [...filteredItems].sort((a, b) => {
		let valA = a[sortConfig.key]
		let valB = b[sortConfig.key]

		if (typeof valA === 'string') valA = valA.toLowerCase()
		if (typeof valB === 'string') valB = valB.toLowerCase()

		if (valA < valB) {
			return sortConfig.direction === 'asc' ? -1 : 1
		}
		if (valA > valB) {
			return sortConfig.direction === 'asc' ? 1 : -1
		}
		return 0
	})

	return (
		<>
			<TransactionForm onAdd={onAdd} />
			<Input
				type="text"
				name="search"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<Button onClick={() => setFilterType('all')}>All</Button>
			<Button onClick={() => setFilterType('income')}>Income</Button>
			<Button onClick={() => setFilterType('expense')}>Expense</Button>
			<select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
				<option value="all">All Time</option>
				<option value="today">Today</option>
				<option value="yesterday">Yesterday</option>
				<option value="thisWeek">Last 7 Days</option>
				<option value="thisMonth">This Month</option>
				<option value="thisYear">This Year</option>
				<option value="custom">Custom Range</option>
			</select>
			{dateFilter === 'custom' && (
				<div style={{ display: 'inline-block', marginLeft: '10px' }}>
					<input
						name="startDate"
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
					<span> to </span>
					<input
						name="endDate"
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</div>
			)}
			<CategorySelector
				category={filterCategory}
				setCategory={setFilterCategory}
				subCategory={filterSubCategory}
				setSubCategory={setFilterSubCategory}
				isFilter={true}
			/>
			<Button
				variant='delete'
				disabled={selectedIds.length === 0}
				onClick={() => {
					const remaining = items.filter(item => !selectedIds.includes(item.id))
					setTransaction(remaining)
					setSelectedIds([])
				}}
			>
				Delete Selected ({selectedIds.length})
			</Button>
			<TransactionsTable
				items={sortedItems}             
				selectedIds={selectedIds}      
				onToggleSelect={toggleSelect}   
				onSort={handleSort}             
				sortConfig={sortConfig}       
			/>
		</>
	)
}

export default TransactionsPage