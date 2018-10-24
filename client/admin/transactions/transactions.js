Template.transactions.onCreated(function() {
  Session.set('sumedTransaction',false)

  var self = this;
  self.autorun(function() {
    // get Settings
    self.subscribe('Settings')
    self.subscribe('DistrictLearningCenterList')
  })


});

Template.transactions.helpers({
  currentBatch: function(){
    if (Settings.findOne({valuename:'batchId'})) {
      return Settings.findOne({valuename:'batchId'}).value
    }
  },
  dlearningcenterList: function() {
    return DLearningCenter.find({},{fields:{name:1}})
  },
  sumedTransaction: function() {
    return Session.get('sumedTransaction')
  }
});

Template.transactions.events({
  "click .btn-refresh": function(event, template){
    PromiseMeteorCall('getSumedTransaction')
    .then( res => {
      Session.set('sumedTransaction',res)
    })
    .catch( err => {
      console.log(err)
    })
  }
});
