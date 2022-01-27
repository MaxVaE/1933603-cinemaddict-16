import AbstractView from '../view/abstract-view';
export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export function render(container, element, place) {
  const parent = container instanceof AbstractView ? container.element : container;
  const child = element instanceof AbstractView ? element.element : element;

  switch(place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;
    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
}

export function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
}

export function appendOrRemove(parentElement, childElement, isRemove = false) {
  if (parentElement === null || childElement === null) {
    throw new Error(`Can't ${isRemove ? 'remove' : 'append'} unexisting element`);
  }

  const child = childElement instanceof AbstractView ? childElement.element : childElement;
  const parent = parentElement instanceof AbstractView ? parentElement.element : parentElement;

  if (isRemove) {
    parent.removeChild(child);
    return;
  }

  parent.appendChild(child);
}

export function remove(component) {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
}
