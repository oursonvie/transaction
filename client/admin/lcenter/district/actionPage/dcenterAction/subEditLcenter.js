Template.subEditLcenter.onCreated(function() {
  Session.set('formType', 'disabled')
  })

Template.subEditLcenter.helpers({
  selected: function(){
    return DLearningCenter.findOne({_id:Session.get('action').id})
  },
  formType: function() {
    return Session.get('formType')
  }
});

Template.subEditLcenter.events({
  'click .btn-form-type-edit': function() {
    Session.set('formType', 'update')
  }
})
