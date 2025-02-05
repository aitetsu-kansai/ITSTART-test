import React, { useEffect, useState } from 'react'
import { deleteSeminar, getSeminars } from '../../utils/api'
import Seminar from '../Seminar/Seminar'
import Loader from '../UI-Components/Loader/Loader'
import style from './SeminarsList.module.scss'

function SeminarsList() {
	const [seminars, setSeminars] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const handleDeleteSeminar = async id => {
		try {
			await deleteSeminar(id)
			setSeminars(prev => prev.filter(seminar => seminar.id !== id))
		} catch (error) {
			alert(`Ошибка: ${error}`)
		}
	}

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal
		const fetchData = async () => {
			try {
				const data = await getSeminars(signal)
				setSeminars(data)
			} catch (err) {
				alert(err.message)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
		return () => controller.abort()
	}, [])

	return (
		<div>
			<h2>Список семинаров:</h2>
			<div className={style['seminars']}>
				{isLoading && <Loader />}
				{seminars.length === 0
					? !isLoading && <h3>Список пуст</h3>
					: seminars.map(seminar => {
							return (
								<Seminar
									key={seminar.id}
									title={seminar.title}
									id={seminar.id}
									description={seminar.description}
									date={seminar.date}
									time={seminar.time}
									photo={seminar.photo}
									onClick={() => handleDeleteSeminar(seminar.id)}
									setSeminars={setSeminars}
								/>
							)
					  })}
			</div>
		</div>
	)
}

export default SeminarsList
