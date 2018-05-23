Template.DLCenterDetail.helpers({
  selectDlcenter: function() {
    return DLearningCenter.findOne({_id:Session.get('action').id})
  }
});
