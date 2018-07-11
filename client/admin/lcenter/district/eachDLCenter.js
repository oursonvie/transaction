Template.eachDLCenter.helpers({
  allowAccess: function() {
    return this.allowAccess
  }
})

Template.eachDLCenter.events({
  "click .btn-detail": function() {
    Session.set('action', { type:'view',  id: this._id} )
  },
  "click .btn-downloadpage": function() {

    console.log(this)
    // get first admin and sublearning center code
    let allowUsers = this.alloweduser.split(',').map(function(item) {
      return item.trim()
    })
    
    PromiseMeteorCall('encryptStamp', allowUsers[0], this.sublearningcenter[0].lcentercode)
    .then(res => {
      let url = `${Meteor.absoluteUrl()}landingpage/lcenter?query=${res}`
      console.log(url)
      //window.location.href = url;
      window.open(url, '_blank');
    })
    .catch(err => console.log(err))


  },
  "click .fa-power-off": function() {
    PromiseMeteorCall('changeAccess', this._id)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }
});
