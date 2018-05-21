Template.districtLCenter.onCreated(function() {
  Session.set('addNewDLCenter', false)
  Session.set('activeLearningCenter', false)

  // check local learning center list
  PromiseMeteorCall('getActiveLearingCenterList')
  .then(res => {
    Session.set('activeLearningCenter', res)
  })

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
