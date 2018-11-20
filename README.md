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

The user opens up to the game and a new mystery word is displayed on the UI. As soon as the new game begins the user opens up to a new game and a new mystery word is displayed on the UI. As soon as the new game begins, we send a game and session ID to our database, so we can track the correct database specific to our user. I am doing this because I want be able to have multiple users play the game at the same time without the user’s games overlapping each other. The number of incorrect guesses is also displayed as soon as a new game begins. Each new game the user starts with 10 guesses that they are allowed to get wrong. Once the user runs out of incorrect guesses, before guessing the word, a message is displayed to the DOM saying either "you won" or "you lost". Both the user's correct and incorrected guesses are stashed in our database as soon as the user presses submit. Once submit is clicked we send our guess to our database. Once its stored, then in our server we take our guess and see if that guess if correct or not. After determining this I send an object back to our app.js holing all our game data. Once I have this data back I then use it to populate my angular component with whatever data I need, for example wins and losses or our correct/incorrect guesses. Then when the game is over allow the user to be able to decide if they want to play again, and if they do, then a new game restarts, but because of our game/session ID our wins/loses total are still visible and been acounted form the database specific to the game. I am doing this because I want be able to have multiple users play the game at the same time without the user’s games overlapping each other. 

# Lessons Learned

This was my first time using angular.js.  I learned a lot about Angular’s functionality and components.  Fortunately, I am comfortable with React, so the component based theme was familiar to me, and that prior knowledge helped me to set up my javascript/html/css.

1.    I learned that Angular is component based

2.    I learned about localStorage and how to use it

3.    I learned about making API calls using node and Angular

4.    I learned interacting with angular and node to store docs in MongoDB  

5.    I learned about using substrings

6.    I learned about using set in MongoDB

# Challenges

 A challenge in the project was apply all the business logic on the server side, so that the user can’t cheat. To accomplish this in a short amount of time with limited knowledge instead of using a login functionality for security and better storage, I handled the scaling using a sessionID and gameID from my localStorage in the browser. I did this so multiple users can play simultaneously.

I knew your sessionID, I could save that to my browser's localStorage and I could play on your games. I was happy to gain more experience using localStorage and making API http requests.

# If I had unlimited time...

If I had unlimited or extra time to improve my program:

·         I would enhance the user experience with some better css styling.

·         I would also like to add admin/login functionality to better prevent users from cheating, store wins and losses, and scale to many users. I prefer that users can make profiles, and then my program would store their win/loss totals in their own session.

·         I would also complete bonus consideration to deploy my web application to Amazon Web Storage using EC2.

·         I would also create a .config file to secure the MongoDB url because they expose the credentials. Maybe I would use the. env package found here: https://www.npmjs.com/package/dotenv
.         The way that I are tallying up wins/losses is not ideal, and it is kind of inefficient. Ideally, you would have a separate "users" or "stats" collection in your database, and when a game was won/lost, the server would update the proper record to increment the wins or losses property. That way, to get the records, you would only need to do a request to `/hangman/records` with the `sessionID`, and you could find the users stats document from the database that contains the `wins` and `losses` property. This way, you would avoid having to loop through all of the records to manually tally up wins and losses like I am doing currently.

.         I didn't include much error handing in the server. I am basically assuming that most operations are going to succeed. For example, if there was an error finding the game in the database, I don't really handle that error and send back the user any useful error information. So including better error handling will allow me or someone to else to more efficiently debug the issue and find a soloution faster.
