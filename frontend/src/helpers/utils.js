
export const getItemFromStore = (key, defaultValue, store = localStorage) => {
    try {
      return JSON.parse(store.getItem(key)) || defaultValue;
    } catch {
      return store.getItem(key) || defaultValue;
    }
  };


  export const getColor = (name, dom = document.body) => {
    return getComputedStyle(dom).getPropertyValue(`--net-${name}`).trim();
  };

  export const setItemToStore = (key, payload, store = localStorage) =>
  store.setItem(key, payload);
