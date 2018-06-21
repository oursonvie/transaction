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
           normal: 'Microsoft YaHei.ttf',
           bold: 'Microsoft YaHei.ttf',
           italics: 'Microsoft YaHei.ttf',
           bolditalics: 'Microsoft YaHei.ttf'
        }
    }

    let downloadFileName = `${renderObject.districtCenter.name} - ${moment().format('YYYY-MM-DD')}`

    let batchId = Settings.findOne({valuename:'batchId'}).value

    try {
      // download pdf
      pdfMake.createPdf(makeRenderObject(renderObject)).download(downloadFileName);
      // only success download counts
      PromiseMeteorCall('downloadLog', renderObject.districtCenter._id, batchId)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    } catch(err) {
      // record error
      console.error(err)
      console.log(err)
      PromiseMeteorCall('errorDownloadLog', err)
      .then(res => console.log(res))
      .catch(err => console.log(err))

      alert(err)
    }

  }
});
