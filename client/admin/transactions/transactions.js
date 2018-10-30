Template.transactions.onCreated(function() {
  Session.set('districtCenterBatchFees',false)

  var self = this;
  self.autorun(function() {
    // sub to settings
    self.subscribe('Settings')

  });

  // get sum detail in session
  PromiseMeteorCall('districtCenterBatchFees')
  .then( res => {
    Session.set('districtCenterBatchFees',res)

    // update sum information in db
    PromiseMeteorCall('updateSumAchieve', res)
    .then( res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })

  })
  .catch( err => {
    console.log(err)
  })

});

Template.transactions.helpers({
  currentBatch: function(){
    if (Settings.findOne({valuename:'batchId'})) {
      return Settings.findOne({valuename:'batchId'}).value
    }
  },
  districtCenterBatchFees: function() {
    return Session.get('districtCenterBatchFees')
  },
  numberFormatter: function(number) {
    return numberFormatter(number)
  }
});

Template.transactions.events({
  'click .btn-download': function() {
    let batchId = Settings.findOne({valuename:'batchId'}).value
    var nameFile = `${batchId}缴费汇总.csv`
    PromiseMeteorCall('downloadCurrent', batchId)
    .then(fileContent => {
      if(fileContent) {
        var blob = new Blob([fileContent], {
          type: "text/plain;charset=utf-8"
        });
        saveAs(blob, nameFile);
      } else {
        console.log('Nothing to download')
      }
    })
    .catch(err => console.log(err))
  }
})
