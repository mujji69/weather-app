import Weather from './components/Weather';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Day from './components/Day';

import backgroundVideo from "./assets/Rain - 78.mp4";
import './App.css';

function App() {
  return (
    <div className="app">
      <video autoPlay loop muted id="video">
        <source src={backgroundVideo} type="video/mp4"  />
      </video>
      {/* <header className="App-header">
        
      </header> */}
      <Router>
      <div className="container">
        <Route exact path={"/"} component={Weather}/>
        {/* <Weather /> */}
        </div>
          <div className="mb-5">
          <Route path={"/:city/:day"} component={Day} />

          </div>
        </Router>
    </div>
  );
}

export default App;
