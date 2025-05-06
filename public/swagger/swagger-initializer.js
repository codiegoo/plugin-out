
// public/swagger/swagger-initializer.js
window.onload = () => {
  window.ui = SwaggerUIBundle({
    url: "/api/docs", // Aquí va tu endpoint con el JSON
    dom_id: "#swagger-ui",
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: "StandaloneLayout",
  });
};
