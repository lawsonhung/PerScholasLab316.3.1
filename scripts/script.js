// Menu data structure
// var menuLinks = [
//   { text: 'about', href: '/about' },
//   { text: 'catalog', href: '/catalog' },
//   { text: 'orders', href: '/orders' },
//   { text: 'account', href: '/account' },
// ];

var menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog', href: '#', subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ]
  },
  {
    text: 'orders', href: '#', subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ]
  },
  {
    text: 'account', href: '#', subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ]
  },
];

// ============================================= PART ONE

let mainEl = document.querySelector('main');

const rootElement = document.documentElement;
const computedStyles = window.getComputedStyle(rootElement);

let mainBgColor = computedStyles.getPropertyValue('--main-bg');
mainEl.style.backgroundColor = 'var(--main-bg)';
// mainEl.style.backgroundColor = mainBgColor;

const fragment = document.createDocumentFragment();
const h1Element = document.createElement('h1');
h1Element.textContent = 'DOM Manipulation';
fragment.appendChild(h1Element);
mainEl.appendChild(fragment);

mainEl.classList.add('flex-ctr');

// ============================================= PART TWO

let topMenuEl = document.getElementById('top-menu');

topMenuEl.style.height = '100%';

let topMenuBgColor = computedStyles.getPropertyValue('--top-menu-bg');
// topMenuEl.style.backgroundColor = topMenuBgColor;
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

topMenuEl.classList.add('flex-around');

// ============================================= PART THREE

menuLinks.forEach(link => {
  const aEl = document.createElement('a');

  aEl.href = link.href;

  aEl.textContent = link.text;

  topMenuEl.appendChild(aEl);
});

// DOM MANIPULATION PART TWO
// ============================================= PART THREE

let subMenuEl = document.getElementById('sub-menu');

subMenuEl.style.height = '100%';

subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

subMenuEl.classList.add('flex-around');

subMenuEl.style.position = 'absolute';

subMenuEl.style.top = '0';

// ============================================= PART FOUR

let topMenuLinks = document.querySelectorAll('a');

topMenuEl.addEventListener('click', handleTopMenu)

function handleTopMenu(e) {
  e.preventDefault();

  const target = e.target;
  let linkObject;

  if (target.tagName !== 'A') return;

  console.log(target.textContent);

  // ============================================= PART FIVE

  // Show submenu if it's not 'about' and it's not currently active
  if (!target.classList.contains('active')) {
    if (target.textContent !== 'about')
      subMenuEl.style.top = '100%';
    else
      mainEl.innerHTML = '<h1>About</h1>';
  } else
    subMenuEl.style.top = '0';

  target.classList.toggle('active');

  topMenuLinks.forEach(link => {
    if (link !== e.target)
      link.classList.remove('active');
    else
      linkObject = link.textContent;
  });

  // Cache link object
  menuLinks.forEach(link => {
    if (link.text == linkObject)
      linkObject = link;
  });

  console.log(linkObject)

  buildSubMenu(linkObject.subLinks);
}

function buildSubMenu(subLinksArg) {
  subMenuEl.textContent = '';

  subLinksArg.forEach(link => {
    const anchorEl = document.createElement('a');
    anchorEl.textContent = link.text;
    subMenuEl.appendChild(anchorEl);
  });
}

subMenuEl.addEventListener('click', handleSubMenu);

function handleSubMenu(e) {
  e.preventDefault();

  const target = e.target;

  if (target.tagName !== 'A')
    return;

  console.log(target.textContent);

  subMenuEl.style.top = '0';

  topMenuLinks.forEach(link => {
    if (link.tagName == 'A')
      link.classList.remove('active');
  });

  mainEl.textContent = target.textContent;
}