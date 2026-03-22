# UX Clash — Canvases

## 1. PRD Canvas

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

## 2. Design Canvas

### Principios de diseño
- **claridad primero**
- **menos fricción**
- **feedback inmediato**
- **competición visible**
- **resultado compartible**

### Experiencia central
El producto debe sentirse como:
- editor + arena
- práctica + competición
- portafolio + juego

### Pantallas clave

#### 1. Home
Objetivo:
- explicar el producto en 5 segundos
- destacar reto diario, reto semanal y leaderboard

Contenido:
- headline clara
- CTA de entrar al reto
- preview de entries top
- ranking visible
- valor social visible

#### 2. Challenge Page
Objetivo:
- hacer que el reto se entienda rápido

Contenido:
- título
- escenario
- objetivo
- viewport
- restricciones
- CTA “Abrir editor”

#### 3. Editor Arena
Layout:
- panel HTML
- panel CSS/Tailwind
- preview derecha
- meta del reto arriba
- submit visible

Prioridades:
- preview rápido
- cero ruido
- foco absoluto en construir

#### 4. Submission Result
Contenido:
- preview/snapshot
- score total
- breakdown IA
- score social
- posición en leaderboard
- botón compartir

#### 5. Public Entry Page
Contenido:
- preview grande
- autor
- reto
- score IA
- señal social
- link para compartir
- CTA para unirse al reto

#### 6. Leaderboard
Contenido:
- ranking por reto
- top entries
- score total
- filtros daily/weekly

### UX decisions
- explorar sin login
- submit con login
- social con login
- retos fáciles con plantilla
- retos weekly sin plantilla
- sin categorías de dificultad en MVP

### Rúbrica IA recomendada
6 criterios:
- claridad
- jerarquía visual
- cumplimiento del reto
- usabilidad
- accesibilidad básica
- calidad visual/profesional

Salida:
- nota total
- notas por criterio
- 2 fortalezas
- 2 debilidades
- 1 mejora concreta

### Visual Style
- oscuro, limpio, técnico
- estética de arena/scoreboard
- tipografía fuerte y legible
- contraste alto
- énfasis en preview y ranking

### Diseño social
- la parte social no es chat
- la parte social es comparación pública, visibilidad y ranking
- cada submission debe parecer “posteable”

### Anti-patterns a evitar
- dashboard muerto
- interfaz demasiado “devtool”
- exceso de configuración
- demasiadas métricas sin contexto
- editor con fricción visual

---

## 3. Mission / Vision Canvas

### Mission
**Convertir la práctica de UI/UX en una competición creativa, pública y útil, donde el talento se demuestra construyendo interfaces reales bajo retos claros.**

### Vision
**Ser la plataforma de referencia para practicar, medir y exhibir criterio de diseño de interfaces a través de retos competitivos de código y UX/UI.**

### Why this exists
Porque aprender diseño de interfaces suele ser:
- pasivo,
- teórico,
- aislado,
- y poco visible.

UX Clash convierte eso en:
- acción,
- comparación,
- feedback,
- reputación.

### Core belief
El criterio de diseño no se demuestra hablando.  
Se demuestra resolviendo restricciones reales y comparando resultados.

### Audience promise
Para devs, diseñadores y estudiantes:
- practica con contexto real
- recibe feedback
- compite con otros
- comparte tu trabajo
- mejora tu criterio

### Product promise
Cada reto debe producir una de estas sensaciones:
- “quiero intentarlo”
- “quiero superar esa submission”
- “quiero compartir esto”
- “quiero volver mañana”

### Brand pillars
- **competición**
- **criterio**
- **visibilidad**
- **práctica real**
- **UX first**

### Long-term aspiration
No ser solo un juego ni solo un editor.  
Ser una capa social y competitiva para demostrar capacidad de diseño de producto real.

### Tagline options
- **Diseña. Compite. Demuestra tu criterio.**
- **La arena competitiva de UX/UI en código.**
- **Reta tu criterio. Publica tu interfaz.**
- **UI real. Retos reales. Ranking real.**

### One-line pitch
**UX Clash es una arena competitiva donde creas interfaces con HTML y Tailwind para retos reales, y compites en un leaderboard con scoring de IA y validación social.**

---

## 4. Decision Log / Product Assumptions Canvas

### Idea base
- El producto es una **design/code arena**.
- El foco no es solo UX teórica, sino **competición visual y social alrededor de UX/UI**.
- La parte social compara la **calidad de UX/UI** de las submissions.
- El producto es un **top contender** para el hackathon.

### Concepto del producto
- El usuario compite resolviendo retos de diseño de interfaz.
- La creación se hace con **HTML + CSS/Tailwind**.
- No habrá JavaScript en las submissions.
- El producto mezcla:
  - práctica
  - competición
  - ranking
  - visibilidad social

### Editor / experiencia de creación
- El formato del editor será:
  - **HTML en un panel**
  - **CSS/Tailwind en otro panel**
  - **preview a la derecha**
- El usuario puede:
  - escribir desde cero
  - o usar plantillas en retos básicos
- El editor está pensado para retos visuales y de interfaz, no para apps funcionales.

### Tecnología permitida en submissions
- Solo se permite:
  - **HTML**
  - **CSS**
  - **Tailwind**
- No se permite:
  - JavaScript
  - iframes del usuario
  - scripts externos
  - imports inseguros
  - requests externas
- Tailwind se cargará con un **runtime dentro del sandbox/render del producto**.
- Se permite tanto:
  - Tailwind en clases dentro del HTML
  - como CSS adicional en el panel de estilos

### Tipo de retos
- Habrá:
  - **reto diario**
  - **reto semanal**
- Se empezará con **10 retos manuales** para MVP.
- Los retos luego se podrán rotar en schedule.
- Los retos incluyen:
  - **título**
  - **escenario**
  - **objetivo principal**
  - **restricciones**
  - viewport cuando aplique
- No se usarán categorías de dificultad por ahora.
- Las plantillas se usarán solo en:
  - retos sencillos
  - diarios fáciles
  - tutoriales
- El **weekly no lleva plantilla**.

### Viewports
- Un reto puede ser:
  - solo mobile
  - solo desktop
  - ambos
- Depende del challenge.

### Tiempo / competición
- Por ahora **sin límite de tiempo**.
- El enfoque inicial no es tiempo real.
- La competición se articula por:
  - reto
  - scoring
  - leaderboard
  - capa social

### Sistema de scoring
- El score será:
  - **50% IA**
  - **50% social**
- La razón es compensar posibles alucinaciones o errores de la IA con validación social.
- La IA debe funcionar en modo **rúbrica**, juzgando varias dimensiones de implementación.
- El scoring social será por **like**, no por sistema A/B ni puntuación compleja, al menos en MVP.

### Rúbrica IA
La IA debe evaluar varias partes de la implementación. La recomendación consolidada queda así:
- **claridad**
- **jerarquía visual**
- **cumplimiento del reto**
- **usabilidad**
- **accesibilidad básica**
- **calidad visual/profesional**

La salida ideal de IA:
- nota total
- nota por criterio
- fortalezas
- debilidades
- sugerencia concreta

### Sistema social
- La mecánica social será **like**.
- No habrá sistema de puntuación manual más complejo en MVP.
- La parte social sirve para:
  - validar percepción pública
  - dar visibilidad
  - reforzar el componente competitivo

### Leaderboards
- Habrá **leaderboard por reto**.
- Se contempla también uno **general** sumando scores.
- El ranking principal no será por categorías de dificultad.
- El objetivo es que auth y leaderboard estén conectados.

### Auth
- Auth es importante porque forma parte del leaderboard.
- La dirección aceptada era:
  - explorar sin login
  - login para submit
  - login para interacción social/ranking
- El perfil de usuario debe ser **muy simplificado**.

### Perfil de usuario
- Algo mínimo.
- Sin sistema complejo de perfil en MVP.
- Lo esencial es:
  - identidad básica
  - submissions
  - score/ranking

### Base de datos
- La base de datos será **self-hosted**.
- Se contempla alojarla en el mismo server del proyecto.
- No se quiere depender de una solución gestionada externa para DB.

### Hosting
- El proyecto debe desplegarse en **CubePath**, porque es requisito del hackathon.
- No tiene por qué ser frontend-only.
- Se contempla una app full-stack ligera desplegada allí.

### Validación de submissions
- Para ti, una submission válida es básicamente cualquier cosa que el usuario pueda enviar como snip/captura y publicar.
- No quieres restringir demasiado por calidad mínima.
- Si una submission está vacía o rota:
  - se queda publicada
  - IA la penaliza
  - el score social probablemente también la hunda
- No habrá moderación manual en MVP.

### Moderación
- **No habrá moderación por ahora**.
- Tampoco se quiere meter un sistema complejo de filtrado humano.
- Se acepta que submissions malas o rotas existan y queden abajo por scoring.

### Sharing / capa social pública
- Cada submission debe tener:
  - **share card**
  - **link shareable**
  - visualización pública
- Compartir una entry es parte importante del producto.

### Público objetivo
- **Devs**
- **Diseñadores**
- **Estudiantes**

### Orientación del producto
- El objetivo del reto es **UX realista y profesional**.
- No buscas una experiencia memética o absurda como dirección principal.
- El producto se posiciona más como:
  - arena de criterio
  - práctica de interfaces
  - competición pública

### Decisiones descartadas o reducidas
- No se quiere un sistema drag-and-drop complejo.
- No se quiere un constructor visual tipo Figma-lite.
- No se quiere JS en submissions.
- No se quiere moderación compleja.
- No se quiere dificultad por categorías en MVP.
- No se quiere un sistema social complejo de rating por ahora.

### Resumen ultra corto
- **Producto:** arena competitiva de UX/UI en código
- **Input:** HTML + CSS/Tailwind
- **Editor:** HTML izquierda, CSS centro, preview derecha
- **Retos:** 10 manuales, daily + weekly
- **Plantillas:** solo en retos fáciles/tutoriales
- **Scoring:** 50% IA, 50% likes
- **Social:** submission shareable + leaderboard
- **Auth:** importante para ranking
- **DB:** self-hosted
- **Hosting:** CubePath
- **Público:** devs, diseñadores, estudiantes
- **Moderación:** ninguna en MVP

---

## 5. Context / Assumptions Canvas

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

