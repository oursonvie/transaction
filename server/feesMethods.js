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

    console.log(result)

    return result
  }
});
