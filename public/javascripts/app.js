/* import sass into webpack pipeline */
import '../sass/style.scss';

/* import javascript modules here */
import { $, $$ } from './modules/bling';
import { initializeMap, updateMap } from './modules/map';

/* init map */
window.on('load', () => {
  initializeMap($('#map'));
});

/* update map */
$('.nav__link--logo').on('click', () => {
  updateMap($('#map'), 'yearlymeeting', 'Philadelphia Yearly Meeting');
});

/* flash messages disappear after being displayed */
window.setTimeout(fadeFlashes, 6000);
function fadeFlashes() {
  $$('.flash').forEach((element) => {
    element.setAttribute('style', 'display: none;');
  });
};
