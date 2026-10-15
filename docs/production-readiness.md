# Local production review · 15 October 2026

The site remains local. No deployment, push, external form submission, or analytics service was configured.

## Changes in this pass

- Rebalanced inner-page heroes into responsive text and diagram columns. GPU pages explain compute, memory, and interconnect; About connects architecture, deployment, and support. Solutions, Services, Resources, Contact, and capacity requests have relevant selectable diagrams.
- All new motion respects the global pause control and system reduced-motion preference.
- Fixed desktop menus closing on the first click after hover. Escape returns focus to the correct trigger; Arrow Down opens a dropdown and focuses its first link. Mobile links close the menu after navigation.
- Motion toggles no longer rerun route scrolling. Malformed URL fragments are harmless. Resuming visual effects does not replay a completed headline.
- Added an application error recovery screen, JavaScript-disabled contact fallback, table captions, and earlier theme-color initialization.
- Updated React Router to 7, Vite to 7, its React plugin to 5, and Tailwind to 4 with its PostCSS plugin, retaining the existing design tokens. Removed unused Autoprefixer. The final npm audit reports zero known vulnerabilities, including development dependencies.
- Added static route-specific titles, descriptions, and Open Graph metadata for all 20 public routes. The 404 document and runtime not-found page use noindex. This is a client-rendered SPA, not server-rendered content.
- Added a Permissions-Policy to the existing hosting configuration. Existing framing, MIME-sniffing, referrer, and hashed-asset cache headers remain configured there.
- Corrected H100 PCIe memory to HBM2e using [NVIDIA’s product specification](https://www.nvidia.com/content/dam/en-zz/Solutions/gtcs22/data-center/h100/PB-11133-001_v01.pdf). Removed unsupported deployment-ranking and rack-footprint claims. GPU reference figures still require confirmation against the particular system and variant quoted.

## Validation

GPU corrections also follow [NVIDIA’s HGX reference architecture](https://docs.nvidia.com/enterprise-reference-architectures/hgx-ai-factory-h100-h200-b200/latest/components.html), [GB200 system specifications](https://www.nvidia.com/en-us/data-center/gb200-nvl72/), and the manufacturer pages for [H200](https://www.nvidia.com/en-us/data-center/h200/), [A100](https://www.nvidia.com/en-us/data-center/a100/), and [L40S](https://www.nvidia.com/en-us/data-center/l40s/). These correct HGX B200 memory/topology, GB200 memory/throughput, H200 NVL FP8, A100 FP64 and 40GB memory type, and L40S sparse tensor peaks. The displayed specification tables link to their primary sources.

- Production build and automated content/data/calculation/request/route-metadata checks pass.
- 170 automated checks pass. Canonical URLs, social image URLs, the 20-route sitemap, and invalid-origin rejection also pass in an isolated build fixture. The dependency lockfile passes an offline installation dry run.
- Browser inspection covered every public route at desktop width and at 320px. No document overflow, broken images, missing H1 headings, or broken internal route/fragment targets were found. Scrolling tables and the intentionally clipped marquee remain contained.
- Reviewed the new About and H100 heroes in both themes, diagram selection on mobile, first-click dropdown opening, Escape focus restoration, mobile navigation, and GPU-to-request prefill.
- Reviewed a local H200 brief with synthetic example contact details. It retained GPU, quantity, and region and displayed the explicit unsent status. No WhatsApp/email message was sent.
- Confirmed a native click on the motion control retained scroll position and paused the diagram keyframes.
- Legacy marketplace URLs redirect to GPU offerings. Unknown routes are marked noindex; malformed fragments and inherited-object GPU slugs do not crash the app. Trailing slashes preserve metadata for static hosts.

## Launch configuration still belongs to a real launch

Use Node **22.12 or newer**, then `npm ci`, `npm run build`, and `npm test`.

When a public HTTPS hostname is confirmed, set the build environment variable `SITE_URL` to that origin, then build again. The build emits canonical URLs, Open Graph image URLs, a sitemap, and its robots reference. No public hostname is assumed in local builds. Browser metadata updates on navigation share the same source as the generated route documents.

Host `dist/` with direct-file routing before the SPA fallback. Apply the configured security headers in the chosen host; Vite preview does not apply Netlify headers. Verify HTTPS, the selected hostname, direct route requests, and real email/WhatsApp delivery in that environment before launch. This review did not perform a live-host performance test or certify a WCAG conformance level.

Updated 16 October: capacity requests now support Netlify Forms after review and contact consent on production Netlify builds. Local previews remain unsent, with email/copy/download/WhatsApp fallbacks. Configure Netlify form detection and a submission email notification to hello@anthroprime.com before launch; see [form-email-setup.md](form-email-setup.md). No deployment, account setting change, or live email test was performed. CRM integration and live inventory remain outside this implementation. Contact details, entity details, offered configurations, and business commitments should be confirmed by Anthroprime before publication.
