/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
var url = require('url');

exports.helloWorld = (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

  if (query.message === undefined) {
    res.status(400).send('<form action="https://asia-east2-canvas-verve-291907.cloudfunctions.net/function-2"><label for="message">CITY:</label><br><input type="text" id="message" name="message" value="Taipei"><br><br><input type="submit" value="Submit"></form>');
  } else {
    console.log(query.message);
    var rqurl = 'http://api.weatherapi.com/v1/current.json?key=6bede80e0e564eda848122216202210&q='+query.message;
    var getJSON = function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
          callback(null, xhr.response);
        } else {
          callback(status, xhr.response);
        }
      };
      xhr.send();
    };
    getJSON(rqurl,
      function(err, data) {
        if (err !== null) {
          alert('Something went wrong: ' + err);
        } else {
          alert('Your query count: ' + data.query.count);
          res.status(200).send('<h2>Success: ' + data.location.name +'<br>'+ data.current.temp_c +'度</h2>');
        }
      });
    
    //var respjson = JSON.parse(rsp.responseText);
    //res.status(200).send('<h2>Success: ' + xhr.responseText + '</h2>');
  }
};