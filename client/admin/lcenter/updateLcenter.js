Template.updateLcenter.helpers({
  selected: function(){
      return LearningCenter.findOne({_id:Session.get('selectedID')})
  }
});

Template.updateLcenter.events({
  "click .btn-secondary": function(event, template){
    Session.set('selectedID', false)
  }
});
