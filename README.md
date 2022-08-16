# meme_duel

Hektor ist eine schwule sau und muss abnehmen

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

## Dont forget to add yout own IP in a ./config/config.json file
```json
{
    "port":"3000",
    "hostIP":"172.20.10.4"
}
```

## List of required payload for different Endpoints
### PUT /login
#### req.body:
```json
{
    "username": "myUsername",
    "pw": "myPw"
}
```
#### res.json:
```json
{
    "loginSucess": false,
    "Data": {},
    "errorOccurred": false,
    "errorMessage": "Unknown Error occurred!",
}
```
### POST /registerPlayer
#### req.body
```json
{
    "username": "myUsername",
    "email": "myEmail",
    "pw": "myPw"               
}
```
#### res.body
```json
{

}
```
