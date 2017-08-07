module.exports = function(RED){
  function cobotResourceNode(config) {
    RED.nodes.createNode(this,config);
    this.name = config.name;
    this.resourceid = config.resourceid;
    this.server = config.server;
  }
  RED.nodes.registerType("cobot-resource", cobotResourceNode);
}
