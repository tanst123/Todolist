
import { Link} from 'react-router-dom';
import '../style/style.scss'
const arrLinks = [
    {
        to:"/tiktok",
        label: "TikTok"
    },
    {
        to:"/todolist",
        label: "Todolist"
    },
    {
        to:"/counter",
        label: "Counter"
    }
]

const HomeView = () => {
    return (
        <div className='home-view'>
            <ul>
                {arrLinks.map((arrLink, index) => (
                    <li key={index}>
                         <Link to={arrLink.to}>{arrLink.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HomeView;