Template.districtLCenter.onCreated(function() {
  Session.set('addNewDLCenter', false)
});

Template.districtLCenter.helpers({
  addMode: function(){
    return Session.get('addNewDLCenter')
  }
});

Template.districtLCenter.events({
  "click .btn-add": function(event, template){
     Session.set('addNewDLCenter', !Session.get('addNewDLCenter'))
  }
});
