Template.districtLCenter.onCreated(function() {
  Session.set('action', false)

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
  actionStatus: function() {
    return Session.get('action')
  },
  districtLCenter: function() {
    return DLearningCenter.find()
  }
});

Template.districtLCenter.events({
  "click .btn-add": function(event, template){
     Session.set('action', {type:'add'} )
  }
});
