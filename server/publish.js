Meteor.publish('dateSubscribe', function(startDate, endDate) {
  if (this.userId) {
    console.log(startDate, endDate)
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
