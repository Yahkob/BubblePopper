Deps.autorun(function(){
  gameSubscription = Meteor.subscribe("myGames",Meteor.userId());
  });


Template.home.game = function(){
  return gameCollection.findOne({current: true});
};
Template.home.events({
  "click #newGame" : function() {
    Meteor.call('newGame')
  },
  "click #finishGame": function(){
    var game = gameCollection.findOne({current: true});
    Meteor.call('finishGame', game._id);
    }
  });

Deps.autorun(function(){
  Meteor.subscribe("bubbles");
});

 Template.grid.buttons = function (){
    var user = Meteor.user();
    if(!user){
        return;
    }
    var game = gameCollection.findOne({players: {$in: [user._id]}, current: true});  
    if(!game){
        return;
    }
    return bubbles.find({gameId: game._id});
}



  Template.grid.events({
    'click .button': function(ev) {
      $(ev.target).css('visibility', 'hidden');
      
   }
});

