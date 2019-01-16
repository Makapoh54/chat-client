# chat-client
Client for chat app

To start app:
1. run npm i
2. run npm start

As it is dev setup dev Server is being addressed via "proxy": "http://localhost:8080", parameter in package.json;
To enter chat, user should write unique username (bigger then two chars), and press connect.
On disconnect or unsuccessful connect user will be notified and redirected to the landing page.
To send message, write your text in left bottom corner and press enter.
If user disconnect userlist should display changes.

// TODO Disconnection sometimes causes hanging sockets connections, due to what user is not correctly removed from chat. 