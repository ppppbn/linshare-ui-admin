angular.module('linshareAdminApp').constant('lsAppConfig', {
  accountType: {
    internal: 'INTERNAL',
    guest: 'GUEST',
    superadmin: 'SUPERADMIN',
    system: 'SYSTEM'
  },
  backendURL: 'linshare/webservice/rest/admin',
  dateFormat: {
    en: 'MM/dd/yyyy',
    fr: 'dd/MM/yyyy'
  },
  logoURL: undefined,
  // The licence cannot be disabled without Linagora consent
  license: true, // true to show / false to hide the license footer
  debug: true,
  productionMode: true,
  roles: {
    admin: 'ADMIN',
    write: 'WRITE',
    readonly: 'READ'
  }
});
