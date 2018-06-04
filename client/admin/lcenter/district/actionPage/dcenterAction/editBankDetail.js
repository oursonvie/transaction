Template.editBankDetail.helpers({
  selected: function(){
    return DLearningCenter.findOne({_id:Session.get('action').id})
  }
});
