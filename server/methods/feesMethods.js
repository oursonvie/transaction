Meteor.methods({
  totalFee:function(startDate, endDate) {

    let pipeline = [
      { $match :
        { CREATEDATE:
          {
            $lt: new Date(endDate),
            $gte: new Date(startDate)
          }
        }
      },
      { $group:
        {
          _id:"$STUDENTSTYLE",
          count: {$sum:1},
          totalFee:{$sum:'$MONEY'}
        }
      }
    ]

    let result = Transactions.aggregate(pipeline);

    return result
  },
  districtCenterPersonFees: function(centerName) {
    let lcenterList = DLearningCenter.findOne({name:centerName}).sublearningcenter

    fullDCenterTransactionList = []

    _.forEach(lcenterList, function(center) {
      let lcenterTransactionList = WorkingPlace.find({LCENTERNAME:center.name})
      _.forEach(lcenterTransactionList, function(transaction) {
        fullDCenterTransactionList.push(transaction)
      })
    })
  }
});

districtCenterPersonFees = (centerName) => {

  console.log(centerName)

  let lcenterList = DLearningCenter.findOne({name:centerName}).sublearningcenter

  fullDCenterTransactionList = []

  _.forEach(lcenterList, function(center) {

    console.log(center.name)

    let pipeline = [
      { $match :
        {
          LCENTERNAME: center.name
        }
      },
      { $group:
        {
          _id:"$RECRUITBATCHCODE",
          count: {$sum:1},
          totalFee:{$sum:'$MONEY'}
        }
      }
    ]

    let result = WorkingPlace.aggregate(pipeline);

    console.log(result)

  })

  return fullDCenterTransactionList
}
