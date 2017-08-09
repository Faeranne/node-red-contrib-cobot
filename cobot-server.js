var request = require('superagent');
module.exports = function(RED){
  function cobotServerNode(config) {
    RED.nodes.createNode(this,config);
    this.name = config.name;
    this.subDomain = config.subDomain;
    this.token = config.token;
  }
  RED.httpAdmin.get('/node-cobot/resources', function(req,res){
    if(!req.query.server){
      res.status(500).send("Missing arguments");
      return;
    }
    var server = RED.nodes.getNode(req.query.server);
    if(server && server.subDomain && server.token){
      var URL = "https://"+server.subDomain+".cobot.me/api/resources"
      request
      .get(URL)
      .set('Authorization', 'Bearer '+server.token)
      .end(function(err, response){
        if(err){
          res.status(500).send("Internal Server Error: "+err);
        }else{
          var body = response.body;
          try{
            res.set({'content-type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(body));
          }catch (e){
            res.status(500).send("Internal Server Error: "+e);
          }
        }
      })
    }
  });	  
  RED.nodes.registerType("cobot-server", cobotServerNode);
}
