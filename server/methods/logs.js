Meteor.methods({
  downloadLog: function(lcid, batchid) {
    let log = {
      districtcenterId: lcid,
      batchId: batchid,
      action: 'download',
      timestamp: new Date()
    }

    return Logs.insert(log)
  }
});
