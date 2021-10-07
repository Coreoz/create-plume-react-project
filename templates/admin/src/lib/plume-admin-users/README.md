Plume admin users
=================

Installation
------------
1. Provide an admin theme implementation: `injector.registerSingleton('PlumeAdminTheme', AdminTheme);`
2. Provide an `PlumeAdminHttpClient` implementation: `injector.registerSingleton('PlumeAdminHttpClient', ApiHttpClientAuthenticated);`
3. Install the plume admin users module: `installPlumeAdminUsersModule(injector)`;
4. Declare the plume admin users module in the router: `<this.permissionRoute.render permission={Permission.MANAGE_USERS} path="/users"><this.users.render /></this.permissionRoute.render>`
5. Add a link to the plume admin users in the navigation: `{this.sessionService.hasPermission(Permission.MANAGE_USERS) && (<li><Link to="/users">Users</Link></li>)}`
