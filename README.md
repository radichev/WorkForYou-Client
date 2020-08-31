# WorkForYou-Client

WorkForYou-Client is an angular client which consumes from [WorkForYou-API](https://github.com/radichev/WorkForYou-API). It is build with lazy loaded modules which helps keep the initial bundle size smaller, which in turn helps decrease loading times. Every registered user can publish a job and buy existing one. The published and bought jobs are stored in his profile where he can access them. A user can update or delete job if he is the author of it. The application has admin panel which can only be accessed by a user with admin authority which is checked by AdminGurad from the jwt token, from there the admin can manage other users authorities. Every route, except the index, is guarded by an authentication guard which requires the user to be logged in. Every user can upload profile and job image which is handled by the backend and stored in AWS S3 bucket, in return the client receives image url.

[![Build status](https://ci.appveyor.com/api/projects/status/k3elwjp58i8luawl/branch/master?svg=true)](https://ci.appveyor.com/project/radichev/workforyou-client/branch/master)
 
# :hammer_and_wrench: Build With:

- Angular 9.1.7
- Angular Material 9.2.4
- ng2-carouselamos 4.1.0
- auth0/angular-jwt 4.2.0

# Website Screenshots
- Index Page

![Index Page](https://github.com/radichev/WorkForYou-API/blob/master/src/main/resources/static/screenshots/index.jpg)

- Home Page

![Home Page](https://github.com/radichev/WorkForYou-API/blob/master/src/main/resources/static/screenshots/home%20page.png)

- User Profile Page

![User Profile Page](https://github.com/radichev/WorkForYou-API/blob/master/src/main/resources/static/screenshots/user%20profile.png)

- Job Page

![Job Page](https://github.com/radichev/WorkForYou-API/blob/master/src/main/resources/static/screenshots/job.jpg)

- Edit Job Page

![Edit Job Page](https://github.com/radichev/WorkForYou-API/blob/master/src/main/resources/static/screenshots/edit%20job.jpg)

- Add Job Page

![Add Job Page](https://github.com/radichev/WorkForYou-API/blob/master/src/main/resources/static/screenshots/add%20job.jpg)

- Web Programming Category Page (one of many categories)

![Web Programming Category Page](https://github.com/radichev/WorkForYou-API/blob/master/src/main/resources/static/screenshots/web%20programming%20category.jpg)

- Admin Panel

![Admin Panel](https://github.com/radichev/WorkForYou-API/blob/master/src/main/resources/static/screenshots/admin%20panel.jpg)
