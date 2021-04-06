#### Websocket-Example in Node.js

**Entities connected**
- Client
- Server

The connection is established and data is transferred back and forth, no overhead in passage flow.

##### Deductions

A Global variable retains its value from the time of connection establishment till connection termination. This example achieves the above statement and check out the code for better understanding

Package used is `websocket`

##### Example

Here Server declares an array **[1,2,3,4,5]** and sends first element **(1)** to the Client and then on receiving the data from the server, the client does some processing like here in this case, multiplies the incoming data by **2**, hence **(1\*2) = (2)** and transmits back the result to the server to mutate the original array.

Hence, now the server receives the data from client (2) and then it mutates the array [**1**,2,3,4,5] => [**2**,2,3,4,5] and then returns the array as payload to the client side. **[2,2,3,4,5]**