const expect = require('chai').expect;
const axios = require('axios');
const baseUrl = `http://localhost:7777`

describe('test route', function() {
  it('returns response json', function() {
    return axios.get(`${baseUrl}/test`)
      .then((res) => {
        console.log(res.data);
        expect(JSON.stringify(res.data)).to.equal('{"json":"response"}');
      })
  });
});
