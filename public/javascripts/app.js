/* import sass into webpack pipeline */
import '../sass/style.scss';

/* import javascript modules here */
import { $, $$ } from './modules/bling';

/* flash messages disappear after being displayed */
window.setTimeout(fadeFlashes, 6000);
function fadeFlashes() {
  $$('.flash').forEach((element) => {
    element.setAttribute('style', 'display: none;');
  });
};
