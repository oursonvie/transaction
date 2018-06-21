Meteor.methods({
  downloadLog: function(lcid, batchid) {
    let log = {
      districtcenterId: lcid,
      batchId: batchid,
      action: 'download',
      success: true,
      timestamp: new Date()
    }

    return Logs.insert(log)
  },
  errorDownloadLog: function(err) {
    console.log(err)

    

    // return Logs.insert(log)
    console.log('test')
  }
});
