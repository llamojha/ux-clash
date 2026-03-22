# PRD Canvas


### Nombre del producto
**UX Clash**

### Executive Summary
UX Clash es una arena competitiva de diseño/código donde devs, diseñadores y estudiantes resuelven retos diarios y semanales creando interfaces con **HTML + CSS/Tailwind**, sin JavaScript. Cada submission se renderiza en preview, se publica con enlace compartible y recibe un score híbrido: **50% IA con rúbrica** y **50% señal social**. El foco del MVP es experiencia, claridad del loop y shareability.

### Problema
La mayoría de productos para practicar UI/UX son:
- demasiado teóricos,
- demasiado complejos,
- poco competitivos,
- o no generan portafolio/social proof.

Hace falta una experiencia más inmediata: diseñar, publicar, comparar y competir.

### Oportunidad
Convertir práctica de UI/UX en un formato:
- competitivo,
- visual,
- shareable,
- fácil de entender,
- y centrado en criterio profesional realista.

### Usuarios objetivo
- **Devs frontend**
- **Diseñadores junior/mid**
- **Estudiantes de producto/diseño**
- Público secundario: founders con interés en UI

### Job to be done
“Quiero practicar diseño de interfaces en contextos realistas, ver cómo se compara mi trabajo con otros y ganar visibilidad/ranking.”

### Propuesta de valor
**Diseña una interfaz para un reto real, publícala, compite y demuestra tu criterio de UX/UI.**

### Flujo principal
1. Ver reto diario o semanal
2. Abrir editor
3. Escribir HTML y CSS/Tailwind
4. Ver preview en tiempo real
5. Hacer submit
6. Obtener score IA
7. Recibir señal social
8. Subir en leaderboard
9. Compartir entry por enlace

### Funcionalidades MVP
- retos manuales
- editor con HTML + CSS/Tailwind
- preview a la derecha
- retos mobile, desktop o ambos
- login para submit
- login para interacción social
- leaderboard por reto
- página de entry shareable
- score IA con rúbrica
- score social simple
- histórico básico de submissions por usuario

### Requisitos funcionales
- permitir crear submission solo con HTML y CSS/Tailwind
- bloquear JavaScript e imports externos inseguros
- renderizar preview del submission
- capturar snapshot de la entry
- guardar score IA por criterios
- guardar score social
- mostrar ranking por reto
- exponer URL pública de cada submission
- soportar retos con plantilla o sin plantilla

### Requisitos no funcionales
- experiencia rápida y limpia
- editor usable en desktop
- render seguro del HTML/CSS
- sistema simple de auth
- persistencia fiable en DB self-hosted

### Dependencias técnicas
- frontend/editor
- runtime de Tailwind en sandbox
- sistema de auth
- DB self-hosted
- servicio de scoring IA
- renderer/screenshot

### Success Metrics
- número de submissions por reto
- porcentaje de usuarios que hacen submit tras abrir editor
- número medio de votos/likes por submission
- porcentaje de submissions compartidas
- retención a reto siguiente
- tiempo medio hasta primer submit

### Riesgos
- score social poco fiable si solo hay likes
- scoring IA inconsistente
- sandbox/render problemático
- retos flojos generan submissions flojas
- spam o cuentas basura si auth es débil

### Open Questions
- peso exacto futuro entre IA y social
- si el sistema social debe evolucionar a A/B voting
- si habrá leaderboard global fuerte o solo por reto
- cuánto control CSS libre se permitirá a largo plazo

---

