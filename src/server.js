import {Server} from 'boardgame.io/server' 
import Backgammon from './BackgammonGame';

const server = Server({ games: [Backgammon] });
server.run(8000);
console.log("Server running...")