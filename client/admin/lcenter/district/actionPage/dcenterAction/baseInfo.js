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
  },
  'click .btn-delete': function() {
    let result = confirm('确认删除区域学习中心？')

    if (result) {
      PromiseMeteorCall('removeDLCenter', this._id)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    } 

  }
})
