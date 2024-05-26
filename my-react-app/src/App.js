import './App.css';
import Nav from './Nav.js';
import Stats from './Stats.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="nav">
          <>
            <Nav />
          </>
        </div>
        <div className="nav">
          <>
            <Stats />
          </>
        </div>
      
      </header>
    </div>
  );
}

export default App;
