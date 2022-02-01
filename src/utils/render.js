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

export function appendChild(parentElement, childElement) {
  if (parentElement === null || childElement === null) {
    throw new Error('Can\'t append unexisting element');
  }

  const child = childElement instanceof AbstractView ? childElement.element : childElement;
  const parent = parentElement instanceof AbstractView ? parentElement.element : parentElement;

  parent.appendChild(child);
}

export function removeChild(parentElement, childElement) {
  if (parentElement === null || childElement === null) {
    throw new Error('Can\'t remove unexisting element');
  }

  const child = childElement instanceof AbstractView ? childElement.element : childElement;
  const parent = parentElement instanceof AbstractView ? parentElement.element : parentElement;

  parent.removeChild(child);
}

export function replace (newElement, oldElement) {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const newChild = newElement instanceof AbstractView ? newElement.element : newElement;
  const oldChild = oldElement instanceof AbstractView ? oldElement.element : oldElement;

  const scrollTop = oldChild.scrollTop;

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newChild, oldChild);
  newChild.scrollTop = scrollTop;
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
