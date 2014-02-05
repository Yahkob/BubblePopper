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
<<<<<<< HEAD


=======
  
>>>>>>> 59dfd8bf8d4abd8b719f0e7dc125f1b6c3c79fb4
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

