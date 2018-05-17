Template.districtLCenter.onCreated(function() {
  Session.set('lcenterList', false)

  Session.set('liveLcenterList', false)

  PromiseMeteorCall('getLcenterList')
  .then(res => {
    Session.set('lcenterList', res)

    // init lcenterList as object
    let lcenterArray = []
    _.forEach(res, function(lcenter) {
      lcenterObject = {}
      lcenterObject.name = lcenter
      lcenterObject.singleEnd = true
      lcenterArray.push(lcenterObject)
    })

    Session.set('liveLcenterList', lcenterArray)

  })
  .catch(err => console.log(err))
});

Template.districtLCenter.helpers({
  lcenterList: function(){
    return Session.get('lcenterList')
  },
  liveLcenterList: function() {
    return Session.get('liveLcenterList')
  }
});

Template.districtLCenter.events({
  'click li': function(event, template) {
    console.log(this)
  }
})
