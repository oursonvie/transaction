Template.eachDLCenter.events({
  "click li": function() {
    Session.set('action', { type:'view',  id: this._id} )
  }
});
