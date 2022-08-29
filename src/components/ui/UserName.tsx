import { Link } from 'react-router-dom'
import BoldTypography from './BoldTypography'

const UserName = ({ name, userName }: { name: string; userName: string }) => {
	return (
		<Link className="link" to={`/profile/${userName}`}>
			<BoldTypography className="truncate-2" variant="subtitle2">
				{name}
			</BoldTypography>
		</Link>
	)
}
export default UserName
