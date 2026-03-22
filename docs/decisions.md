# Decision Log / Product Assumptions Canvas


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

