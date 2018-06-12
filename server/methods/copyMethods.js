Meteor.methods({
  copyToWorking:function(startDate, endDate) {

    if (WorkingPlace.find().count() != 0) {
      console.log('start clearning working DB')
      WorkingPlace.remove({})
    }

    console.log('setting batchID to current')

    // update current batchID
    Settings.upsert({
      valuename:"batchId"
    }, {
      $set:{value:currentBatchId()}
    })

    console.log('start copying data into working DB')

    // find document in orginal DB
    let result = Transactions.find({
      CREATEDATE:{
        $lt: new Date('2018-04-29T16:00:00.000Z'),
        $gte: new Date('2017-10-31T16:00:00.000Z')
      }
    }).fetch()

    try {
      lodash.forEach(result, function(document) {
        document.batchID = guid()
        document.createdAt = new Date()
        WorkingPlace.insert(document)
      })
      return 0
    } catch(err) {
      return err
    }
  },
  getLcenterList: function() {
    return Promise.await(Transactions.rawCollection().distinct('LCENTERNAME'))
  },
  getLearningCenterList: function() {
    return Promise.await(LearningCenter.rawCollection().distinct('name'))
  },
  getActiveLearingCenterList: function() {
    return Promise.await(WorkingPlace.rawCollection().distinct('LCENTERNAME'))
  },
  setLearningCenterListStatus: function() {
    let activeList = Promise.await(WorkingPlace.rawCollection().distinct('LCENTERNAME'))

    lodash.forEach(activeList, function(center) {
      LearningCenter.update({name:center}, {$set:{active:true}})
    })

    return 'Learning center status updated'
  },
  checkStandAlone: function() {
    let cursors = DLearningCenter.find().fetch()
    let plainArray = []

    console.log('reset lcenters status')
    // batch change status to standalone first
    LearningCenter.update({},{$set:{type:'standalone'}},{multi: true})

    try {
      lodash.forEach(cursors, function(dcenter) {
        lodash.forEach(dcenter.sublearningcenter, function(center) {
          LearningCenter.update({name:center.name}, {
            $set:{
              type: 'multiple'
            }
          })
        })
      })
      console.log('lcenter status checked')
      return 'lcenter status checked'
    } catch(err) {
      return err
    }


  },
  setLearningCenterCode: function() {
    let arr = LearningCenter.find().fetch()

    lodash.forEach(arr, function(center) {
      let lcentercode = Transactions.findOne({LCENTERNAME:center.name}).LCENTERCODE

      let result = LearningCenter.update(
        {_id: center._id},
        {$set:{lcentercode: lcentercode}}
      )
    })

    return 'checked lcenter code'
  },
  resetOracleDB: function() {
    console.log('clearing db')
    let result = Transactions.remove({})
    console.log(`${result} transaction removed`)

    updateTransactionDB()
  }
});
