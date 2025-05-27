# Lean Traefik config example with Docker Compose

The monorepo style is for the sake of demonstration.

Outside this example, use an dedicated repo and local directory to Traefik.

### Goals

- [x] Traefik dashboard running on http://localhost for local development
- [x] Static HTML Docker Compose example running on http://static-site.localhost
- [x] Node project running on http://node.localhost
- [x] Laravel project running on http://laravel.localhost
- [x] Rails project running on http://rails.localhost
- [ ] Get Traefik dashboard running on https://localhost with self-signed certificates to mimic production environment

### How to run only Traefik and WhoAmI

```sh
docker network create traefik-proxy
```

```sh
docker compose -f traefik/compose.yaml
```

* To open Traefik dashboard: `open http://localhost` (Traefik dashboard will be shown)
* To open WhoAmI: `open http://whoami.localhost` (Browser's information will be shown)

### How to run everything

```sh
docker compose -f traefik/compose.yaml up -d
docker compose -f static/compose.yaml up -d
docker compose -f node/compose.yaml up -d
docker compose -f laravel/compose.yaml up -d
docker compose -f rails/compose.yaml up -d
```

### Throubleshotting

* All `compose.yaml` must be in the same `traefik-proxy` network.
* All `compose.yaml` nginx service must have `traefik.enable=true` label.
* When testing HTTPS/SSL/TLS, ensure Chrome is not using automatic/cached redirects from http to https.
* Use `curl -v http://localhost` as a debug tool if necessary.

### References

* https://doc.traefik.io/traefik/getting-started/quick-start/
* https://doc.traefik.io/traefik/reference/static-configuration/cli/

### Laravel Only

##### Make sure to customize `laravel/.env` with:

```
APP_HOST=laravel.localhost
APP_URL=http://${APP_DOMAIN}

LOG_CHANNEL=stderr
```

### Self-signed certificates for development

##### Create certificate

```sh
mkdir -p traefik/certs
openssl req -x509 -newkey rsa:4096 -nodes -days 365 \
  -keyout traefik/certs/localhost.key \
  -out traefik/certs/localhost.cert \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,DNS:whoami.localhost,DNS:node.localhost,DNS:laravel.localhost,DNS:rails.localhost"
```

##### Add to macOS Keychain

```sh
sudo security add-trusted-cert \
  -d \
  -r trustRoot \
  -k /Library/Keychains/System.keychain \
  traefik/certs/localhost.cert
```

##### Check if is valid

```sh
security verify-cert -c traefik/certs/localhost.cert
```

```sh
echo | openssl s_client \
  -showcerts \
  -servername localhost \
  -connect localhost:443 2>/dev/null | openssl x509 -inform pem -noout -text
```

```sh
curl https://localhost
```
