import { CATEGORIES, SUBCATEGORIES } from "../constants"

const CategorySelector = (props) => {
	const {
		category,
		setCategory,
		subCategory,
		setSubCategory,
		isFilter,
		className
	} = props

	const handleCategoryChange = (e) => {
		const newCategory = e.target.value
		setCategory(newCategory)
		if (isFilter) {
			setSubCategory('all')
		} else {
			setSubCategory(SUBCATEGORIES[newCategory][0])
		}
	}

	return (
		<>
			<select
				className={className}
				value={category}
				onChange={handleCategoryChange}>
				{isFilter && <option value="all">All Categories</option>}
				{CATEGORIES.map(cat => (
					<option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
				))}
			</select>
			<select
				className={className}
				value={subCategory}
				onChange={(e) => setSubCategory(e.target.value)}
				disabled={isFilter && category === 'all'}
			>
				{isFilter && <option value="all">All Subcategories</option>}
				{category !== 'all' && SUBCATEGORIES[category].map(sub => (
					<option key={sub} value={sub}>{sub.charAt(0).toUpperCase() + sub.slice(1)}</option>
				))}
			</select>
		</>
	)
}

export default CategorySelector