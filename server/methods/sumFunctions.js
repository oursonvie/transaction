// distinct array
Array.prototype.unique = function() {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

//convert district learning center id to array of sub learning center

arrayCenterTotalFees = (lcenterListArray) => {

  console.log(lcenterListArray)

  // applicatiable for 1 and more than 2 learning center
  let centerArrayList = []

  // array with only center name
  _.forEach(lcenterListArray, function(center) {
    centerArrayList.push(center.name)
  })

  let pipeline = [
    { $match :
      {
        LCENTERNAME:
        {
            $in: centerArrayList
        },
        STUDENTSTYLE:
        {
          $ne: '退学生'
        }
      }
    },
    { $group:
      {
        _id:"$RECRUITBATCHCODE",
        studentcount: {$push: "$STUDENTCODE"},
        totalFee:{$sum:'$MONEY'}
      }
    }
  ]

  let result = Promise.await(WorkingPlace.aggregate(pipeline))
  let sortedResult = _.sortBy(result, ['_id']);

  _.forEach(sortedResult, function(obj) {
    obj.studentcount = obj.studentcount.unique().length
  })

  console.log(sortedResult)

  return sortedResult
}
