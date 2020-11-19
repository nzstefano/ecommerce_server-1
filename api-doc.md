# hacktiv-jokes-server

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /loginCustomer`
- `GET /products`

<!-- - `GET /jokes/random`
- `POST /jokes`
- `POST /favourites`
- `GET /favourites` -->

### POST /register

description:
  register for customer

Request:

- data:

```json
{
  "username": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "email": "string",
  "role": "string"
}
```

Response:

- status: 400
- body:
  ​

```json
{
  "message": "Email already registered"
}
```

### POST /login

description:
  login for admin

Request:

- data:

```json
{
  "username": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "string"
}
```

Response:

- status: 400
- body:
  ​

```json
{
  "message": "Invalid email/password"
}
```

### POST /loginCustomer

description:
  login for customer

Request:

- data:

```json
{
  "username": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "string"
}
```

Response:

- status: 400
- body:
  ​

```json
{
  "message": "Invalid email/password"
}
```

### GET /products

description: 
  get product list from server

Response:

- status: 200
- body:

```json
{
    "products": [
        {
            "id": 1,
            "name": "Cheetos",
            "image_url": "https://images-na.ssl-images-amazon.com/images/I/91dl7O-wxhL._SL1500_.jpg",
            "price": 5000,
            "stock": 100,
            "createdAt": "2020-11-18T03:57:15.246Z",
            "updatedAt": "2020-11-18T03:57:15.246Z"
        },
        {
            "id": 2,
            "name": "Lays",
            "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/6/19/8812651/8812651_f36807a7-f4be-43cf-ab9c-ae8ceb7394bf_893_893.jpg",
            "price": 6000,
            "stock": 90,
            "createdAt": "2020-11-18T03:57:15.246Z",
            "updatedAt": "2020-11-18T03:57:15.246Z"
        }
    ]
}
```

### POST /products

description:
  adding new product (only for admin)

Request:

- headers: token (string)

- data:

```json
{
  "name": "Zeki",
  "image_url": "https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/11/23/3473756/3473756_48a8b1ec-29b7-457a-bf00-394300d8381d_598_598.jpg",
  "price": 2000,
  "stock": 50
}
```

Response:

- status: 401
- body:
  ​

```json
{
  "message": "Invalid email/password"
}
```

​Response:

- status: 201
- body:
  ​

```json
{
    "joke": {
        "id": 11,
        "category": "Miscellaneous",
        "setup": "ikan ikan apa yang berhenti?",
        "delivery": "Ikan Pause, hiya hiya",
        "updatedAt": "2020-05-18T05:02:29.398Z",
        "createdAt": "2020-05-18T05:02:29.398Z"
    }
}
```
​

### POST /favourites

description: 
  add a joke to user favourite

Request:

- headers: token (string)

- data:

```json
{
  "JokeId": number
}
```

Response:

- status: 201
- body:

```json
{
    "favourite": {
        "id": number,
        "UserId": number,
        "JokeId": number,
        "updatedAt": "2020-05-18T05:11:57.044Z",
        "createdAt": "2020-05-18T05:11:57.044Z"
    }
}
```

### GET /favourites

description: 
  show current user favourite jokes

Request:

- headers: token (string)

Response:

- status: 200
- body:

```json
{
    "favourites": [
        {
            "id": 1,
            "Joke": {
                "id": 11,
                "category": "Miscellaneous",
                "setup": "ikan ikan apa yang berhenti?",
                "delivery": "Ikan Pause, hiya hiya",
                "createdAt": "2020-05-18T05:02:29.398Z",
                "updatedAt": "2020-05-18T05:02:29.398Z"
            }
        },
        {
            "id": 2,
            "Joke": {
                "id": 7,
                "category": "Miscellaneous",
                "setup": "Ayam ayam apa yang luas?",
                "delivery": "Ayam semesta",
                "createdAt": "2020-05-18T04:18:49.689Z",
                "updatedAt": "2020-05-18T04:18:49.689Z"
            }
        }
    ]
}
```
​

