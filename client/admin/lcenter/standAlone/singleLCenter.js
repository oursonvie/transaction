Template.singleLCenter.onCreated(function() {

  // init Session
  Session.set('selected', false)
  Session.set('selectedID', false)

  // init check on learning center
  PromiseMeteorCall('getLcenterList')
  .then(res => {
    Session.set('lcenterList', res)

    // init lcenterList as object
    let lcenterArray = []
    _.forEach(res, function(lcenter) {
      lcenterObject = {}
      lcenterObject.name = lcenter
      lcenterObject.type = 'standalone'
      lcenterObject.createdAt = new Date()

      lcenterArray.push(lcenterObject)
    })

    // check local learning center list
    PromiseMeteorCall('getLearningCenterList')
    .then(LCdb => {
      let diff = _.difference(res, LCdb)

      console.log(diff)

      if (diff.length > 0) {
        // add missing learning center to db
        _.forEach(diff, function(name){
          if ( LearningCenter.find({name:name}).count() == 0 )

          // insert objct
          result = _.find(lcenterArray, function(lcenter) {
            return lcenter.name = name;
          });

          LearningCenter.insert(result)

        })

        // update lcode
        PromiseMeteorCall('setLearningCenterCode')
        .then(res => {
          console.log(res)
        })

      }


    })

  })
  .catch(err => console.log(err))

  // check learning center status
  PromiseMeteorCall('setLearningCenterListStatus')
  .then(res => {
    console.log(res)
  })

  // sub to lcenter db
  var self = this;
  self.autorun(function() {
    self.subscribe('LearningCenterList')
  })

});

Template.singleLCenter.helpers({
  lcenterList: function(){
    // sort result
    return LearningCenter.find({}, {sort: { active : -1, name : 1 }})
  }
});

Template.singleLCenter.events({
  'click li': function(event, template) {
    Session.set('selectedID', this._id)
  }
})
