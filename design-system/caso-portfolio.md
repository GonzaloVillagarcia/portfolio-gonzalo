# Design system de Pedí tu lavado

## Problema

Construí Pedí tu lavado rápido, pantalla por pantalla, con desarrollo asistido por IA. Funcionó para lanzar, pero dejó una deuda: cada pantalla tomaba sus propias decisiones de color, tamaño y espaciado.

Cuando medí el código encontré 761 clases de color distintas, 36 tamaños de texto (algunos de 7 px), 19 radios y 97 sombras distintas. El azul de marca existía dos veces, el fondo oscuro tenía ocho versiones casi iguales y el texto gris más usado de la app no llegaba al contraste mínimo para leerse bien.

## Proceso

1. **Auditoría.** Recorrí el código de las pantallas de cliente, lavador y landing y conté qué se usa de verdad: colores, tamaños, pesos, radios, sombras y espaciados. También comparé con la app funcionando, porque el código y la pantalla no siempre dicen lo mismo.
2. **Consolidación.** Agrupé lo repetido y lo casi repetido, y me quedé con el set mínimo que cubre todos los casos.
3. **Tokens en dos capas.** Primitivos (las escalas de color) y semánticos (para qué se usa cada color: fondo, texto secundario, marca, lavador, éxito, certificado). Cada semántico tiene versión clara y oscura.
4. **Contraste.** Verifiqué cada par de colores contra WCAG AA y ajusté lo mínimo donde no cumplía.
5. **Componentes.** Pasé los componentes reales al sistema (la card de lavador, los pins del mapa, el PIN de verificación, los estados del pedido) con todas sus variantes y una regla corta de uso.
6. **Figma.** Armé un plugin que genera la librería completa: variables, estilos, componentes y pantallas.

## Decisiones

- **El azul de marca es el que se ve.** El token de shadcn decía un azul y la interfaz usaba otro. Me quedé con el de la pantalla.
- **Un solo rosa para el lavador.** "Ser lavador" usaba #FF0080 en la landing y fucsia en el panel del lavador. Los unifiqué en una escala y oscurecí apenas el tono de los botones para que el texto blanco se lea (de 3.77:1 a 4.72:1).
- **"Certificado" y "verificado" son cosas distintas.** Todos los lavadores están verificados (DNI, selfie y antecedentes); certificado es el que hizo el curso. El violeta queda reservado solo para eso.
- **Nada por debajo de 10 px.** Las etiquetas de 7 y 8 px pasan a 10 px, siempre en mayúsculas.
- **Nombres por función, no por color.** Los componentes usan `text-secondary` o `success`, no `slate-500` o `emerald-600`. Así el modo oscuro es cambiar un valor, no reescribir pantallas.

## Resultado

- De 761 colores a 53 tokens semánticos por modo; de 36 tamaños de texto a 9; de 19 radios a 5; de 97 sombras a 6.
- 25 pares de color verificados en cada modo, todos cumplen AA.
- 21 componentes con sus variantes y estados, documentados con cuándo usarlos y cuándo no.
- Una librería de Figma que se genera sola a partir de los tokens, y un mapa para pasar el código al sistema sin cambiar el diseño.

El próximo paso es migrar el código de la app a estos tokens, empezando por los componentes que más se repiten.
