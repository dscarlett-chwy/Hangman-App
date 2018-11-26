const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const uuidv4 = require('uuid/v4');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const ObjectId = require('mongodb').ObjectId;
const randomWord = require('random-word');

let port = 7000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("web"))
app.listen(port)

console.log(`app listening on ${port}`)

var url = 'mongodb://hangmanUser:derek99@ds155695.mlab.com:55695/hangman_game';

//connect to our database in mlad to store our game data through mongo
MongoClient.connect(url, {
    useNewUrlParser: true
}, function(err, client) {

    if (err) throw err;

    let db = client.db('hangman_game').collection('new_hangman_game');


    // routes
    app.post('/hangman/word', function(req, res) {
        let sessionID = req.body.sessionID;
        // check to see if there is a sessionID,
        // if not, create a new one
        if (sessionID === null) {
            sessionID = uuidv4();
        }
        // I'm using the random-word npm package,
        let word = randomWord();
        let maskedWord = word.replace(/./g, '*');
        let gallowsSrc = 0;

        let gameData = {
            sessionID,
            word,
            maskedWord,
            gallowsSrc,
            guessesRemaining: 10,
            correctGuesses: [],
            incorrectGuesses: [],
            gameWon: false,
            gameLost: false
        };
        // insert the game, and send the gameID and sessionID
        // back to the client
        db.insertOne(gameData).then(data => {
            // an _id field will automatically be created on the inserted
            // document, and this value will be returned to you on the prop
            // called 'insertedId'. YI want to send this value (along with sessionID)
            // back to the browser, so that it can store them, and send them
            // along on all of the "guess letter" requests, so that we know
            // who is playing (based on sessionID), and what game they
            // are playing (based on gameID)
            res.json({
                gameID: data.insertedId,
                sessionID,
                maskedWord
            });
        });
    });

    app.post('/hangman/letter', function(req, res) {
        let {
            sessionID,
            gameID,
            letter
        } = req.body;
        let _id = ObjectId(gameID); // coercing this to the format the database understands

        let findFilter = {
            sessionID,
            _id
        };
        // find the game doc based on the sessionID and gameID sent from the client
        db.findOne(findFilter, (err, gameData) => {
            let gameStatus = checkGuess(letter, gameData);
            let updateFilter = {
                $set: gameStatus
            };
            // update the game doc with the latest stats
            db.updateOne({
                _id
            }, updateFilter, (err, updateRes) => {
                // then send the current stats back to the client
                res.send(gameStatus);
            });
        });
    })

    app.post('/hangman/records', function(req, res) {
        let {
            sessionID
        } = req.body;

        let gamesWon = 0;
        let gamesLost = 0;

        db.find({
            sessionID
        }).toArray().then(userGames => {
            userGames.forEach(game => {
                if (game.gameWon) {
                    gamesWon++;
                }

                if (game.gameLost) {
                    gamesLost++;
                }
            });

            res.json({
                gamesWon,
                gamesLost
            });
        });
    });
});

//check to see if the user's guess is correct or not and then run a command based off the result
function checkGuess(letter, gameData) {
    let {
        word,
        guessesRemaining,
        correctGuesses,
        incorrectGuesses,
        gameWon,
        gameLost,
        maskedWord,
        gallowsSrc
    } = gameData;

    var correct = false;
    for (var i = 0; i < word.length; i++) {
        if (word[i].toLowerCase() == letter.toLowerCase()) {
            correct = true;
            maskedWord = maskedWord.substr(0, i) + letter + maskedWord.substr(i + 1);
        }
    }
    if (correct) {
        correctGuesses.push(letter.toLowerCase());
        if (maskedWord.indexOf('*') == -1) {
            gameWon = true;
        }
    } else {
        correct = false;
        guessesRemaining--;
        gallowsSrc++;
        incorrectGuesses.push(letter.toLowerCase())
        if (guessesRemaining < 1) {
            gameLost = true;
        }
    }
    //console.log(letter)
    return {
        correctGuesses,
        incorrectGuesses,
        guessesRemaining,
        gameWon,
        gameLost,
        maskedWord,
        gallowsSrc
    }
}
