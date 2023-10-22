/*Implement role based authentication*/

Steps Followed
==================
1,  Create new application
      npx create-react-app appname
      npm install bootstrap
      npm i react-toastify 

 2,  Implement Routing
      npm install react-router-dom

 3,  Define & Run JSON Server REST API
      json-server --watch db.json --port 8000

4,  Design Registration page using bootstrap & HTML

 5,  Implement the Functionality

 6,  After success show the notification & Redirect to Login page

  npm i react-toastify - provide a notification

 If it is the 'New User' then click 'New User Button' in 'Login Page' and then redirect to 'Register Page', in that Register user can enter their details and choose their and then submit 'Register Button'.

 If it is the 'Existing User', directly enter the login details and hit the 'Login Button'. 

 If the login process is done then redirect to home page.

 In 'Home page', implemented role based role based authentication using JSON Server REST API.

 If the person comes under 'User role' credential they have a authorization for edit, add and not delete the data.

 If the person comes under 'Admin role' credential ther have a authorization for edit, add, and delete.

 Once logout the home page then it is redirected to the Login page.