# HTTP Status Codes and Their Meanings

## 1xx: Informational Responses
- **100 Continue**: The server received the initial part of the request, and the client can continue the request.
- **101 Switching Protocols**: The server is switching protocols as requested by the client.
- **102 Processing**: The server has received and is processing the request (WebDAV).

## 2xx: Success
- **200 OK**: The request was successful, and the server has returned the requested resource.
- **201 Created**: The request was successful, and a new resource has been created as a result.
- **202 Accepted**: The request has been received but not yet processed.
- **203 Non-Authoritative Information**: The request was successful, but the information may be from a third-party source.
- **204 No Content**: The request was successful, but no content is returned.
- **205 Reset Content**: The request was successful, but the client should reset the document view.
- **206 Partial Content**: The server is delivering only part of the resource (used for partial downloads).

## 3xx: Redirection
- **300 Multiple Choices**: The client can choose from multiple options for the resource.
- **301 Moved Permanently**: The resource has been permanently moved to a new URL.
- **302 Found**: The resource is temporarily at a different URL.
- **303 See Other**: The client should use GET to fetch the resource from a different URL.
- **304 Not Modified**: The resource hasn’t changed since the last request (used for caching).
- **307 Temporary Redirect**: The resource is temporarily at a different URL, and the method remains unchanged.
- **308 Permanent Redirect**: The resource has moved to a new URL, and the method remains unchanged.

## 4xx: Client Errors
- **400 Bad Request**: The server could not understand the request due to invalid syntax.
- **401 Unauthorized**: Authentication is required or has failed.
- **403 Forbidden**: The client does not have access rights to the resource.
- **404 Not Found**: The server cannot find the requested resource.
- **405 Method Not Allowed**: The request method is known by the server but is not supported by the target resource.
- **406 Not Acceptable**: The server cannot provide a response matching the request's Accept headers.
- **407 Proxy Authentication Required**: Authentication with the proxy is required.
- **408 Request Timeout**: The server timed out waiting for the request.
- **409 Conflict**: The request could not be processed because of a conflict in the request.
- **410 Gone**: The requested resource is no longer available and will not be available again.
- **411 Length Required**: The server requires the Content-Length header to be specified.
- **412 Precondition Failed**: The server does not meet one or more preconditions in the request headers.
- **413 Payload Too Large**: The request entity is too large for the server to process.
- **414 URI Too Long**: The URI provided was too long for the server to process.
- **415 Unsupported Media Type**: The media format of the requested data is not supported by the server.
- **416 Range Not Satisfiable**: The range specified by the Range header field in the request cannot be fulfilled.
- **417 Expectation Failed**: The server cannot meet the expectations set by the Expect header in the request.

## 5xx: Server Errors
- **500 Internal Server Error**: A generic error occurred on the server.
- **501 Not Implemented**: The server does not support the functionality required to fulfill the request.
- **502 Bad Gateway**: The server, while acting as a gateway, received an invalid response from an upstream server.
- **503 Service Unavailable**: The server is temporarily unavailable due to overload or maintenance.
- **504 Gateway Timeout**: The server did not receive a timely response from the upstream server.
- **505 HTTP Version Not Supported**: The server does not support the HTTP version used in the request.

