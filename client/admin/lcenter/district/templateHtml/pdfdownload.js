require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');

Template.pdfdownload.events({
  'click .btn-pdf-download': function() {

    let renderObject = {}

    renderObject.feesDetail = Session.get('feesDetail')
    renderObject.feesInfo = Session.get('feesInfo')
    renderObject.dateRange = Session.get('dateRange')
    renderObject.districtCenter = DLearningCenter.findOne()

    pdfMake.fonts = {
     Roboto: {
          normal: 'Microsoft YaHei.ttf',
          bold: 'Microsoft YaHei.ttf',
          italics: 'Microsoft YaHei.ttf',
          bolditalics: 'Microsoft YaHei.ttf'
        }
    }

    pdfMake.createPdf(makeRenderObject(renderObject)).open();

  }
});
