Template.updateDLCenter.helpers({
  selected: function(){
      return DLearningCenter.findOne({_id:Session.get('selectedID')})
  }
});

Template.updateDLCenter.events({
  "click .fa-times-circle": function() {
    Session.set('selectedID', false)
  }
});

AutoForm.addHooks(['updateDLcenterForm'], {
  onSuccess: function(formType, result) {
    if (formType == 'update' && result == 1) {
      alert('更新成功')
      Session.set('selectedID', false)
    }
  }
})
