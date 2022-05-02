import { translate } from "lorrainjs";

let inChange = false;

const translatePage = (root: Node) => {
  inChange = true;
  let element;
  const iterator = document.createNodeIterator(root, NodeFilter.SHOW_TEXT);
  while ((element = iterator.nextNode())) {
    if (element.textContent) {
      const text = element.textContent.trim();
      if (text !== "" && text.length > 1) {
        element.textContent = translate(element.textContent) as string;
      }
    }
  }

  setTimeout(() => {
    inChange = false;
  }, 3000);
};

const mutationObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      translatePage(node);
    }
  }
});

mutationObserver.observe(document.body, {
  subtree: true,
  childList: true,
  characterData: true,
});

translatePage(document.body);

setTimeout(() => {
  translatePage(document.body);
}, 2500);
