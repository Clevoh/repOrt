import './App.css';
import Nav from './Nav.js';
import Noticeboard from './Noticeboard.js';
import Stats from './Stats.js';
import TopPerformer from './Top-performer.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="nav">
          <>
            <Nav />
          </>
        </div>
        <div className="stats">
          <>
            <Stats />
          </>
        </div>
        <div className="notice">
          <>
            <Noticeboard />
          </>
        </div>
        <div className="performer">
          <TopPerformer />
        </div>
        
      </header>
    </div>
  );
}

export default App;
