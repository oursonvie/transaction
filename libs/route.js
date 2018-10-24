FlowRouter.route('/admin', {
   name: 'timeSetting',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'timeSetting'});
    }
});

FlowRouter.route('/singlelcenter', {
   name: 'singleLCenter',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'singleLCenter'});
    }
});

FlowRouter.route('/districtlcenter', {
   name: 'districtLCenter',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'districtLCenter'});
    }
});

FlowRouter.route('/districtcenter/:id', {
   name: 'districtcenterID',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'districtcenterID'});
    }
});

FlowRouter.route('/admin/transactions', {
   name: 'transactions',
    action() {
        BlazeLayout.render('AdminLayout', {main: 'transactions'});
    }
});

FlowRouter.route('/districtcenter/templatehtml/:id', {
   name: 'dcenterpdf',
    action() {
        BlazeLayout.render('PrintLayout', {main: 'templateHtml'});
    }
});


FlowRouter.route('/user/district/:id', {
   name: 'dcenterDownload',
    action() {
        BlazeLayout.render('UserLayout', {main: 'downloadPage'});
    }
});

FlowRouter.route('/landingpage/:appId', {
   name: 'landingPage',
    action() {
        BlazeLayout.render('UserLayout', {main: 'landingPage'});
    }
});

FlowRouter.route('/disabledaccess', {
   name: 'disabledAccess',
    action() {
        BlazeLayout.render('UserLayout', {main: 'disabledAccessPage'});
    }
});
