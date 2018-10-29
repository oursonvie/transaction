Template.transactions.onCreated(function() {
  Session.set('sumedTransaction',false)
  Session.set('TotalTransaction',false)

  var self = this;
  self.autorun(function() {
    // sub to settings
    self.subscribe('Settings')

  });

  // get sum detail in session
  PromiseMeteorCall('getSumedTransaction')
  .then( res => {
    Session.set('sumedTransaction',res)
  })
  .catch( err => {
    console.log(err)
  })

  // get sum of sum in session
  PromiseMeteorCall('getTotalSum')
  .then(res => {
    Session.set('TotalTransaction', res)
  })
  .catch(err => {
    console.log(err)
  })

});

Template.transactions.helpers({
  currentBatch: function(){
    if (Settings.findOne({valuename:'batchId'})) {
      return Settings.findOne({valuename:'batchId'}).value
    }
  },
  sumedTransaction: function() {
    return Session.get('sumedTransaction')
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
