Template.pdfFeesDetail.helpers({
  feesDetail: function() {
    if (Session.get('feesDetail')) {
      return Session.get('feesDetail')
    }
  },
  feesInfo: function() {
    if (Session.get('feesInfo')) {
      return Session.get('feesInfo')
    }
  },
  extraFees: function() {
    if (Session.get('feesInfo').extraAmount) {
      return Session.get('feesInfo').extraAmount
    }
  },
  numberDisplay: function(number) {
    let fixed = parseFloat(number).toFixed(2)
    return numberWithCommas(fixed)
  },
  ifFirst: function(index) {
    console.log(index)
    if (index == 0) {
      return '银联缴费'
    } else {
      return false
    }
  }
});
