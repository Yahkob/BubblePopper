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
  Meteor.subscribe("Buttons");
});
  
  function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

 Template.grid.buttons = function (){
    var user = Meteor.user();
    if(!user){
        return;
    }
    var game = gameCollection.findOne({players: {$in: [user._id]}, current: true});  // Players know what games they have.
    if(!game){
        return;
    }
    return bubbles.find({gameId: game._id});
}



  Template.grid.events({
    'click .button': function(ev) {
      $(ev.target).css('visibility', 'hidden');
      console.log("som")
   }
});

