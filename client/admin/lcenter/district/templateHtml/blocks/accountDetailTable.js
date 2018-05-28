Template.accountDetailTable.helpers({
  xjtuDetail: function() {
    return Meteor.settings.public.xjtuaccountdetail
  },
  districtCenter: function() {
     return DLearningCenter.findOne()
  }
});
