Meteor.methods({
  newGame: function() {
    allocateGame(this.userId);
  },
  finishGame: function(_id) {
    Games.update({_id: _id}, {$set: {active: false, finished: true}});
  },
  hideButton: function(bubble){
    console.log("method works")
    Bubbles.update({_id: this._id}, {$set: {visibility: "hidden"}}) 
  }
  
})

Meteor._onLogin  = function (userId) {
  allocateGame(userId);
  console.log("user: " + userId + "just logged in.")
}

Meteor._onLogout = function (userId) {
  leaveGames(userId);
  console.log("user: " + userId + "just logged out.")
}


allocateGame = function(userId) {
  var gameWaiting = Games.findOne({players: {$size: 1}, current: true});

  if (!gameWaiting) {
    console.log("creating a new game, none available");
    //Added updated, required to start and finish games.
    Games.update({players: userId}, {$set: {current: false}}, {multi: true});
    var gameId = Games.insert({players: [userId], active: false, finished: false, current: true});
      _.times(64, function(n){
        Bubbles.insert({gameId: gameId});
  });

  } else {
    console.log("connecting with an existing waiting player");
    Games.update({_id: gameWaiting._id}, {$set: {active: true}, $push: {players: userId}});
  }
};

leaveGames = function(userId) {
  console.log("leaving all unfinished games");

  // Why are you removing the game?
  Games.remove({$and: [{players: userId, players: {$size: 1}}]});

  // Then trying to find the games
  var games = Games.find({$and: [{players: userId, active: true}]});

  // Then trying to update the games you removed on line 45
  games.forEach(function(game) {
    Games.update({_id: game._id}, {$set: {active: false, finished: true}});
  })
};

Meteor.publish('games', function(userId) {
  if(userId)
    return Games.find({players: this.userId});
});


Meteor.publish('Bubbles', function(){
  //Bubbles was bubbles
  return Bubbles.find();
});
