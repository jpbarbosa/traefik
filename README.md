# Lean Traefik config example with Docker Compose

The monorepo style is for demonstration purposes.

Outside this example, use a dedicated repo and local directory for Traefik.

### Goals

- [x] Traefik dashboard running on http://localhost for local development
- [x] Static HTML Docker Compose example running on http://static-site.localhost
- [x] Node project running on http://node.localhost
- [x] Laravel project running on http://laravel.localhost
- [x] Rails project running on http://rails.localhost
- [ ] Get the Traefik dashboard running on https://localhost with self-signed certificates to mimic a production environment

### How to run only Traefik and WhoAmI

```sh
docker network create traefik-proxy
```

```sh
docker compose -f traefik/compose.yaml
```

* Traefik dashboard: `open http://localhost` (Traefik dashboard will be shown)
* WhoAmI example: `open http://whoami.localhost` (Browser's information will be shown)

### How to run everything

```sh
docker compose -f traefik/compose.yaml up -d
docker compose -f static/compose.yaml up -d
docker compose -f node/compose.yaml up -d
docker compose -f laravel/compose.yaml up -d
docker compose -f rails/compose.yaml up -d
```

### Troubleshooting

* All `compose.yaml` files must be in the same `traefik-proxy` network.
* All `compose.yaml` nginx services must have the `traefik.enable=true` label.
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
