npm init
npm i express morgan dotenv
npm i --save-dev
script update
index.js
app setup
dotenv config
indexRouter setup
morgon
static file
error handling
routes setup
module => router(GET, POST, PUT, PATCH, DELETE)
Router error handling
Postman api

##

user Story
Raktim wants to register into the system. Raktim system. Once Signed up, Raktim should be able to add his details and sign up into the system. Once Signed up, Raktim should be able to add his own blog and check all blogs (both published and draft)

- Rigister
-> user model (name, email, password)
-> create register controller
-> create post route as /api/v1/useers/register
->update req.body in controller as password => bcrypt(hash pw)
-> Send email to user about successful signup (optional)

login
-> create login controller
-> create post route as / api/v1/users/login
-> in controller, get req.body (email and password )
-> check if user exists in the system or not
if user exist, get hashedPw from Databe
-> compare user provided password with hashedPw
-> if result false, throw new Error("Email or password mismatch")
-> else "User logged in Successfully"


-> Additional work

- system needs to send somthing back to user (access_token)
-token creation (Authorization)
- Cookie, session, json web token (3 methods to authorize )
-- start the authorization Process --

npm i jsownwebtoken 
- jsonwebtoken, 2 utility function (token generate/ token validate)
- create a token.js utility file


- if user successfully logs in,
-Create the user payload for the jsonsign utility for signing
-add the roles to the user user model
- Get the token and check the token in jwt.io, check for expiratition and data in the json object
- send the token to user through login api

send the token for every requist in req.headers
- checkRole middle update using.token validate utility function
- if false, permission denied error throw
- if true, next()


=======
Authorization => JSON WEB TOKEN => verify =>RBAC

/// Password action

1. forget Password
2. change Password
3. reset password
