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
    // get Settings
    self.subscribe('Settings')
    self.subscribe('downloadPdfs')
    self.subscribe('DistrictLearningCenterList')
    // filtered list when adding new dcenter, full list otherwise
    if (Session.get('actionType') == 'add') {
      self.subscribe('AloneLearningCenter')
    } else {
      self.subscribe('LearningCenterList')
    }

  })

});

Template.districtLCenter.helpers({
  actionStatus: function() {
    return Session.get('action')
  },
  districtLCenter: function() {
    if (Session.get('searchQuery')) {

      let searchQuery = Session.get('searchQuery')

      return DLearningCenter.find({"name":{"$regex":searchQuery}})
    } else {
      return DLearningCenter.find()
    }

  }
});

Template.districtLCenter.events({
  "click .btn-add": function(event, template){
     Session.set('action', { type:'add' } )
  },
  "click .btn-access-on": function(event, template){
     PromiseMeteorCall('turnONallDCenter')
     .then(res => console.log(res))
     .catch(err => console.log(err))
  },
  "click .btn-access-off": function(event, template){
     PromiseMeteorCall('turnOffallDCenter')
     .then(res => console.log(res))
     .catch(err => console.log(err))
  }
});
