Deps.autorun(function(){
  Meteor.subscribe("games", Meteor.userId());
  Meteor.subscribe("Bubbles");
});

Template.home.helpers({
  game: function(){
    return Games.findOne({current: true});
  },
  player1Score: function(){
    var game = Games.findOne({current: true});
    if(!game){
      return;
    }
    var player = game.players[0];
    var bubbles = Bubbles.find({userId: player, gameId: game._id}).fetch();
    return bubbles.length;
  },
  player2Score: function(){
    var game = Games.findOne({current: true});
    if(!game){
      return;
    }
    var player = game.players[1];
    var bubbles = Bubbles.find({userId: player, gameId: game._id}).fetch();
    return bubbles.length;
  },
  endGame: function(){
    var game = Games.findOne({current: true});
    if(!game){
      return;
    }
    var player1 = Bubbles.find({userId: game.players[0], gameId: game._id}).fetch().length;
    var player2 = Bubbles.find({userId: game.players[1], gameId: game._id}).fetch().length;
    var totalPressed = player1 + player2;
    var winner;
    if(player1 > player2){
      winner = "Player 1 Wins!!!";
    }
    else if(player2 > player1){
      winner = "Player 2 Wins!!!";
    }
    else{
      winner = "Tie Game!!!!";
    }
    if(totalPressed !== 64){
      return;
    }
    bootbox.alert(winner);
    Meteor.call('finishGame', game._id)
  }
});

Template.home.events({
  "click #newGame" : function() {
    Meteor.call('newGame')
  },
  "click #finishGame": function(){
    var game = Games.findOne({current: true});
    Meteor.call('finishGame', game._id);
  }
});

Template.grid.helpers({
  buttons: function (){
    var user = Meteor.user();
    if(!user){
      return;
    }
    var game = Games.findOne({players: {$in: [user._id]}, current: true});
    if(!game){
      return;
    }
    return Bubbles.find({gameId: game._id});
  }
});

Template.grid.events({
  'click .button': function (event, template) {
    console.log("Pop!")
    var clickedElement = $(event.target);
    var _id = clickedElement.attr('button_id');
    Meteor.call('hideButton', _id, Meteor.userId());
  }
});


