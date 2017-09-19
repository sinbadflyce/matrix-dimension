/**
 * Stubbed/placeholder Webhooks backbone
 */
class StubbedWebhooksBackbone {

    /**
     * Creates a new stubbed Webhooks backbone
     */
    constructor() {
    }

    /**
     * Gets a list of all available webhooks for a room
     * @returns {Promise<Webhook[]>} resolves to the list of webhooks in the room, or an empty array
     */
    getWebhooks() {
        return Promise.resolve([]);
    }

    /**
     * Creates a new webhook for a room
     * @returns {Promise<Webhook>} resolves to the created webhook
     */
    createWebhook() {
        throw new Error("Not implemented");
    }

    /**
     * Deletes a webhook for a room
     * @param {string} hookId the ID of the hook
     * @returns {Promise<>} resolves when the hook is deleted
     */
    deleteWebhook(hookId) {
        throw new Error("Not implemented");
    }
}

class Webhook {
    constructor() {
        this.id = "";
        this.url = "";
        this.userId = "";
        this.roomId = "";
        this.type = "";
    }
}

module.exports = StubbedWebhooksBackbone;