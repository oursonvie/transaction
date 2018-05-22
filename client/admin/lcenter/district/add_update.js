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
