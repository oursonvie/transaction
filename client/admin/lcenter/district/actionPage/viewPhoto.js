Template.viewPhoto.onCreated(function() {
  Session.set('photoSelector', false)

  // subscribe photo
  let dcenterid = Session.get('action').id
  var self = this;
  self.autorun(function() {
    if (DLearningCenter.findOne({_id:dcenterid})) {
      let picObjArr = DLearningCenter.findOne({_id:dcenterid}).uploadedPic
      let picIdArray = []
      lodash.forEach(picObjArr, function(photo) {
        picIdArray.push(photo.photoid)
      })
      self.subscribe('districtImageStore', picIdArray);
    }
  })
});

Template.viewPhoto.helpers({
  selectDlcenter: function() {
    return DLearningCenter.findOne({_id:Session.get('action').id})
  },
  Images: function() {
    if (Session.get('photoSelector')) {
      return Images.findOne(Session.get('photoSelector'))
    }
  }
});

Template.viewPhoto.events({
  'click .list-group-item': function(events, template) {
    Session.set('photoSelector', this.photoid)
  }
})
