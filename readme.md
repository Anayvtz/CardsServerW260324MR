the server listens to port 8182

how to install the project?
1. run the following:
$ npm i
2. add an .env file in the main directory which will include:
JWT_PASSWORD="secret"

how to run the project?
the following will run the server on local host:
$ npm run dev

 User Commands
===============
1. register
$ POST http://127.0.0.1:8182/users
with body:
{
  "name": {
    "first": "Ell",
    "middle": "",
    "last": "Vis"
  },
  "phone": "0512345567",
  "email": <your email>,
  "password": <your password>,
  "image": {
    "url": "https://www.image.com",
    "alt": "image"
  },
  "address": {
    "state": "IL",
    "country": "Israel",
    "city": "Arad",
    "street": "Shoham",
    "houseNumber": 5,
    "zip": 8920435
  },
  "isBusiness": true
}
2. login
$ POST http://127.0.0.1:8182/users/login
with body:
{
  "email": "<your email>",
  "password": "<your password>"
}
3. update user
$ PUT http://127.0.0.1:8182/users/<user id>
with header:
x-auth-token 
i.e. the token you received when doing login
with body:
{
    "name": {
        "first": "limorana",
        "middle": "Man",
        "last": "user"
    },
    "phone": "0545667651",
    "image": {
        "url": "",
        "alt": ""
    },
    "address": {
        "state": "IL",
        "country": "Israel",
        "city": "Arad",
        "street": "Shoham",
        "houseNumber": 5,
        "zip": 8920435
    }
   
}

4. get user by id
$ GET http://127.0.0.1:8182/users/<your user id>
with header:
x-auth-token 
i.e. the token you received when doing login
with body: empty

5. get all users
$ GET http://127.0.0.1:8182/users

with body: empty

6. change user business status
$ PATCH http://127.0.0.1:8182/users/<user-id>
with header:
x-auth-token 
i.e. the token you received when doing login
with body: empty
desc: it will toggle the isBusiness field

7. delete user
$ DELETE http://127.0.0.1:8182/users/<user-id>
with header:
x-auth-token 
i.e. the token you received when doing login
with body: empty

Cards Commands
==============
1. get all cards
$ GET http://127.0.0.1:8182/cards
with header: empty
with body: empty

2. get card by id
$ GET http://127.0.0.1:8182/cards/<card id>
with header: empty
with body: empty

3. get all my cards
$ GET http://127.0.0.1:8182/cards/my-cards
with header:
x-auth-token 
i.e. the token you received when doing login
with body: empty

4. create new card
$ POST http://127.0.0.1:8182/cards
with header:
x-auth-token 
i.e. the token you received when doing login
with body:
{
  "title": "a wonderful new card",
  "subtitle": "a test value for this card",
  "description": "a test value for new card\na test value for new card\n",
  "phone": "012-3211234",
  "email": "<unique email>",
  "web": "www.bing.com",
  "image": {
    "url": "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
    "alt": "image of something"
  },
  "address": {
    "state": "IL",
    "country": "Israel",
    "city": "Arad",
    "street": "Shoham",
    "houseNumber": 5,
    "zip": 8920435
  }

5. update card
$ PUT http://127.0.0.1:8182/cards/<card-id> 
with header:
x-auth-token
with body:
{
  "title": "hello!!! a wonderful new card updated!",
  "subtitle": "a test value for this card",
  "description": "a test value for new card\na test value for new card\n",
  "phone": "012-3211234",
  "email": "qwe1@gmail.com",
  "web": "www.bing.com",
  "image": {
    "url": "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
    "alt": "image of something"
  },
  "address": {
    "state": "IL",
    "country": "Israel",
    "city": "Arad",
    "street": "Shoham",
    "houseNumber": 5,
    "zip": 8920435
  }
6. like/unlike a cards
$ PATCH http://127.0.0.1:8182/cards/<card-id>
with header:
x-auth-token
with body: empty

7. change card biz number
$ PATCH http://127.0.0.1:8182/cards/<card id>
with header:
x-auth-token
with body:
{
  "bizNumber": <new biz number>
}

8. delete card
$ DELETE http://127.0.0.1:8182/cards/<card-id>
with header:
x-auth-token
with body: empty