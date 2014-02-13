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
    console.log(game);
    if(!game)
      return;
    var player = game.players[0];
    console.log(player);
    var bubbles = Bubbles.find({userId: player, gameId: game._id}).fetch();
    return bubbles.length;
  },
  player2Score: function(){
    var game = Games.findOne({current: true});
    if(!game)
      return;
    var player = game.players[1];
    return Bubbles.find({userId: player, gameId: game._id}).fetch().length;
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
    console.log('Inside the grid -> button helper');
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
    var clickedElement = $(event.target);
    var _id = clickedElement.attr('button_id');
    Meteor.call('hideButton', _id, Meteor.userId());
  }
})

