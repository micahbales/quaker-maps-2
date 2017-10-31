/* import sass into webpack pipeline */
import '../sass/style.scss';

/* import javascript modules here */
import { $, $$ } from './modules/bling';
import makeMap from './modules/map';

/* init map */
window.on('load', () => {
  makeMap($('#map'));
});

/* update map */
$('.nav__link--logo').on('click', () => {
  makeMap($('#map'));
});

/* flash messages disappear after being displayed */
window.setTimeout(fadeFlashes, 6000);
function fadeFlashes() {
  $$('.flash').forEach((element) => {
    element.setAttribute('style', 'display: none;');
  });
};
