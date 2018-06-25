Meteor.methods({
  downloadLog: function(lcid, batchid, success) {
    let log = {
      districtcenterId: lcid,
      batchId: batchid,
      action: 'download',
      success: success,
      timestamp: new Date()
    }

    return Logs.insert(log)
  }
});
