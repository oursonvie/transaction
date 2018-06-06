Template.baseInfo.onCreated(function() {
  Session.set('formType', 'disabled')
  })

Template.baseInfo.helpers({
  selected: function() {
    return DLearningCenter.findOne({_id:Session.get('action').id})
  },
  formType: function() {
    return Session.get('formType')
  }
});

Template.baseInfo.events({
  'click .btn-form-type-edit': function() {
    Session.set('formType', 'update')
  }
})
