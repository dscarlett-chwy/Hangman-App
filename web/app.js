var app = angular.module("HangmanApp", []);
app.controller("GameController", ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {

    //Gallows source images
    var images = [
        'images/0.jpg',
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg',
        'images/4.jpg',
        'images/5.jpg',
        'images/6.jpg',
        'images/7.jpg',
        'images/8.jpg',
        'images/9.jpg',
        'images/10.jpg'
    ]
    var selectedWord = '';
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen = [];
    $scope.guessesLeft = 10;
    $scope.gallowsSrc = 0;
    $scope.wins = 0;
    $scope.loses = 0;
    $scope.displayWord = '';
    $scope.imageSrc = '';
    $scope.input = {
        letter: ''
    }

    //this function resets are varialbles and runs the new game
    $scope.newGame = function() {
        $scope.incorrectLettersChosen = [];
        $scope.correctLettersChosen = [];
        $scope.guessesLeft = 10;
        $scope.gallowsSrc = 0;
        $scope.displayWord = '';

        $scope.imageSrc = images[$scope.gallowsSrc];
        //console.log($scope.imageSrc);
        document.getElementById("winLose").innerHTML = '';

        let data = {
            sessionID: localStorage.getItem('sessionID')
        };
        //When a new game starts we send to our database the game and session ID so that we whos playing
        //-in case multiple users are playing at the same time
        //-then we display a hidden random word to the UI
        $http.post('/hangman/word', data).then(function(response) {
            localStorage.setItem('gameID', response.data.gameID);
            localStorage.setItem('sessionID', response.data.sessionID);
            $scope.displayWord = response.data.maskedWord;
        });
        //keeps tracks of the users wins and loses and displays them at the beginning of each game
        $http.post('/hangman/records', data).then(function(response) {
            $scope.wins = response.data.gamesWon;
            $scope.loses = response.data.gamesLost;
        });



    }
    //user presses submit and sends there guess to be tested
    $scope.letterChosen = function() {
        //check to see if we have any invalid entrys
        if (($scope.input.letter === '') || ($scope.input.letter.length > 1)) {

            $scope.input.letter = "";
            document.getElementById("invalid").innerHTML = "INVALD ENTRY !";

        } //if input is valid run as normal
        else {
            document.getElementById("invalid").innerHTML = '';
            //now we send our guess and it check to see if it is correct or incorrect based on our random word
            let url = '/hangman/letter';

            let data = {
                sessionID: localStorage.getItem('sessionID'),
                gameID: localStorage.getItem('gameID'),
                letter: $scope.input.letter
            };
            //converts my JavaScript object to a JSON string, 
            let guessData = JSON.stringify(data)
            //denotes what the content is encoded in
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            //post our data to the server and get our response and diplay our data to the UI
            $http.post(url, guessData, config).then(function(result) {
                $scope.input.letter = "";
                //console.log(result.data);
                $scope.displayWord = result.data.maskedWord;
                $scope.guessesLeft = result.data.guessesRemaining;
                $scope.gallowsSrc = result.data.gallowsSrc;

                $scope.correctLettersChosen = result.data.correctGuesses;
                let incorrectGuesses = result.data.incorrectGuesses;
                let winner = result.data.gameWon;
                let loser = result.data.gameLost;
                //check whether the user won or not then display a message based off the result
                if (winner) {
                    document.getElementById("winLose").innerHTML = "You WON";
                    document.getElementById("newGame").style.display = "block";
                }

                if (loser) {
                    document.getElementById("winLose").innerHTML = "You LOST";
                    document.getElementById("newGame").style.display = "block";
                }
                //replaces our gallows image source when whenever we make an incorrect guess
                incorrectGuesses.forEach(function(element) {
                    if (!($scope.incorrectLettersChosen.includes(element))) {
                        $scope.incorrectLettersChosen.push(element.toLowerCase());
                        $scope.imageSrc = images[$scope.gallowsSrc];
                    }

                })

            }, function(error) {
                console.log(error);
            });


        }
    }

    $scope.newGame();
}])
