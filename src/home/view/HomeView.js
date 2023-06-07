import '../style/style.scss'
const HomeView = () => {
    
    return (
        <div className='home-view'>
            <ul>
                <li>
                    <a href="/tiktok">TitTok</a>
                </li>
                <li>
                    <a href="/todolist">Todolist</a>
                </li>
                <li>
                    <a href="/counter">Counter</a>
                </li>
            </ul>
        </div>
    )
}

export default HomeView;