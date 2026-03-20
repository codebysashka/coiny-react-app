import Button from "../ui/Button";

const ModalWindow = (props) => {
	const {
		isOpen,
		onClose,
		title,
		children
	} = props

	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="modal-header">
					<h3>{title}</h3>
					<Button onClick={onClose} variant='close'>X</Button>
				</div>
				<div className="modal-body">
					{children}
				</div>
			</div>
		</div>
	)
}

export default ModalWindow