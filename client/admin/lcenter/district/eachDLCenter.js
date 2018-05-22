Template.eachDLCenter.events({
  "click li": function() {
    Session.set('selectedID', this._id)
    Session.set('addNewDLCenter', false)
  },
  "click btn-secondary": function() {
    console.log(this._id)
  }
});
