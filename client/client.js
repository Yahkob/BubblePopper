Deps.autorun(function(){
  Meteor.subscribe("games", Meteor.userId());
  Meteor.subscribe("Bubbles");
});

Template.home.helpers({
  game: function(){
    return Games.findOne({current: true});
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
  'click .button': function (event) { 
    var clickedElement = event.target
    console.log(clickedElement)
    Meteor.call('hideButton','clickedElement')
  }
})

