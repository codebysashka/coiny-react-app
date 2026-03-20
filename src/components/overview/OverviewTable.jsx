import React from "react"
import Amount from "../ui/Amount"

const OverviewTable = (props) => {
	const {
		data
	} = props

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>CATEGORY</th>
						<th>EXPECTED</th>
						<th>ACTUAL</th>
						<th>REMAINING</th>
					</tr>
				</thead>
				<tbody>
					{data.map((group) => (
						<React.Fragment key={group.name}>
							<tr style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}>
								<td>{group.name.toUpperCase()}</td>
								<td><Amount value={group.budget} showColor={false} /></td>
								<td>
									<Amount
										value={group.totalSpent}
										type={group.totalSpent  < 0 ? 'expense' : undefined}
										showColor={false} />
								</td>
								<td>
									<Amount
										value={group.remaining}
										type={group.remaining < 0 ? 'expense' : undefined}
										showColor={false} />
								</td>
							</tr>
							{group.transactions.map((t) => (
								<tr key={t.id} style={{ fontSize: '0.9em', color: '#555' }}>
									<td>{t.text}</td>
									<td></td>
									<td>{t.type === 'expense' ? '-' : '+'}{t.amount}</td>
									<td></td>
								</tr>
							))}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</>
	)
}

export default OverviewTable