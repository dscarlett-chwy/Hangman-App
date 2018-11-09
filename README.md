# Hangman-App
Basic fullstack hangman application using AngularJS, NodeJS, Express and MongoDB

# Installation
1. Clone repo
2. run npm install

# Usage
run npm start

# Synopsis 
Write a simple Hangman game as a Web Application .

# Rules
When the game is started, the player is represented with an empty field for each letter in the word.
When the player guesses a letter correctly, each field that represents that letter is filled with the letter.
When the player guesses a letter incorrectly, a piece of a gallows with a hanging man is drawn.
After 10 incorrect guesses, the game is over and the player lost.
Thus, there should be 10 different states of the gallows to be drawn.
If all fields are filled with their letter before 10 incorrect guesses, the player has won the game.

# Technical-Requirements
Server/client based with the client being the browser
Client implemented with AngularJS
Server implemented with NodeJS
Business logic executed on the server (so nobody can cheat)
Allow for keeping simple statistics (games won/lost)
Game is self-contained
Game must scale to millions of users

 # Game 
![screenshot from 2018-11-08 18-11-50](https://user-images.githubusercontent.com/36242561/48233075-e2ca5f80-e381-11e8-96cd-bfa0d46b87b1.png)

# Hows It Made
Tech used: HTML, CSS, JavaScript, Angular, Node, MongoDB, Express

This app is made by using an angular component for the front end, nodejs as my server and MongoDB for my database.
The user opens up to the game and a new mystry word is displayed on the UI. As soon as the new game begins we send a game and session ID to our databasse so we can track the correct data base the specific game.
I am doing this because I want be able to have multiple users play the game at the same time with out the users games over lapping each other.
The number of incorrect guesses is also displayed as soon as a new game begins. Each new game the user starts wiith 10 guesses that they are allowed to get wronge.
Once the user runs out of incorrect guesses before guessing the word then a message is displaye to the DOM saying either "you won" or "you lost".
Both the user's correct and incorrected guesses are stashed in our data as soon as the user presses submit. Once submit is clicked we send out guess to we add that guess to our database.
Once its stored then in our server we take our guess and see if that guess if correct or not. After determining this I send an object back to our app.js holing all our game date.
Once I have this data back I then use it to populate my angular component with whatever data I need, for example wins and losses or our correct/incorrect guees. 
Then when the game is over the user is able to decided if they want to play again and if they do then a new game restarts but because of our game/session ID our wins/loses total are still visuable and been counted for.

# Lessons Learned
I never used angular so this project was quite an experience. I did alot of reseach and was able to learn alot about how angular works and how it functions.
My stronger framework is React so being able to see the similarites and differences allowed me to understand quicker was going on and allowed my to set up my html/css/javascript.
After that I connected my frontend to nodejs so that I could host it on my own local server and then add mongodb to help me store all my data. 
A challenge in the project apply all the business logic on the server/data side so that the user couldnt cheat. Its not perfect for example I know that having my mongodb url 
a security risk. Also the way I handled making it scale to multiple user without using a classic login was kind of a quick and dirty version of a session/user based game. 
For example, it is not secure, and there is no real "login" functionality. If I knew your sessionID, I could save that to my browser's localStorage and I could play on your games.
I also gain more experiene using http.post requests and how you can make api calls to your server within you app.

# If I have time to go back
If I have time to go back and work on this more I would pretty up the UI experience with some more css styling. 
I would also like to add admin/login functionality to help with preventing users to cheat. That way users can make profiles and then I can store thier win/loss totals in thier own forms. I also want to fix my gitignore so that I can exlude my mongodb url and my node-moduals folder for when I reuplaod to github. I would also like to hos my app on AWS when I get some more time after working on the above.

