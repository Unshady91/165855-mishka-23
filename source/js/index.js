'use strict';

const pageNav = document.querySelector('.page-nav');
const pageNavOpen = document.querySelector('.page-nav--open');
const pageNavButton = document.querySelector('.page-nav__button');

pageNav.classList.remove('page-nav--nojs');

pageNavButton.addEventListener(
  'click',
  (evt) => {
    if (pageNav.classList.contains('page-nav--closed')) {
      pageNav.classList.remove('page-nav--closed');
      pageNav.classList.add('page-nav--open');
    } else {
      pageNav.classList.add('page-nav--closed');
      pageNav.classList.remove('page-nav--open');
    }
  }
)
