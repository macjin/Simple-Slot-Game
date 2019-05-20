const GameLogic = require('./game/logic');
let express = require('express');
let fs = require('fs');
const path = require('path');
let app = express();
let currentPort = 1337;

function listening() {
    console.log('Listening...');
}

app.use(express.static('public'));
  
app.get('/SendJSONData', sendAll); 
function sendAll(request, response){   
    let game = new GameLogic().startGame(); 
    response.send(game);  
}

function test(){
    app.get('/SendJSONData', sendAll);
}
 
let server = app.listen(currentPort, listening); 
console.log(`Server running at port ${currentPort}`);