import { useState } from 'react'
import { RiEditFill } from 'react-icons/ri'
import { updateSeminar } from '../../utils/api.js'
import Dropdown from '../UI-Components/Drowdown/Dropdown.jsx'
import Form from '../UI-Components/Form/Form.jsx'
import '../UI-Components/Form/Form.scss'
import Loader from '../UI-Components/Loader/Loader.jsx'
import Modal from '../UI-Components/Modal/Modal.jsx'
import style from './Seminar.module.scss'

function Seminar({
	title,
	id,
	date,
	time,
	photo,
	description,
	onClick,
	setSeminars,
}) {
	const [customTitle, setCustomTitle] = useState(title)
	const [customPhoto, setCustomPhoto] = useState(photo)
	const [customDescription, setCustomDescription] = useState(description)

	const [imgIsLoading, setImgIsLoading] = useState(true)

	const [modalIsActive, setModalIsActive] = useState(false)

	const handleUpdateSeminar = async (e, id) => {
		e.preventDefault()
		try {
			const updatedData = {
				title: customTitle,
				description: customDescription,
				photo: customPhoto,
			}

			const updatedSeminar = await updateSeminar(id, updatedData)
			console.log(updatedSeminar)

			setSeminars(prev =>
				prev.map(seminar => (seminar.id === id ? updatedSeminar : seminar))
			)
		} catch (error) {
			alert(`Ошибка: ${error.message}`)
		}
		setModalIsActive(false)
	}

	return (
		<div className={style['seminar']}>
			<div className={style['seminar__date-info']}>
				<p>{`${date} в ${time}`}</p>
				<div className={style['seminar__tools']}>
					<RiEditFill onClick={() => setModalIsActive(true)} />
					<Dropdown title='Подтвердите удаление'>
						<button onClick={() => onClick(id)}>Удалить</button>
					</Dropdown>
				</div>
			</div>
			<h4>{`${id}. ${title}`}</h4>
			{imgIsLoading && <Loader />}
			<img
				src={photo}
				alt=''
				onLoad={() => setImgIsLoading(false)}
				onError={e => {
					setImgIsLoading(false)
					e.target.src =
						'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'
				}}
			/>

			<p>{description}</p>
			<Modal active={modalIsActive} setActive={setModalIsActive}>
				<div className={style['seminar__editor']}>
					<h5>{`Изменение семинара №${id}`}</h5>
					<Form onSubmit={e => handleUpdateSeminar(e, id)}>
						<input
							value={customTitle}
							onChange={e => setCustomTitle(e.target.value)}
							maxLength={40}
						/>
						<input
							value={customDescription}
							onChange={e => setCustomDescription(e.target.value)}
							maxLength={100}
						/>
						<input
							value={customPhoto}
							onChange={e => setCustomPhoto(e.target.value)}
						/>
					</Form>
				</div>
			</Modal>
		</div>
	)
}

export default Seminar
