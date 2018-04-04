import './App.css';

import {Client} from 'boardgame.io/react';
import BackgammonBoard from './BackgammonBoard';
import BackgammonGame from './BackgammonGame';

const App = Client({ 
  game: BackgammonGame, 
  board: BackgammonBoard, 
  debug: false,
  multiplayer: false,
  // multiplayer: { server: 'localhost:8000' },
});

export default App;
