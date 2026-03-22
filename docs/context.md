# Context / Assumptions Canvas


### Estado actual de definición
- Idea principal definida
- MVP bastante acotado
- Stack orientativo definido
- Loop de producto definido
- Faltan algunos detalles operativos y de ejecución

### Problema que resuelve
Practicar UI/UX suele ser:
- demasiado teórico
- poco competitivo
- poco público
- poco útil para demostrar criterio

### Segmentos objetivo
- devs frontend
- diseñadores
- estudiantes

### Job principal
“Quiero practicar diseño de interfaces en retos realistas, publicar lo que hago y compararme con otros.”

### Propuesta de valor
Competición de diseño/código con retos de interfaz, scoring híbrido y leaderboard público.

### Tipo de producto
- arena de diseño/código
- no editor visual tipo Figma
- no herramienta pura de auditoría UX
- no plataforma de coding interview

### Input del usuario
- HTML en un panel
- CSS/Tailwind en otro
- preview a la derecha

### Restricciones de submission
Permitido:
- HTML
- CSS
- Tailwind

Bloqueado:
- JavaScript
- scripts externos
- imports inseguros
- requests externas
- funcionalidad real de app

### Formato de retos
- daily
- weekly
- 10 retos iniciales manuales
- algunos retos básicos con plantilla
- weekly sin plantilla
- viewport por reto:
  - mobile
  - desktop
  - ambos

### Campos de cada reto
- título
- escenario
- objetivo principal
- restricciones
- viewport cuando aplique

### Scoring confirmado
- **50% IA**
- **50% social**
- scoring IA por rúbrica
- social simplificado con likes

### Rúbrica IA recomendada
- claridad
- jerarquía visual
- cumplimiento del reto
- usabilidad
- accesibilidad básica
- calidad visual/profesional

### Resultado tras submit
Debe mostrar como mínimo:
- preview o snapshot
- score total
- breakdown IA
- score social
- posición en leaderboard
- link shareable

### Layer social
- cada submission debe poder compartirse
- leaderboard por reto
- posible leaderboard global agregado
- la capa social valida percepción de UX/UI

### Auth
Confirmado conceptualmente:
- auth importante por leaderboard
- perfil simple
- identidad mínima del usuario

Recomendado operativamente:
- ver sin login
- abrir editor sin login
- submit con login
- social con login

### Perfil de usuario
Mínimo:
- username
- avatar opcional
- submissions
- score/ranking

### Hosting / infra
- despliegue requerido en CubePath
- DB self-hosted
- posible app full-stack ligera en el mismo server

### Dependencias técnicas clave
- editor web
- sandbox/render del HTML/CSS
- runtime de Tailwind en preview
- auth
- DB
- scoring IA
- snapshots/share pages

### Decisiones de alcance
Incluido en MVP:
- daily + weekly
- 10 retos manuales
- submit y leaderboard
- scoring IA + social
- share links

Fuera de MVP o no priorizado:
- drag and drop
- Figma-lite
- JavaScript en submissions
- moderación manual
- categorías de dificultad
- sistema social complejo
- tiempo real

### Riesgos principales
- likes como señal social poco fiable
- IA inconsistente en algunos casos
- sandbox/render puede romperse
- retos flojos producen resultados flojos
- sin moderación puede haber basura visible

### Supuestos críticos
- el usuario acepta escribir HTML/CSS en vez de usar builder visual
- el scoring IA será suficientemente legible
- el social score aportará validación, no solo ruido
- los retos serán suficientemente buenos para sostener interés
- el formato shareable ayudará a distribución orgánica

### Preguntas aún abiertas
- política exacta de auth final
- fórmula exacta del leaderboard global
- manejo exacto del render/sandbox
- criterio exacto para snapshot público
- si los likes seguirán como score social principal o evolucionarán después

### Métricas MVP
- submissions por reto
- porcentaje de apertura de editor → submit
- likes por submission
- shares por submission
- retorno a siguiente reto
- usuarios con más de una submission

### Canal / distribución
- share links de entries
- leaderboard público
- comunidad del hackathon
- potencial orgánico por diseño visual

### Ventaja inicial
- mezcla clara de:
  - práctica
  - visibilidad
  - competición
  - criterio UX/UI

No compite como herramienta enterprise. Compite como formato memorable.

### Criterio de éxito del MVP
El MVP funciona si logra esto:
- la gente entiende el producto rápido
- envía submissions
- comparte entries
- vuelve a otro reto
- acepta el ranking como razonable

### TL;DR operativo
- producto: design/code arena
- input: HTML + CSS/Tailwind
- scoring: IA + likes
- social: share pages + leaderboard
- retos: 10 manuales, daily y weekly
- infra: CubePath + DB self-hosted
- riesgo principal: calidad de scoring y señal social

