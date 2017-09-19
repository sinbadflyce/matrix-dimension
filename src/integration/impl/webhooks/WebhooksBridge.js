var Bridge = require("../../generic_types/Bridge");

/**
 * Represents an Webhooks bridge
 */
class WebhooksBridge extends Bridge {

    /**
     * Creates a new Webhooks bridge
     * @param bridgeConfig the bridge configuration
     * @param backbone the backbone powering this bridge
     */
    constructor(bridgeConfig, backbone) {
        super(bridgeConfig);
        this._backbone = backbone;
    }

    /*override*/
    getState() {
        return this._backbone.getWebhooks().then(hooks => {
            console.log(hooks);
            return {hooks: hooks};
        });
    }

    /*override*/
    removeFromRoom(roomId) {
        // return this._backbone.removeFromRoom(roomId);
        throw new Error("Cannot remove from rooms. Use the Webhooks API");
    }

    /*override*/
    updateState(newState) {
        throw new Error("State cannot be updated for a Webhooks bridge. Use the Webhooks API instead.");
    }

    /**
     * Gets a list of all available webhooks for a room
     * @returns {Promise<Webhook[]>} resolves to the list of webhooks in the room, or an empty array
     */
    getWebhooks() {
        return this._backbone.getWebhooks();
    }

    /**
     * Creates a new webhook for a room
     * @returns {Promise<Webhook>} resolves to the created webhook
     */
    createWebhook() {
        this._backbone.createWebhook();
    }

    /**
     * Deletes a webhook for a room
     * @param {string} hookId the ID of the hook
     * @returns {Promise<>} resolves when the hook is deleted
     */
    deleteWebhook(hookId) {
        this._backbone.deleteWebhook(hookId);
    }
}

module.exports = WebhooksBridge;