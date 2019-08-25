export const utils = {
  Position: {
    AFTERBEGIN: `afterbegin`,
    BEFOREEND: `beforeend`,
  },

  makeElement: (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstElementChild;
  },

  render: (container, element, place) => {
    switch (place) {
      case utils.Position.AFTERBEGIN:
        container.prepend(element);
        break;
      case utils.Position.BEFOREEND:
        container.append(element);
        break;
    }
  },

  remove: (element) => {
    if (element) {
      element.remove();
    }
  },
};
