require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');

Template.pdfdownload.events({
  'click .btn-pdf-download': function() {

    let renderObject = {}

    renderObject.feesDetail = Session.get('feesDetail')
    renderObject.feesInfo = Session.get('feesInfo')
    renderObject.dateRange = Session.get('dateRange')
    renderObject.districtCenter = DLearningCenter.findOne()
    renderObject.xjtuAccount = Meteor.settings.public.xjtuaccountdetail

    pdfMake.fonts = {
     msyh: {
          normal: 'msyh.ttf',
          bold: 'msyh_bold.ttf',
          italics: 'msyh.ttf',
          bolditalics: 'msyh.ttf'
        }
    }

    pdfMake.createPdf(makeRenderObject(renderObject)).open();

  }
});