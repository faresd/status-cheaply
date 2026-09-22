# status.cheaply.fr

Independent public status application for Cheaply. It renders one line per application and derives status from provider evidence instead of inventing uptime:

- Cloudflare Workers/Pages health and deployment evidence.
- Google Cloud Run/Functions/Firebase health and serving revisions.
- GitHub repository metadata and Actions deployment signals.

The first release is deliberately read-only and public. Provider credentials must be stored as Cloudflare Worker secrets; never expose tokens to the browser. An application is operational only when every configured provider check is fresh and healthy, outage when a fresh check fails, and monitoring when evidence is missing or stale.

Before production: configure provider secrets, add the custom domain, run CI, and verify the six application rows from a private browser session.
