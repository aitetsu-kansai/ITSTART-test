import { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import './Dropdown.scss'

function Dropdown({ children, title }) {
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
	const dropdownRef = useRef(null)
	const openDropdown = () => {
		setDropdownIsOpen(true)
	}
	const closeDropdown = e => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setDropdownIsOpen(false)
		}
	}

	useEffect(() => {
		dropdownIsOpen
			? document.addEventListener('click', closeDropdown)
			: document.removeEventListener('click', closeDropdown)

		return () => {
			document.removeEventListener('click', closeDropdown)
		}
	}, [dropdownIsOpen])

	return (
		<div className='dropdown__container' ref={dropdownRef}>
			<RxCross2 onClick={openDropdown} className='more-info__ico' />
			<div
				className={`dropdown__element ${
					dropdownIsOpen ? 'dropdown__element--open' : ''
				}`}
			>
				<p>{title}</p>

				{children}
			</div>
		</div>
	)
}

export default Dropdown
