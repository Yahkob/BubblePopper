<h1>BubblePopper</h1>
BubblePopper is a Meteor app that utilizes matchmaking. When two players enter a game a grid of bubbles will appear. The user must pop (click) as many bubbles as possible before the other user. Each time a bubble is popped it will update to the Bubbles collection making Bubbles reactive.  When all of the buttons are pressed the user with the highest score will win.

<h2> Operations analysis:</h2>
<ul>
<li>The user creates an account then logs in with accounts-base package</li>
<li>If there is only one user that user is alerted no one else is in the game lobby and to wait for another user to login</li>
<li>If no game has been started the user is alerted "Waiting for a new player to login. Find a new game"</li>
<li>When the user chooses to find a new game they are then put in a new game, if a new user logins and clicks find a new game the two are put into a game</li>
<li>When the game is active the two players must pop(click) as many bubbles(buttons) as possible to achieve victory.</li>
<li>player1Score,player2Score and totalCount. player1Score and player2Score records the specific users score during the game and lastly totalCount records how many bubbles have ben popped</li>
<li>When totalCount equals 64 BubblePopper calls the Meteor.method <strong>'finishGame'</strong> the users are then sent back to the lobby to find a new game against other competitors or sign out.
<li> Everytime a user pops a bubble two things happen the user that popped the bubble receives one point plus their score and the Meteor.method <strong>hideButton</strong> is called. </li>
<li><strong>hideButton</strong> then uses CSS to set the button's visibility as hidden instead of using jQuerys .hide() method which causes an undesirable effect on the UI.</li> 
<li>If two users are logged in and in a game they have the option to finish the game whenever they like. </li>
<li>If a user chooses to finish the game both users are dislodged from the game. The user who pressed Finish Game then forfeits and therefore loses the game</li>
<li>If there is no activity from either player or they exceed a time limit the game will automatically call <strong>finishGame</strong>
<br>
</ul>

<h2>Packages:</h2>
<ul>

insecure<br>
preserve-inputs<br>
accounts-base<br>
profile-online<br>
bootstrap<br>
accounts-password <br>
accounts-ui-bootstrap-dropdown<br>
bootbox
</ul>
<br>


<h2>Templates:</h2><ul>
<li><h3>home.helpers:</h3></li>

<li><h5>game</h5><li>
Displays the matchmaking screen

<li><h5>player1Score and player2Score</h5><li>
Displays player specific scores

<li><h5>endGame</h5><li>
When all buttons are pressed the 'finishGame' method is called and the user is alerted who won.

<li><h3>home.events:</h3></li>
If there is one player asks user to wait or start a new game if multiple players have entered the lobby they have the option to join an existing game or start a new game depending if a user has started a game. Users that start a game can press finishGame at any time to cancel said game.

<li><h3>home.events</h3><li>
Starts new games, joins existing games and finishes games.

<li><h3>grid.helpers:</h3></li>
Returns the the grid of buttons (bubbles) if two users have started a game by checking first if there is users signed in and second by checking if they have started a game (if their current status is set to true).

<li><h3>grid.events</h3></li>
When a user clicks a button the program will call the method 'hideButton' this sets the visibility of the bubble to hidden using CSS. Using jQuery's .hide() method will create an undesirable user effect to the user interface, instead of hiding the button in place the buttons will all shift to different areas. Using CSS hides the button in place. grid.events also adds a point for each button pressed by the user to record their score.


</ul>
<br>
<h2>Future Developments</h2><ul>
<li>Integrating a leaderboard system</li>
<li>Built in chat to let competitors discuss and chat about games</li>
<li>Statistics page (i.e total bubbles popped, leaderboard ranking, average bubbles popped per second, total wins, total losses)</li>
<li>Level up system (users start at Level 1 and gain experience points each game depending on their current level)
</ul>

<h2>Todo/Bugs</h2>
<ul><h4>Same user play</h4>When a user logins in they can then start a game with their self by clicking new game twice. This is an effect of the multiplayer system only requiring one player to be logged in. Possible solution could be to require the allocateGame function to verify the same user isn't trying to start a new game with themself.

