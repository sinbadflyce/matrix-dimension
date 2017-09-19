var WebhooksBridge = require("./WebhooksBridge");
var HostedWebhooksBackbone = require("./HostedWebhooksBackbone");

var factory = (db, integrationConfig, roomId, scalarToken) => {
    factory.validateConfig(integrationConfig);

    return db.getUserId(scalarToken).then(userId => {
        var backbone = new HostedWebhooksBackbone(roomId, userId, integrationConfig.hosted.apiUrl, integrationConfig.hosted.apiToken);
        return new WebhooksBridge(integrationConfig, backbone);
    });
};

factory.validateConfig = (integrationConfig) => {
    if (!integrationConfig.hosted) throw new Error("Unsupported configuration");
    if (!integrationConfig.hosted.apiUrl) throw new Error("Missing API URL");
    if (!integrationConfig.hosted.apiToken) throw new Error("Missing API token");
};

module.exports = factory;