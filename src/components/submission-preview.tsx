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

export function SubmissionPreview({ html, css }: { html: string; css: string }) {
  return (
    <div className="bg-muted relative h-32 w-full overflow-hidden rounded-md">
      <iframe
        srcDoc={buildSrcdoc(html, css)}
        sandbox=""
        className="pointer-events-none h-[640px] w-[480px] origin-top-left scale-[0.25]"
        title="Vista previa"
        loading="lazy"
      />
    </div>
  )
}
