// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      const parsedValue = JSON.parse(value);
      if (Array.isArray(parsedValue)) {
        return parsedValue;
      } else {
        return [parsedValue];
      }
    } catch (error) {
      console.error(`Error parsing value from localStorage with key "${key}":`, error);
      return [];
    }
  }
  return [];
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


export function clearLocalStorage(key) {
  localStorage.removeItem(key);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}



export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load template from ${path}`);
  }
  const html = await response.text();
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

export function renderWithTemplate(template, targetElement) {
  targetElement.innerHTML = '';
  targetElement.appendChild(template.cloneNode(true));
}

export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate('../partials/header.html');
    const footerTemplate = await loadTemplate('../partials/footer.html');
    const headerElement = document.querySelector('#main-header');
    const footerElement = document.querySelector('#main-footer');
    renderWithTemplate(headerTemplate.content, headerElement);
    renderWithTemplate(footerTemplate.content, footerElement);
  } catch (error) {
    console.error('Error loading header or footer:', error);
  }
}

export function alertMessage(message, scroll = true) {
  const alertBox = document.createElement("div");
  alertBox.className = "alert-message";
  alertBox.textContent = message;

  const mainElement = document.querySelector("main");
  mainElement.insertBefore(alertBox, mainElement.firstChild);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}



