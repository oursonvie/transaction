Template.districtLCenter.onCreated(function() {

  // init check on learning center
  PromiseMeteorCall('getLcenterList')
  .then(res => {
    Session.set('lcenterList', res)

    // init lcenterList as object
    let lcenterArray = []
    _.forEach(res, function(lcenter) {
      lcenterObject = {}
      lcenterObject.name = lcenter
      lcenterObject.type = 'single'
      lcenterObject.createdAt = new Date()
      lcenterArray.push(lcenterObject)
    })

    // check local learning center list
    PromiseMeteorCall('getLearingCenterList')
    .then(LCdb => {
      let diff = _.difference(res, LCdb)

      console.log(diff)

      // add missing learning center to db
      _.forEach(diff, function(name){
        if ( LearningCenter.find({name:name}).count() == 0 )
        // insert objct
        result = _.find(lcenterArray, function(lcenter) { return lcenter.name = name; });

        LearningCenter.insert(result)

      })
    })

  })
  .catch(err => console.log(err))

  // sub to lcenter db
  var self = this;
  self.autorun(function() {
    self.subscribe('LearningCenterList')
  })

});

Template.districtLCenter.helpers({
  lcenterList: function(){
    return LearningCenter.find()
  }
});

Template.districtLCenter.events({
  'click li': function(event, template) {
    console.log(this)
  }
})
