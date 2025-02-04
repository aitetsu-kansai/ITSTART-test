import { LuLoaderCircle } from 'react-icons/lu'
import styles from './Loader.module.scss'

function Loader({ text }) {
	return (
		<>
			{text && <span>{text}</span>}
			<LuLoaderCircle className={styles.spinner} />
		</>
	)
}

export default Loader
