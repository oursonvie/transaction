Template.districtLCenter.onCreated(function() {
  Session.set('addNewDLCenter', false)
  Session.set('activeLearningCenter', false)

  // check local learning center list
  PromiseMeteorCall('getActiveLearingCenterList')
  .then(res => {
    Session.set('activeLearningCenter', res)
  })

  // sub to lcenter db
  var self = this;
  self.autorun(function() {
    self.subscribe('DistrictLearningCenterList')
  })

});

Template.districtLCenter.helpers({
  addMode: function() {
    return Session.get('addNewDLCenter')
  },
  districtLCenter: function() {
    return DLearningCenter.find()
  }
});

Template.districtLCenter.events({
  "click .btn-add": function(event, template){
     Session.set('addNewDLCenter', !Session.get('addNewDLCenter'))
     Session.set('selectedID', false)
  }
});
