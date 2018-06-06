Template.updateDLCenter.helpers({
  selected: function(){
      return DLearningCenter.findOne({_id:Session.get('action').id})
  }
});

Template.updateDLCenter.events({
  "click .btn-danger": function() {
    let id = Session.get('action').id

    let decision = confirm("确认删除区域学习中心");

    if (decision) {
      PromiseMeteorCall('removeDLCenter', id)
      .then(res => {
        console.log(res)
        // success delete will return 1
        if (res == 1) {
          // check standalone leaerning center
          PromiseMeteorCall('checkStandAlone')
          .then(res => {
            console.log(res)
          })
          .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
    } else {
      console.log('never mind')
    }



  }
});

AutoForm.addHooks(['updateDLcenterForm', 'updateLearningCenter', 'updateBankDetail', 'updateBaseInfo'], {
  onSuccess: function(formType, result) {
    console.log(formType)
    if (formType == 'update' && result == 1) {

      alert('更新成功')
      Session.set('selectedID', false)
      Session.set('formType', 'disabled')

      // check standalone leaerning center
      PromiseMeteorCall('checkStandAlone')
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))

    }
  }
})
