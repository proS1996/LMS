import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {

  axios.get('http://localhost:8080/123',{
    withCredentials: true
  }).then((res)=>{
    console.log('res', res.data)
  }).catch((err)=>{
  console.log('err :', err);
    
  })


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
