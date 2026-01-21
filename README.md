# forum-gateway-service

## Environment Variables

### Local Development

Create a `.env` file in the root directory with the following:

```
JWT_SECRET=your-secret-key-here
LOG_LEVEL=info
NODE_ENV=development
```

### Docker

When running in Docker, pass environment variables using the `-e` flag or an env file:

```bash
docker run -p 8080:8080 -e JWT_SECRET=your-secret-key-here -e LOG_LEVEL=info forum-gateway
```

Or use an env file:

```bash
docker run -p 8080:8080 --env-file .env forum-gateway
```

**Environment Variables:**
- `JWT_SECRET`: Must match the secret used by the User Service for signing JWT tokens (required)
- `LOG_LEVEL`: Logging level (debug, info, warn, error). Defaults to `info` (optional)
- `NODE_ENV`: Environment mode (development, production). Defaults to `development` (optional)

## Configuration

The gateway is configured with two pipelines:

- **Public Pipeline**: Routes that bypass JWT verification
  - `/users/login`
  - `/users/register`
  - `/contactus`

- **Protected Pipeline**: Routes that require JWT verification
  - `/home`
  - `/users/*/profile`
  - `/posts/*`
  - `/messages`
  - `/users`

Protected routes require an `Authorization: Bearer <token>` header. The gateway verifies the JWT and forwards user claims as headers to backend services:
- `X-User-Id`
- `X-User-Type`
- `X-Verified-Status`