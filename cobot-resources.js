var request = require('request');
module.exports = function(RED){
  function cobotNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    node.serverConfig = RED.nodes.getNode(config.server);
    var URL = "https://"+node.serverConfig.subDomain+".cobot.me/api/resources"
    var header = {
      Authorization: "Bearer "+node.serverConfig.token
    }
    node.on('input', function(msg) {
      node.log(URL);
      node.log(node.serverConfig.token);
      request({
        url: URL,
        headers: header
      }, function(err, res, body){
        if(err){
          node.send({error: err});
        }else{
          node.log(body);
          try{
          node.send({payload: JSON.parse(body)});
          }catch (e){
            node.error(e)
          }
        }
      })
    });
  }
  RED.nodes.registerType("cobot-resources", cobotNode);
}
