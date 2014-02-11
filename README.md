<h1>BubblePopper</h1>
Testing the waters with my first meteor app. BubblePopper is a Meteor app that utilizes matchmaking. When two players enter a game a grid of bubbles will appear. The user must pop (click) as many bubbles as possible before the other user. Each time a bubble is popped it will update to the Bubbles collection making Bubbles reactive.  When all of the buttons are pressed the user with the highest score will win.

<<<<<<< HEAD



<br>

<h2>Packages</h2>

standard-app-packages

insecure preserve-inputs
=======
Testing the waters with my first meteor app




Packages

standard-app-packages

insecure
preserve-inputs
>>>>>>> 7369cbc2b9d75d7d17bd7ba30d4e55bb34a14abf

accounts-base

profile-online

bootstrap

<<<<<<< HEAD
accounts-password accounts-ui-bootstrap-dropdown
<br>
<br>


<h2>Templates</h2>
<h3>home.helpers:</h3>
Initializes the game lobby. If there is no players prompts user to login.
<h3>home.events:</h3>
If there is one player asks user to wait or start a new game if multiple players have entered the lobby they have the option to join an existing game or start a new game depending if a user has started a game. Users that start a game can press finishGame at any time to cancel said game.

<h3>grid.helpers:</h3>
Returns the the grid of buttons (bubbles) if two users have started a game by checking first if there is users signed in and second by checking if they have started a game (if their current status is set to true).

<h3>grid.events</h3>
When a user clicks a button the program will call the method 'hideButton' this sets the visibility of the bubble to hidden using CSS. Using jQuery's .hide() method will create an undesirable user effect to the user interface, instead of hiding the button in place the buttons will all shift to different areas. Using CSS hides the button in place. grid.events also adds a point for each button pressed by the user to record their score.
=======
accounts-password
accounts-ui-bootstrap-dropdown
>>>>>>> 7369cbc2b9d75d7d17bd7ba30d4e55bb34a14abf
