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

export function updateItem(items, update) {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
}
