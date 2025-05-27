# Lean Traefik config example with Docker Compose

The monorepo style is for the sake of demonstration.

Outside this example, use an dedicated repo and local directory to Traefik.

### Goals

- [x] Traefik dashboard running on http://localhost for local development
- [ ] Static HTML Docker Compose sample project running on http://static-site.localhost
- [ ] Node project running on http://node.localhost
- [ ] Rails project running on http://rails.localhost
- [ ] Laravel project running on http://laravel.localhost
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
```

### Throubleshotting

* All `compose.yaml` must be in the same `traefik-proxy` network.
* All `compose.yaml` nginx service must have `traefik.enable=true` label.
* When testing HTTPS/SSL/TLS, ensure Chrome is not using automatic/cached redirects from http to https.
* Use `curl -v http://localhost` as a debug tool if necessary.

### References

* https://doc.traefik.io/traefik/getting-started/quick-start/
* https://doc.traefik.io/traefik/reference/static-configuration/cli/
