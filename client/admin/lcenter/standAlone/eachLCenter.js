Template.eachLCenter.onCreated(function() {
  this.actived = new ReactiveVar(false)
});

Template.eachLCenter.helpers({
  lcenterList: function(){
    return Session.get('lcenterList')
  },
  reactActive: function() {
    if(this.type == 'standalone') {
      return true
    } else {
      return false
    }
  },
  actived: function() {
    return this.active
  }
});

Template.eachLCenter.events({
  'click li': function(event, template) {
    // template.actived.set(!Template.instance().actived.get())
  }
})
