Template.subSumPayment.helpers({
  feesObjects: function() {
    if (Session.get('feesDetail')) {
      return Session.get('feesDetail')
    }
  },
  numberDisplay: function(number) {
    let fixed = parseFloat(number).toFixed(2)
    return numberWithCommas(fixed)
  }
});
