const testerer = (age) => {
    return `Age: ${age}`
}

// Returns document.querySelector with given parameter
const getQS = (selector) => {
    return document.querySelector(`${selector}`);
}

let symbolsJSON = '../json/symbols.json';

// Resets the #gameArea div element
const initial = getQS('#gameArea').innerHTML;

// Function that returns the response JSON
const getJSONData = (file, options = {  method: 'get' }) => new Promise((resolve, reject) => {
    // Creates a variable with a XMLHttpRequest method
    let request = new XMLHttpRequest();
    request.onload = resolve;
    request.onerror = reject;
    // Add support for JSON files
    request.overrideMimeType("application/json");
    request.open(options.method, file, true);
    request.onreadystatechange = () => {
        request.readyState === 4 && request.status === "200" ? resolve(request.responseText) : '';
    };
    request.send(null);
});

// Button to reset game area and start a new game
const gameButtonClicked = () => {
    getQS('#gameArea').innerHTML = initial;
    getOutcomesData()
}

// Get outcome from GameLogic class retrieved from server and display them for the user 
const getOutcomesData = () => {
    //Retrieves data from server.js app.get('/SendJSONData')
    let bonusRound = false;
    getJSONData('/SendJSONData')
        .then(d => { 
            
            getQS('.playBtn').setAttribute('data-loading', 'false');   
            // Store the result as parsed JSON to a variable called data
            let data = JSON.parse(d.currentTarget.response); 
            // Display the outcome text  
            getQS('#outcomeText').innerHTML = `${data.outcome}`;
            
            // Check if bonus is true/false, if true display text to user, otherwise print nothing
            data.bonus ? 
            (bonusRound = true, getQS('#bonusText').innerHTML = 'Bonus INCOMING!') : 
            (bonusRound = false, getQS('#bonusText').innerHTML = '') 
            
            // Display the winning symbols as images
            let winningSymbols = Object.values(data).map((symbol) => symbol);
            winningSymbols[0].forEach(outcomeNumber => {
                gameArea.innerHTML += `<img id="symbolImages" src="../images/Symbol_${outcomeNumber}.png" />`;
            })
            
            // Reset button after 3 seconds
            resetPlayButton('data-loading')
        })
        .catch(err => console.error('Failed to load game: ', err)) // Catch any errors
        .finally(()=> { 
            // Disable button for 3 seconds and then trigger a bonus round if the bonus is true
            setTimeout(() => {
                if (bonusRound) { 
                    getQS('.playBtn').setAttribute('data-loading', 'false');
                    getQS('.playBtn').click()
                }
            }, 3000);
            // Reset button after 3 seconds
            resetPlayButton('data-loading')
        });
}

const resetPlayButton = (state) => {
    setTimeout(() => {
        getQS('.playBtn').removeAttribute(state);
    }, 3000);
}
 