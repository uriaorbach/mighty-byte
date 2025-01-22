general idea of the mechanism of the task:

if a client wants to post a url, he should open a websocket before trying to POST a request with a url.
when a client opens a websocket with the server, he should receive a clientID if he doesnt already have one.

now, when a client sends a POST request, in the body he sends also the url to shorten, the server will generate an entry in a map to persist the
original url with the new url (e.g "example.com" will be saved in the server's map as "example.com" : "http://localhost:5000/3h1h9sdh21")
the server will generate a short url, and he's assuring that theres no duplications (the server makes sure that "example.com" and "hello.com" will not be shorten to the same short url -
very small chance that it will happen, but still trying to minimize it even more)
now, the server can return the response of the shorten url via the web socket to the correct client, since the server also saves a map of the clients registered to the websocket.

IMPORTANT:
the server doesnt send immediately the response to the client, he first persist the response in a map, in case the connection to the client is lost so he can resend the message
when the client reconnect to the server - here comes the clientID to action, with the clientID the client can identify himself to the server and receive the pending messages that
he yet to receive.

now, since we're storing the shorten urls in a map, we can easily retreive the original url when another client (or the same one) sends a GET request to receive
the original url.

