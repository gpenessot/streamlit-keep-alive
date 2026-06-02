# streamlit-keep-alive

Keep your Streamlit Cloud app always accessible by automatically reactivating it before it goes dormant.

Streamlit Cloud deactivates unused apps after 24h on the free plan. This cron job runs daily, visits your app, and clicks "Reactivate" if needed — so your portfolio link never shows an error.

> Inspired by [Jean Milpied's probe-action](https://github.com/JeanMILPIED/reparatorAI/tree/main/probe-action), running in production for 3+ years.

---

## How it works

1. **GitHub Actions cron** triggers daily at 9:00 Paris time
2. **Docker** builds an image with Chromium + Puppeteer
3. **probe.js** visits your app URL — if dormant, clicks the reactivation button

## Setup

### 1. Fork or copy this repo into your Streamlit app repo

### 2. Add a GitHub Secret

In your repo: **Settings → Secrets and variables → Actions → New repository secret**

| Name | Value |
|------|-------|
| `APP_URL` | Your Streamlit Cloud URL (e.g. `https://your-app.streamlit.app`) |

### 3. Enable GitHub Actions

The workflow runs automatically every day. To test immediately:  
**Actions → Keep Streamlit App Alive → Run workflow**

## Multiple apps

Duplicate the `probe` job in `keep-alive.yml` and add one secret per app (`APP_URL_1`, `APP_URL_2`, ...).

## Stack

- [GitHub Actions](https://docs.github.com/en/actions) — free CI/CD
- [Puppeteer](https://pptr.dev/) — headless browser automation
- [ghcr.io/puppeteer/puppeteer](https://github.com/puppeteer/puppeteer/tree/main/docker) — official Docker image with Chromium

## License

MIT
