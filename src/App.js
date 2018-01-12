// import './App.css';

import {Client} from 'boardgame.io/client';
import BackgammonBoard from './BackgammonBoard'
import BackgammonGame from './BackgammonGame'

const App = Client({ game: BackgammonGame, board: BackgammonBoard });

export default App;
