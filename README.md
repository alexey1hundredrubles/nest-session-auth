## Simple session based auth with NestJS and MongoDB

#### Running the app in Docker

```bash
docker-compose up
```

#### API:
#### Sign up
**POST https://localhost:3000/auth/sign-up**
Body
```json
{
    "login": "login123",
    "password": "password123"
}
```
#### Sign in
**POST https://localhost:3000/auth/sign-in**
Body:
```json
{
    "login": "login123", 
    "password": "password123"
}
```
Response:
```json
{
    "sessionId": "ca429b69-9fee-4795-8eee-9621759bf0f1"
}
```
Then sessionId is used in "Authorization" header:<br>
Authorization: Bearer ca429b69-9fee-4795-8eee-9621759bf0f1
#### Sign out(remove current session)
**POST https://localhost:3000/auth/sign-out**

#### Get my session(if exists)
**GET https://localhost:3000/session/me**
Response
```json
{
    "_id": "64fd98de02cb9105d268ada2",
    "userId": "64fd9655332c628232147093",
    "sessionUUID": "20aa1e52-379b-49a3-bfc4-98cc5947dbcd",
    "userAgent": "PostmanRuntime/7.32.3",
    "expiredAt": "2023-10-10T10:22:22.738Z",
    "createdAt": "2023-09-10T10:22:22.738Z",
    "__v": 0
}
```

