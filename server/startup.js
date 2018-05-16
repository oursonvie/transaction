Meteor.startup(function () {

  if ( Meteor.users.find().count() === 0 ) {
      let superAdminAccount = Accounts.createUser({
          email: 'oursonvie@qq.com',
          password: 'hacker'
      });

      // add super admin
      Roles.addUsersToRoles(superAdminAccount, ['admin', 'superadmin'])
  }

});
