module.exports = function(RED){
  function cobotServerNode(config) {
    RED.nodes.createNode(this,config);
    this.name = config.name;
    this.subDomain = config.subDomain;
    this.token = config.token;
  }
  RED.nodes.registerType("cobot-server", cobotServerNode);
}
