import Dashboard from './components/Dashboard.js'
import './components/styles.css';
import axios from 'axios';
import RequireAuth from "./components/RequireAuth";

function App() {

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
