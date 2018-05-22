Template.updateDLCenter.helpers({
  selected: function(){
      return DLearningCenter.findOne({_id:Session.get('selectedID')})
  }
});

Template.updateDLCenter.events({
  "click .fa-times-circle": function() {
    Session.set('selectedID', false)
  },
  "click .btn-danger": function() {
    let id = Session.get("selectedID")
    PromiseMeteorCall('removeDLCenter', id)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
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
