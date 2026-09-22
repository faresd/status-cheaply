# status.cheaply.fr

Independent public status application for Cheaply. It renders one line per application and derives status from
provider evidence instead of inventing uptime:

- Cloudflare Workers/Pages health and deployment evidence.
- Google Cloud Run/Functions/Firebase health and serving revisions.
- GitHub repository metadata and Actions deployment signals.

The first release is deliberately read-only and public. Provider credentials must be stored as Cloudflare Worker
secrets; never expose tokens to the browser. An application is `operational` only when every configured provider
check is fresh and healthy, `outage` when a fresh check fails, and `monitoring` when evidence is missing or stale.
Maintain links to this app using `PUBLIC_STATUS_URL=https://status.cheaply.fr`.

Required Worker secrets/vars for live evidence: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`,
`GOOGLE_PROJECT_IDS`, `GOOGLE_ACCESS_TOKEN`, `GITHUB_OWNER`, and `GITHUB_TOKEN`. Configure the `status.cheaply.fr`
custom domain only after the tagged deployment passes its health check; the public page itself never receives these
credentials.

Before production: create the GitHub repository, configure provider secrets, add the custom domain, run CI, and verify
the six application rows from a private browser session. No Maintain or authentication production setting is changed
by this source-only scaffold.
