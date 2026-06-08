import './App.css'
import { Pythagor } from './components/Pythagor'
import { Energy } from './components/Energy'
import { Cilinder } from './components/Cilinder'
import { Square } from './components/Square'
import { SquareSum } from './components/SquareSum'
import { Water } from './components/Water'
import { Log } from './components/Log'

function App() {

  return (
    <ol>
      <Pythagor/> 
      <Energy />
      <Cilinder />
      <Square />
      <SquareSum />
      <Water />
      <Log /> 
    </ol>
  );
}

export default App;
