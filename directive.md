# Directivas de Proyecto: Personal Brand Landing Page

## 1. Identidad de Marca y Tono
- **Nombre de Marca:** Potenciador de Soluciones Tecnológicas / Aliado en Ejecución.
- **Ubicación:** Popayán, Colombia (Visión Global).
- **Valores:** Honestidad, Transparencia, Rigor Técnico, IA Responsable y Cercanía Humana.
- **Propuesta de Valor:** "No solo propongo la ruta, te acompaño en el terreno hasta cruzar la meta".

## 2. Estética Visual: "Pixel-Professional"
- **Concepto:** Estética Pixel Art (8-bit/16-bit) pero con un acabado moderno, limpio y profesional.
- **Paleta de Colores:** Colores Claros y Profesionales (Evitar modo oscuro).
    - Fondo: Blancos rotos o grises muy tenues.
    - Acentos: Azul institucional (Confianza), Verde pixel (Crecimiento) o Terracota suave (Calidez de Popayán).
- **Tipografía:** Combinación de una fuente Pixelada para encabezados cortos y una Sans-Serif muy legible (inter, roboto) para textos largos de ingeniería.
- **Iconografía:** Usar exclusivamente el estilo de [Streamline Pixel Icons](https://www.streamlinehq.com/icons/pixel).
- **Imágenes:** Usar las dos fotos ubicadas en `/images`. Una para la Hero Section y otra para la sección de contacto/acompañamiento.

## 3. Arquitectura de la Página
### A. Hero Section
- Impacto inmediato: "Tu aliado tecnológico para ejecutar soluciones que funcionan".
- Subtítulo que resalte el uso de IA Responsable y el compromiso de "estar en las malas".
- Foto principal integrada con bordes pixelados o estilo "frame" retro-moderno.

### B. Manifiesto del Aliado
- Bloque de texto enfocado en valores: Honestidad y Transparencia.
- Enfoque en: "Ejecuto lo que otros solo planean".

### C. Portafolio Dinámico (Componente Principal)
- **Cantidad:** Listado de los últimos 5 proyectos.
- **Animación Especial:** - Implementar tarjetas flotantes.
    - Las tarjetas deben orbitar o girar en un círculo con un ángulo de inclinación 3D (estilo carrusel rotatorio).
    - Cada tarjeta debe ser un "Case Study" rápido: Problema -> Ejecución -> Resultado.
- **Interacción:** Al pasar el mouse (hover), la tarjeta debe detenerse o expandirse para mostrar más detalles.

### D. Sección de Contacto
- Formulario de contacto integrado.
- CTA: "Hablemos de tu proyecto".
- Debe sentirse como una invitación amable, no como un proceso frío de ventas.

## 4. Instrucciones Técnicas para Claude
- **Herramientas de Diseño:** Utilizar skill de `UI/UX Pro Max` para asegurar que el estilo pixelado no afecte la usabilidad.
- **Responsividad:** La landing debe ser Mobile-First. Las animaciones de las tarjetas deben adaptarse a pantallas táctiles.
- **Performance:** Código limpio, optimización de imágenes y carga rápida (Ingeniería de Calidad).

## 5. Recursos Externos
- Iconos: https://www.streamlinehq.com/icons/pixel
- Imágenes locales: Carpeta `/images`