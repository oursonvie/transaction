Template.eachDLCenter.events({
  "click li": function() {
    Session.set('selectedID', this._id)
  },
  "click btn-secondary": function() {
    console.log(this._id)
  }
});
