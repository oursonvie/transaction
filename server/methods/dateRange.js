Meteor.methods({

  /*
  // get current dateRange base on actual data
  getDateRange:function(id){
    if (this.userId) {
      let subClist = DLearningCenter.findOne({_id:id}).sublearningcenter
      let array = lodash.map(subClist, 'name')

      let startDate = Promise.await(WorkingPlace.findOne({LCENTERNAME: {$in: array}},{sort:{CREATEDATE:1}, fields:{CREATEDATE:1}}))
      let  endDate = Promise.await(WorkingPlace.findOne({LCENTERNAME: {$in: array}},{sort:{CREATEDATE:-1}, fields:{CREATEDATE:1}}))

      return {
        startDate: moment(startDate.CREATEDATE).format('YYYY-MM-DD'), endDate: moment(endDate.CREATEDATE).format('YYYY-MM-DD')}

    } else {
      throw new Meteor.Error( '500', 'No Premission' );
    }
  },
  */

  getDateRange:function(id){
    let settings = Settings.findOne({valuename:'daterange'})

    let startDate = settings.value.startDate
    let endDate = settings.value.endDate

    return {
      startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD')
    }
  },

  updateOracleDB: function() {
    if (this.userId) {
      let result = Transactions.remove({})
      console.log(`Removed ${result} in transaction`)
      return updateTransactionDB()
    } else {
      throw new Meteor.Error( '500', 'No Premission' );
    }
  }
});
