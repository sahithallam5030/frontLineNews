import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from './components/Home'
import {Route,Routes} from 'react-router-dom'

function App() {
  return (
    <div>
      <Login/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
