import logo from './logo.svg';
import './App.css';
import Keyboard from './components/keyboard';

function App() {

    const logEvent = (event)=>{
        console.log(event);
    }

    return (
        <div className="App">
            <Keyboard onKeyDown={logEvent}/>
        </div>
    );
}

export default App;