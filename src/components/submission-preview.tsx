import { sanitizeHtml, sanitizeCss } from "@/lib/sanitize"

function buildSrcdoc(html: string, css: string) {
  const safe = sanitizeHtml(html)
  const safeCss = sanitizeCss(css)
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script src="https://unpkg.com/@tailwindcss/browser@4"><\/script>
<style>${safeCss}</style>
</head>
<body>${safe}</body>
</html>`
}

const IFRAME_SIZE = {
  mobile: "h-[812px] w-[375px] scale-[0.25]",
  desktop: "h-[800px] w-[1280px] scale-[0.2]",
}

export function SubmissionPreview({ html, css, viewport = "desktop" }: { html: string; css: string; viewport?: string }) {
  const size = viewport === "mobile" ? IFRAME_SIZE.mobile : IFRAME_SIZE.desktop
  return (
    <div className="bg-muted relative h-32 w-full overflow-hidden rounded-md">
      <iframe
        srcDoc={buildSrcdoc(html, css)}
        sandbox="allow-scripts"
        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${size}`}
        title="Vista previa"
        loading="lazy"
      />
    </div>
  )
}
