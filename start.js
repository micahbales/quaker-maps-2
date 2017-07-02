// load environmental variables
require('dotenv').config();

// start our app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express now running on port ${process.env.PORT}`);
});
