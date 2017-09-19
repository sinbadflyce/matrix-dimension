var Integrations = require("../../index");
var IntegrationImpl = require("../index");
var log = require("../../../util/LogService");

/**
 * API Handler for the Webhooks integration
 */
class WebhookApi {

    /**
     * Creates a new Webhook API
     */
    constructor() {
    }

    /**
     * Bootstraps the Webhook API
     * @param {*} app the Express application
     * @param {DimensionStore} db the store to use
     */
    bootstrap(app, db) {
        if (!Integrations.byType["bridge"] || !Integrations.byType["bridge"]["webhooks"]) {
            log.info("WebhookApi", "Webhook Bridge not enabled - not setting up the API");
            return;
        } else log.info("WebhookApi", "Setting up Webhook API");

        this._db = db;

        app.get("/api/v1/webhooks/:roomId/hooks", this._getWebhooks.bind(this));
        //app.put("/api/v1/webhooks/:roomId/incoming_hook", this._createWebhook.bind(this));
        //app.delete("/api/v1/webhooks/:roomId/hook/:hookId", this._deleteWebhook.bind(this));
    }

    _getWebhooks(req, res) {
        this._generalProcessing(req, res).then(webhookBridge => {
            return webhookBridge.getWebhooks();
        }).then(hooks => {
            res.status(200).send(hooks || []);
        }).catch(() => null);
    }

    _generalProcessing(req, res) {
        return new Promise((resolve, reject) => {
            res.setHeader("Content-Type", "application/json");

            var roomId = req.params.roomId;
            if (!roomId) {
                res.status(400).send({error: 'Missing room ID'});
                reject();
                return;
            }

            var scalarToken = req.query.scalar_token;
            this._db.checkToken(scalarToken).then(() => {
                var conf = Integrations.byType["bridge"]["webhooks"];
                var factory = IntegrationImpl.getFactory(conf);
                factory(this._db, conf, roomId, scalarToken).then(resolve).catch(err => {
                    log.error("WebhookApi", err);
                    console.error(err);
                    res.status(500).send({error: err});
                    reject();
                });
            }).catch(err => {
                log.error("WebhookApi", err);
                console.error(err);
                res.status(500).send({error: err});
                reject();
            });
        });
    }

}

module.exports = new WebhookApi();