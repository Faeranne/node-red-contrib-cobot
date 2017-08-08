var request = require('superagent');
var dateFormat = require('dateformat');
module.exports = function(RED){
  function cobotNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    node.resourceConfig = RED.nodes.getNode(config.resource);
    node.serverConfig = RED.nodes.getNode(node.resourceConfig.server);
    var URL = "https://"+node.serverConfig.subDomain+".cobot.me/api/resources/"+node.resourceConfig.resourceid+"/bookings"
    
    node.on('input', function(msg) {
      var fromDate = new Date(msg.from);
      var toDate = new Date(msg.to);
      var from = dateFormat(fromDate, "yyyy-mm-dd HH:MM:ss '-0600'") 
      var to = dateFormat(toDate, "yyyy-mm-dd HH:MM:ss '-0600'") 
      request
      .get(URL)
      .query({from:from,to:to})
      .set('Authorization', 'Bearer '+node.serverConfig.token)
      .end(function(err, res){
        if(err){
          node.send({error: err});
          node.error(err);
        }else{
          var body = res.body
          try{
          node.send({payload: body});
          }catch (e){
            node.error(e)
          }
        }
      })
    });
  }
  RED.nodes.registerType("cobot-bookings", cobotNode);
}
