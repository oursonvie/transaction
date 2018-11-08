Template.viewPhoto.onCreated(function() {
  Session.set('photoSelector', false)
  Session.set('currentBatchNo', false)

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

    //get logs under the districtCenter
    self.subscribe('downloadLogs', dcenterid);

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
  },
  uploadTime: function(id) {
    let time = Images.findOne({_id:id}).uploadedAt
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
  },
  downloadTime: function(id) {
    if (Logs.findOne({batchId:id}) && Logs.findOne({batchId:id}).timestamp) {

      let time = Logs.findOne({batchId:id},{sort:{timestamp:-1}}).timestamp

      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }

  },
  imageNaming: function(filename) {

    if (DLearningCenter.findOne({_id:Session.get('action').id})) {
      dlcentername = DLearningCenter.findOne({_id:Session.get('action').id}).name

      batchcode = Session.get('currentBatchNo')

      fileExtension = filename.split('.').splice(-1)

      downloadfile = `${dlcentername}_${batchcode}.${fileExtension}`

      return downloadfile

    }

  }
});

Template.viewPhoto.events({
  'click tr': function(events, template) {
    Session.set('photoSelector', this.photoid)
    Session.set('currentBatchNo', this.batchcode)
  }
})
