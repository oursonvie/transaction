Template.districtLCenter.onCreated(function() {
  Session.set('actionType', false)
  // sub to lcenter db
  var self = this;
  self.autorun(function() {
    if (Session.get('action')) {
      Session.set('actionType', Session.get('action').type)
    } else {
      Session.set('actionType', false)
    }
  })

});

Template.viewDistrictLCenter.helpers({
  actionType: function(action){
    console.log(action)
    if (Session.get(action)) {
      console.log(Session.get(action))
      return Session.get(action).type
    }
  }
});

Template.viewDistrictLCenter.events({
  "click .btn-close": function() {
    Session.set('action', false)
  },
});
