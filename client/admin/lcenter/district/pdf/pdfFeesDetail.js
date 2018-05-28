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
});
