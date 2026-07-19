const openBtnEl = document.querySelector('[data-menu-open]');
const closeBtnEl = document.querySelector('[data-menu-close]');
const modalViewEl = document.querySelector('[data-visible]');

const handleClose = () => {
  modalViewEl.dataset.visible = 'close';
  document.body.dataset.scroll = 'true';

  closeBtnEl.removeEventListener('click', handleClose);
  modalViewEl.removeEventListener('click', handleMenuClick);
  document.removeEventListener('keydown', handleEscClose);
};

const handleEscClose = e => {
  if (e.key === 'Escape') handleClose();
};

const handleMenuClick = e => {
  const link = e.target.closest('a');

  if (link) {
    setTimeout(handleClose, 0);
  } else {
    handleClose();
  }
};

openBtnEl.addEventListener('click', () => {
  modalViewEl.dataset.visible = 'open';

  closeBtnEl.addEventListener('click', handleClose);
  modalViewEl.addEventListener('click', handleMenuClick);
  document.addEventListener('keydown', handleEscClose);
  document.body.dataset.scroll = 'false';
});
