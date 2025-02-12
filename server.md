utilisation de JWT pour authentification


https://datatracker.ietf.org/doc/html/rfc6749.html



lors de l'authentification au serveur, celui-ci délivre 2 token:
- un token d'accès dont la validité est courte stocké dans un cookie ou le localstorage
- un token de renouvellement dont la validité est plus longue mais inaccessible par le client (http-only)



requete d'une resource avec un token d'accès (type bearer)
```
    GET /resource/1 HTTP/1.1
    Host: example.com
    Authorization: Bearer mF_9.B5f-4.1JqM
``` 



exemple de requete client avec un refresh token:

```
    POST /token HTTP/1.1
    Host: server.example.com
    Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
    Content-Type: application/x-www-form-urlencoded
    grant_type=refresh_token&refresh_token=tGzv3JOkF0XG5Qx2TlKWIA
```

```
Refresh tokens are credentials used to obtain access tokens.  Refresh
tokens are issued to the client by the authorization server and are
used to obtain a new access token when the current access token
becomes invalid or expires, or to obtain additional access tokens
with identical or narrower scope (access tokens may have a shorter
lifetime and fewer permissions than authorized by the resource
owner).  Issuing a refresh token is optional at the discretion of the
authorization server.  If the authorization server issues a refresh
token, it is included when issuing an access token (i.e., step (D) in
Figure 1).

A refresh token is a string representing the authorization granted to
the client by the resource owner.  The string is usually opaque to
the client.  The token denotes an identifier used to retrieve the
authorization information.  Unlike access tokens, refresh tokens are
   intended for use only with authorization servers and are never sent
   to resource servers.

  +--------+                                           +---------------+
  |        |--(A)------- Authorization Grant --------->|               |
  |        |                                           |               |
  |        |<-(B)----------- Access Token -------------|               |
  |        |               & Refresh Token             |               |
  |        |                                           |               |
  |        |                            +----------+   |               |
  |        |--(C)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(D)- Protected Resource --| Resource |   | Authorization |
  | Client |                            |  Server  |   |     Server    |
  |        |--(E)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(F)- Invalid Token Error -|          |   |               |
  |        |                            +----------+   |               |
  |        |                                           |               |
  |        |--(G)----------- Refresh Token ----------->|               |
  |        |                                           |               |
  |        |<-(H)----------- Access Token -------------|               |
  +--------+           & Optional Refresh Token        +---------------+

               Figure 2: Refreshing an Expired Access Token

   The flow illustrated in Figure 2 includes the following steps:

   (A)  The client requests an access token by authenticating with the
        authorization server and presenting an authorization grant.

   (B)  The authorization server authenticates the client and validates
        the authorization grant, and if valid, issues an access token
        and a refresh token.

   (C)  The client makes a protected resource request to the resource
        server by presenting the access token.

   (D)  The resource server validates the access token, and if valid,
        serves the request.

   (E)  Steps (C) and (D) repeat until the access token expires.  If the
        client knows the access token expired, it skips to step (G);
        otherwise, it makes another protected resource request.

   (F)  Since the access token is invalid, the resource server returns
        an invalid token error.
```