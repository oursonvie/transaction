Template.DLCenterDetail.helpers({
  selectDlcenter: function() {
    return DLearningCenter.findOne({_id:Session.get('action').id})
  },
  lcenterCount: function() {
    return DLearningCenter.findOne({_id:Session.get('action').id}).sublearningcenter.length
  },
  something: function() {
    return 20000
  }
});

Template.DLCenterDetail.events({
  'click .btn-edit': function() {
    Session.set('action', { type:'edit',  id: this._id} )
  }
})
