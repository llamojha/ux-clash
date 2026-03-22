import DOMPurify from "isomorphic-dompurify"

/** Sanitize user HTML — strips scripts, event handlers, dangerous tags */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    FORBID_TAGS: ["script", "iframe", "object", "embed", "form"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur"],
  })
}

/** Strip @import and external url() references from CSS */
export function sanitizeCss(css: string): string {
  return css
    .replace(/@import\b[^;]*;/gi, "")
    .replace(/url\s*\(\s*['"]?https?:\/\/[^)]*\)/gi, "url()")
}
