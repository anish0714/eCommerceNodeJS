POSTMAN COLLETION LINK:
https://www.getpostman.com/collections/435290a40b69f5d9c0cf

install node_modules by "npm i"

config.js:
Add your mongodb_uri in "MONGO_URI" key.

Start project by npm start with nodemon or node index.js

Private Routes require to pass (x-auth-token) in headers

(x-auth-token) is generated by registering a new user and also by login api

You can check if user is logged in by loggedin api which gives x-auth-token as output

Private routes can be identified by having "auth" as parameter in routes.js file



