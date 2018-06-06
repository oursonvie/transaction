Template.eachDLCenter.helpers({
  allowAccess: function() {
    return this.allowAccess
  }
})

Template.eachDLCenter.events({
  "click .btn-outline-secondary": function() {
    Session.set('action', { type:'view',  id: this._id} )
  },
  "click .fa-power-off": function() {
    PromiseMeteorCall('changeAccess', this._id)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }
});
