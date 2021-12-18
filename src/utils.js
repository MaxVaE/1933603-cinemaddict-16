export function createImage({ src, width, height, alt = '', className} = {}) {
  const img = new Image(width, height);
  img.src = src;
  img.className = className;
  img.alt = alt;

  return img.outerHTML;
}

export function getRuntime(time) {
  return `${(time / 60).toFixed(0)}h ${time % 60}m`;
}

export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export function renderTemplate(container, template, place) {
  container.insertAdjacentHTML(place, template);
}
