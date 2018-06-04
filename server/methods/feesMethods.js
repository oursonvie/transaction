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

    // update current batchID
    Settings.upsert({
      valuename:"batchId"
    }, {
      $set:{value:currentBatchId()}
    })

    return result
  },
  districtCenterPersonFees: function(DCenterId) {
    let lcenterObjList = DLearningCenter.findOne({_id:DCenterId}).sublearningcenter

    if (lcenterObjList.length == 2) {
      let result = []
      _.forEach(lcenterObjList, function(center) {
        let tempArray = []
        let temp = {}
        temp.name = center.name

        // convert object into array
        tempArray.push(center)

        temp.paymentdetail = arrayCenterTotalFees(tempArray)
        result.push(temp)
      })

      result.type = 1
      return result
    } else {
      // return array of objects with one object
      let array = []
      let result = {}
      result.name = DLearningCenter.findOne({_id:DCenterId}).name
      result.paymentdetail = arrayCenterTotalFees(lcenterObjList)
      // push array
      array.push(result)
      return array
    }
  }
});
