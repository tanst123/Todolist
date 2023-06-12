import { ContextStoreHooks } from '../store';
import { actions } from '../store';
import '../style/style.scss'


const NotFoundView = () => {
    const [state, dispatch] = ContextStoreHooks();

    const handleAddToInput = () => {
        dispatch(actions.addToDoInput(state.todoInput))
    }

   
    return (
        <div className='notfound-view'>
            <input 
                value={state.todoInput}
                onChange={e => dispatch(actions.setToDoInput(e.target.value))}
            />
            <button onClick={handleAddToInput}>Add</button>
            <ul>
                {state.todos.map((todo, index) => <li key={index}>{todo}</li>)}
            </ul>
        </div>
    )
}

export default NotFoundView;