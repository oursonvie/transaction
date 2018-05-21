Meteor.publish('dateSubscribe', function(startDate, endDate) {
  if (this.userId) {
    return Transactions.find({
      CREATEDATE:{
        $lt: new Date(endDate),
        $gte: new Date(startDate)
      }
    })
  } else {
    throw new Meteor.Error( '500', 'No Premission' );
  }
})


Meteor.publish('LearningCenterList', function() {
  if (this.userId) {
    return LearningCenter.find()
  } else {
    throw new Meteor.Error( '500', 'No Premission' );
  }
})

Meteor.publish('DistrictLearningCenterList', function() {
  if (this.userId) {
    return DLearningCenter.find()
  } else {
    throw new Meteor.Error( '500', 'No Premission' );
  }
})
