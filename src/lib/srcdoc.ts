import { sanitizeHtml, sanitizeCss } from "@/lib/sanitize"

export function buildSrcdoc(html: string, css: string) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script src="https://unpkg.com/@tailwindcss/browser@4"><\/script>
<style>${sanitizeCss(css)}</style>
</head>
<body style="background:#fff">${sanitizeHtml(html)}</body>
</html>`
}
