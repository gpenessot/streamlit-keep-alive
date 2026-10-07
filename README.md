# Streamlit Keep Alive

A GitHub Action that wakes up sleeping Streamlit Community Cloud apps and keeps them awake, so your portfolio link never lands on a sleep page.

Streamlit Community Cloud puts every app to sleep after 12 hours without traffic. A visitor then sees *"Zzzz. This app has gone to sleep due to inactivity"* and has to click a button and wait. This action visits your apps on a schedule with a headless browser, and clicks *"Yes, get this app back up!"* when an app is asleep.

> Inspired by [Jean Milpied's probe-action](https://github.com/JeanMILPIED/reparatorAI/tree/main/probe-action).

---

## Usage

Add this file to any repository, for example `.github/workflows/keep-alive.yml`:

```yaml
name: Keep Streamlit apps awake

on:
  schedule:
    - cron: '0 */8 * * *'   # every 8 hours, well under the 12-hour sleep delay
  workflow_dispatch:         # lets you run it by hand from the Actions tab

jobs:
  keep-alive:
    runs-on: ubuntu-latest
    steps:
      - uses: gpenessot/streamlit-keep-alive@v1
        with:
          app-urls: |
            https://your-app.streamlit.app
            https://your-other-app.streamlit.app
```

That's it. To test right away: **Actions → Keep Streamlit apps awake → Run workflow**.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `app-urls` | yes | | One or more app URLs, one per line or comma separated |
| `timeout` | no | `60` | Seconds allowed to load an app, and again to wake it up |

Each run writes a status table (`awake`, `woken up` or `failed`) to the job summary. The job fails if any app could not be woken up, so GitHub notifies you.

## How it works

1. The action builds a Docker image with Chromium and [Puppeteer](https://pptr.dev/).
2. For each URL, it loads the page and looks for the sleep message.
3. Only if the sleep message is there, it clicks the wake-up button and waits for the app to come back. Buttons inside an awake app are never clicked.

## Good to know

- **GitHub disables scheduled workflows in public repositories after 60 days without activity.** Put the workflow in a repository you push to regularly, or re-enable it from the Actions tab when GitHub warns you.
- Scheduled runs can start a few minutes late when GitHub Actions is busy. Every 8 hours leaves plenty of margin.
- Each run uses a few minutes of Actions time, mostly to build the image. Public repositories run for free.

## Going further

Community Cloud is fine for a portfolio. For an app your team relies on (authentication, Docker, CI/CD, your own server), see [Streamlit Unleashed](https://www.mes-formations-data.fr/formation/streamlit-unleashed?utm_source=github&utm_medium=readme&utm_campaign=streamlit-keep-alive), a course in French by the author of this action.

## License

MIT
