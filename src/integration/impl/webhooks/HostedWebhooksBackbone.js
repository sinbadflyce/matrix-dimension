var LogService = require("../../../util/LogService");
var request = require('request');

/**
 * Self-hosted webhooks bridge backbone
 */
class HostedWebhooksBackbone {

    /**
     * Creates a new hosted Webhooks backbone
     */
    constructor(roomId, userId, apiUrl, apiToken) {
        this._roomId = roomId;
        this._userId = userId;
        this._apiUrl = apiUrl;
        this._apiToken = apiToken;

        if (this._apiUrl.endsWith("/"))
            this._apiUrl = this._apiUrl.substring(0, this._apiUrl.length - 1);
    }

    /*override*/
    getWebhooks() {
        return this._do("GET", "/api/v1/provision/" + this._roomId + "/hooks", {userId: this._userId}).then(response => {
            if (response.statusCode !== 200) {
                LogService.error("HostedWebhooksBackbone", response.body);
                return Promise.reject(response.body);
            }

            response.body = JSON.parse(response.body);
            return response.body['results'];
        });
    }

    /*override*/
    createWebhook() {
        throw new Error("Not implemented");
    }

    /*override*/
    deleteWebhook(hookId) {
        throw new Error("Not implemented");
    }

    // TODO: Merge this (somehow) with VectorScalarClient and ScalarClient
    _do(method, endpoint, qs = null, body = null) {
        var url = this._apiUrl + endpoint;

        if (!qs) qs = {};
        qs["token"] = this._apiToken;

        LogService.verbose("HostedWebhooksBackbone", "Performing request: " + url);

        var params = {
            url: url,
            method: method,
            json: body,
            qs: qs
        };

        return new Promise((resolve, reject) => {
            request(params, (err, response, body) => {
                if (err) {
                    LogService.error("HostedWebhooksBackbone", err);
                    reject(err);
                } else resolve(response, body);
            });
        });
    }
}

module.exports = HostedWebhooksBackbone;