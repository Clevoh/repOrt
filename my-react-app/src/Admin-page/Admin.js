import './Admin.css';
import Nav from './Nav.js';
import Noticeboard from './Noticeboard.js';
import Stats from './Stats.js';
import Registration from './Registration.js';
import Blur from './Blur.js';
import {useEffect, useState} from 'react';


function App() {
  const [toggle, setToggle] = useState(false);
  const [blurEffect, setBlurEffect] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  }
  const displayStyle = {
    display : toggle ? "block" : "none"
};
  useEffect(() => {
      setBlurEffect(toggle)
  }, [toggle]);

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
            <Noticeboard  ptoggle = {handleToggle} pdisplay = {displayStyle} />
          </>
        </div>
        <div className="performer">
          <Registration />
        </div>
        <>
          <Blur pblur = {blurEffect}/>
        </>
        
      </header>
    </div>
  );
}

export default App;
