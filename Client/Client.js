if (Meteor.isClient) {
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




 Template.grid.buttons = function (){
    var list = []
    for(var i=1*Math.random(); i<64; i++){
      list.push({value: i})
      
    }
    currentGame.insert(list)
    console.log(list)
    return list
    }

  Template.grid.events({
    'click .button': function(ev) {
      $(ev.target).css('visibility', 'hidden');
      console.log("som")
   }
});



}
