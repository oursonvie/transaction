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

    let decision = confirm("确认删除区域学习中心");

    if (decision) {
      PromiseMeteorCall('removeDLCenter', id)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    } else {
      console.log('never mind')
    }



  }
});

AutoForm.addHooks(['updateDLcenterForm'], {
  onSuccess: function(formType, result) {
    if (formType == 'update' && result == 1) {

      alert('更新成功')
      Session.set('selectedID', false)

      // check standalone leaerning center
      PromiseMeteorCall('checkStandAlone')
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))

    }

  }
})
