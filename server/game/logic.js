// Number of slots
const gameSlots = 3;
// Minimum value
const minVal = 0;
// Maximum value
const maxVal = 5;

class GameLogic {

    // Return a random number between minVal and maxVal
    getRandomNumber(minVal, maxVal) {
        let random = Math.floor(Math.random() * (maxVal - minVal + 1));
        return random;
    }

    // Returns the outcome numbers based on the length of the gameslots
    getOutcomeNumbers(min, max) {
        var randomNumbers = [];
        for (var i = 0; i < gameSlots; i++) {
            randomNumbers.push(this.getRandomNumber(min, max));
        }
        console.log('Winnings', randomNumbers)
        return randomNumbers;
    }

    // Returns an index containing the random genereted outcome numbers 
    getGameResult() {
        return this.getOutcomeNumbers(minVal, maxVal, gameSlots);
    }
    
    // Return the 
    getScore(outcome) {
        let score = 0;
        let count = {};
        outcome.forEach(number => {
            count[number] = (count[number] || 0) + 1;
            score = Math.max(score, count[number]);
        });
        return ['No Win', 'Small Win', 'Big Win'][score - 1] || 'Unknown';;
    }

    // Returns a 50/50 chance of bonus, 1 for true and 0 for false
    getBonus() {
        return Boolean(this.getRandomNumber(0, 1));
    }

    // Returns an array of game result, bonus value of true or false and a text value representing the outcome
    startGame() {
        const gameResult = this.getGameResult();
        const bonus = this.getBonus();
        const outcome = this.getScore(gameResult); 
        return {
            gameResult,
            bonus,
            outcome,
        };
    }

}

module.exports = GameLogic;