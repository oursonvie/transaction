Template.eachDLCenter.events({
  "click li": function() {
    Session.set('selectedID', this._id)
  }
});
