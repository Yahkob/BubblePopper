if (Meteor.isServer) {
  
  Meteor.methods({
    newGame: function() {
      allocateGame(this.userId);
    },
    finishGame: function(_id) {
      gameCollection.update({_id: _id}, {$set: {active: false, finished: true}});
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
    var gameWaiting = gameCollection.findOne({players: {$size: 1}});
    
    if (!gameWaiting) {
      console.log("creating a new game, none available");
      gameCollection.update({players: userId}, {$set: {current: false}}, {multi: true});
      gameCollection.insert({players: [userId], active: false, finished: false, current: true});
    } else {
      console.log("connecting with an existing waiting player");
      gameCollection.update({_id: gameWaiting._id}, {$set: {active: true}, $push: {players: userId}});
    }
  };
  
  leaveGames = function(userId) {
    console.log("leaving all unfinished games");
    
    gameCollection.remove({$and: [{players: userId, players: {$size: 1}}]});
    
    var games = gameCollection.find({$and: [{players: userId, active: true}]});
  
    games.forEach(function(game) {
      gameCollection.update({_id: game._id}, {$set: {active: false, finished: true}});          
    })
  };
  
  Meteor.publish('myGames', function() {
   
    if (!this.userId) {
        console.log('No users.');
        //return [];
        this.ready();
    } else {
      console.log('Publishing user: '+this.userId);
      return gameCollection.find({players: this.userId});
    }
  
  });
  
}

