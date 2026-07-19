---
title: Wiring a Personal Site with Hostinger, Cloudflare, Vercel & R2
slug: site-wiring
date: 2026-02-05
category: infra
topic: compsci
keyTakeaway: Each service does one job well. Hostinger holds the domain, Cloudflare runs DNS, Vercel hosts the app, R2 stores media.
summary: mossyrealm.space → Cloudflare → Vercel. media.mossyrealm.space → R2. Most of the work is waiting for nameserver propagation.
tags:
  - dns
  - cloudflare
  - vercel
  - r2
  - infra
related:
  - audio-player-refactor
---

First time I set up a custom domain was back in high school. Spent almost two days trying to figure out nameservers, DNS records, and why nothing was working. During undergrad I did it a few more times but it's been a while since I dealt with frontend infrastructure from scratch.

<div class="learning-diagram">
  <img src="/images/blog/site-wiring-diagram.png" alt="Site wiring diagram showing Hostinger, Cloudflare, Vercel, and R2 connections" width="1200" height="700" />
</div>

The idea is simple: each service does one thing well. Hostinger just holds my domain registration. Cloudflare handles DNS and security. Vercel runs the actual website. R2 stores media files. No service tries to do everything.

> "Most of the work is just waiting for nameservers to propagate. The rest is clicking buttons."

### the stack:

- **Hostinger**: registrar only, owns the domain record
- **Cloudflare**: DNS, TLS, edge routing, R2 storage
- **Vercel**: production hosting for the Next.js frontend
- **R2**: object storage for static/media assets

### the flow:

```
mossyrealm.space → cloudflare dns → vercel frontend
media.mossyrealm.space → cloudflare dns → r2 storage
```

### key steps:

1. Register domain on Hostinger
2. Add domain to Cloudflare, get new nameservers
3. Switch nameservers at Hostinger to Cloudflare's
4. Wait for DNS propagation (Cloudflare polls for it)
5. Set up R2 bucket with custom subdomain (media.)
6. Connect root domain to Vercel project

### why no www:

I didn't want www.mossyrealm.space. Just mossyrealm.space. Looked it up and turns out the www prefix is a relic from the early web when it helped distinguish web servers from mail or ftp servers on the same domain. These days it's unnecessary. Modern DNS and hosting handle the apex domain (the "naked" domain without www) just fine.

Both Cloudflare and Vercel support apex domains cleanly. It's purely a preference thing. I think mossyrealm.space looks cleaner in the address bar.
