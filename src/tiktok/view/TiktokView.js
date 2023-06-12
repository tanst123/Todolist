import Container from '../component/Container'
import {ThemeContext} from '../component/ThemeContext';
import '../style/style.scss'
import { useContext } from 'react';

const TiktokView = () => {
    const context = useContext(ThemeContext)
    console.log(context)
    return (
        
        <>
            <Container/>
            <button onClick={context.handleToggle}>Toggle</button>
        </>
    )
}

export default TiktokView;