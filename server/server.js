Meteor.methods({
  newGame: function() {
    allocateGame(this.userId);
  },
  finishGame: function(_id){
    Games.update({_id: _id}, {$set: {active: false, finished: true}});
  },
  hideButton: function(bubble_id, userId){
    Bubbles.update({_id: bubble_id}, {$set: {visibility: "hidden", userId: userId}});
  }
});

Meteor._onLogin  = function (userId) {
  allocateGame(userId);
  console.log("user: " + userId + "just logged in.");
};

Meteor._onLogout = function (userId) {
  leaveGames(userId);
  console.log("user: " + userId + "just logged out.");
};

allocateGame = function(userId) {
  var gameWaiting = Games.findOne({players: {$size: 1}, current: true});
  if (!gameWaiting) {
    console.log("creating a new game, none available");
    Games.update({players: userId}, {$set: {current: false}}, {multi: true});
    var gameId = Games.insert({players: [userId], active: false, finished: false, current: true});
     _.times(64, function(n){
    Bubbles.insert({gameId: gameId});
    });
  }
  else if (_.contains(gameWaiting.players, userId)){
    console.log("No other users are currently in the lobby please wait.");
  }
  else{
    console.log("connecting with an existing waiting player");
    Games.update({_id: gameWaiting._id}, {$set: {active: true}, $push: {players: userId}});
    }
};

leaveGames = function(userId) {
  console.log("leaving all unfinished games");
  Games.remove({
    $and: [
      {players: userId, players: {$size: 1}}
    ]
  });
  var games = Games.find({$and: [{players: userId, active: true}]});
  games.forEach(function(game){
    Games.update({_id: game._id}, {$set: {active: false, finished: true}});
  });
};

Meteor.publish('games', function(userId) {
  if(userId){
    return Games.find({players: this.userId});
  }
});

Meteor.publish('Bubbles', function(){
  return Bubbles.find();
});
