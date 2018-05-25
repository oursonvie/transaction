Template.districtcenterID.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');
        self.subscribe('DistrictLearningCenter', id);
        self.subscribe('sublearningCenter', id);
    });
});

Template.districtcenterID.helpers({
  transactions: function() {
    return WorkingPlace.find()
  },
  timeFormatter: function(time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
  }
});
