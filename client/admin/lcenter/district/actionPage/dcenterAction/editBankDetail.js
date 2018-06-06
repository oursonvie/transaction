Template.editBankDetail.onCreated(function() {
  Session.set('formType', 'disabled')
  })

Template.editBankDetail.helpers({
  selected: function(){
    return DLearningCenter.findOne({_id:Session.get('action').id})
  },
  formType: function() {
    return Session.get('formType')
  }
});

Template.editBankDetail.events({
  'click .btn-form-type-edit': function() {
    Session.set('formType', 'update')
  }
})
