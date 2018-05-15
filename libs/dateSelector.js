dateSelect = (startDate, endDate) => {
  formatedStartDate = moment(startDate).toISOString()
  formatedEndDate = moment(endDate).toISOString()

  // check time accuracy
  // console.log(formatedStartDate, formatedEndDate)

  return Transactions.find({
    CREATEDATE:{
      $lt: new Date(formatedEndDate),
      $gt: new Date(formatedStartDate)
    }
  }).fetch()
}

lcenterArray = (array) => {
  return array.map(item => item.LCENTERNAME).filter((value, index, self) => self.indexOf(value) === index)
}

lcenterFee = (startDate, endDate, lcentername) => {
  formatedStartDate = moment(startDate).toISOString()
  formatedEndDate = moment(endDate).toISOString()

  transanctions = Transactions.find({
    LCENTERNAME: lcentername,
    CREATEDATE:{
      $lt: new Date(formatedEndDate),
      $gt: new Date(formatedStartDate)
    }
  }).fetch()


  let pipeline = [{
    $group: {
      lcenter: "$LCENTERNAME",
      total: {$sum: "$AMOUNT"}
    }
  }]

  let result = Transactions.aggregate(pipeline)

  console.log(result)
}
