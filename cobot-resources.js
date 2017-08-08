var request = require('superagent');
module.exports = function(RED){
  function cobotNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    node.serverConfig = RED.nodes.getNode(config.server);
    var URL = "https://"+node.serverConfig.subDomain+".cobot.me/api/resources"
    node.on('input', function(msg) {
      request
      .get(URL)
      .set('Authorization', 'Bearer '+node.serverConfig.token)
      .end(function(err, res){
        if(err){
          node.send({error: err});
        }else{
          var body = res.body;
          try{
          node.send({payload: body});
          }catch (e){
            node.error(e)
          }
        }
      })
    });
  }
  RED.nodes.registerType("cobot-resources", cobotNode);
}
