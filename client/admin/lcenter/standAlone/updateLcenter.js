Template.updateLcenter.helpers({
  selected: function(){
      return LearningCenter.findOne({_id:Session.get('selectedID')})
  }
});

Template.updateLcenter.events({
  "click .fa-times-circle": function() {
    Session.set('selectedID', false)
  }
});

AutoForm.addHooks(['updateLcenterForm'], {
  onSuccess: function(formType, result) {
    if (formType == 'update' && result == 1) {
      alert('更新成功')
      Session.set('selectedID', false)
    }
  }
})
