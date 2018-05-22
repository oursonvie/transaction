Template.addNewDLCenter.onCreated(function() {
  // sub to lcenter db
  var self = this;
  self.autorun(function() {
    self.subscribe('Settings')
  })

});

Template.addNewDLCenter.helpers({
  lcenterarray: function(){
     let centerlist = Settings.findOne({valuename:'fullcenterlist'}).value
     return _.map(centerlist, function(value) {
       return {
         label:value,
         value:value
       }
     })
  }
});

AutoForm.addHooks(['insertDLCenterForm'], {
  onSuccess: function(formType, result) {
    if (formType == 'insert') {

      alert('创建成功')
      Session.set('selectedID', false)

      // check standalone leaerning center
      PromiseMeteorCall('checkStandAlone')
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    }

  }
})
