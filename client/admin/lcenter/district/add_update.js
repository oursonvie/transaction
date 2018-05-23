AutoForm.addHooks(['insertDLCenterForm'], {
  onSuccess: function(formType, result) {
    if (formType == 'insert') {

      alert('创建成功')
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
