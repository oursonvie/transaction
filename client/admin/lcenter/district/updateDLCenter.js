Template.updateDLCenter.helpers({
  selected: function(){
      return DLearningCenter.findOne({_id:Session.get('selectedID')})
  }
});

Template.updateDLCenter.events({
  "click .btn-secondary": function(event, template){
    Session.set('selectedID', false)
  }
});
