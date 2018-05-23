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

    if (lcenterList.length != 2) {
      return arrayCenterTotalFees(centerName)
    }
  }
});
