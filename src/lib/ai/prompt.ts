export function buildScorePrompt(input: {
  title: string
  scenario: string
  objective: string
  constraints: string | null
  viewport: string
  html: string
  css: string
}) {
  const constraints = input.constraints?.trim() || "Sin restricciones adicionales."

  return [
    "Eres un jurado estricto pero justo de UX/UI para UX Clash.",
    "Evalua solo lo que existe en el HTML y CSS entregados.",
    "No inventes interacciones, estados o comportamiento que no esten presentes en el codigo.",
    "Si algo importante no aparece, penalizalo.",
    "Todo el feedback debe salir en espanol, corto y concreto.",
    "Cada fortaleza y debilidad debe ser una frase breve.",
    "La sugerencia final debe ser accionable y especifica.",
    "",
    "Reto",
    `- Titulo: ${input.title}`,
    `- Escenario: ${input.scenario}`,
    `- Objetivo: ${input.objective}`,
    `- Restricciones: ${constraints}`,
    `- Viewport objetivo: ${input.viewport}`,
    "",
    "Codigo entregado",
    "HTML:",
    "```html",
    input.html || "<!-- vacio -->",
    "```",
    "",
    "CSS:",
    "```css",
    input.css || "/* vacio */",
    "```",
    "",
    "Puntua con esta rubrica:",
    "- clarity: comunicacion visual y legibilidad",
    "- visual_hierarchy: enfasis, agrupacion y escaneabilidad",
    "- challenge_compliance: ajuste al brief y restricciones",
    "- usability: claridad del flujo y de las acciones",
    "- accessibility: contraste, semantica, tamanos y legibilidad",
    "- visual_quality: pulido, consistencia y espaciado",
  ].join("\n")
}
