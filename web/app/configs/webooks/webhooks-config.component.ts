import { Component } from "@angular/core";
import { WebhooksIntegration } from "../../shared/models/integration";
import { ModalComponent, DialogRef } from "ngx-modialog";
import { ConfigModalContext } from "../../integration/integration.component";
import { WebhooksApiService } from "../../shared/webhooks-api.service";
import { ToasterService } from "angular2-toaster";

@Component({
    selector: "my-webhooks-config",
    templateUrl: "./webhooks-config.component.html",
    styleUrls: ["./webhooks-config.component.scss", "./../config.component.scss"],
})
export class WebhooksConfigComponent implements ModalComponent<ConfigModalContext> {

    public integration: WebhooksIntegration;

    private roomId: string;
    private scalarToken: string;
    private hooksBeingDeleted: string[] = [];

    constructor(public dialog: DialogRef<ConfigModalContext>,
                private webhooksApi: WebhooksApiService,
                private toaster: ToasterService) {
        this.integration = <WebhooksIntegration>dialog.context.integration;
        this.roomId = dialog.context.roomId;
        this.scalarToken = dialog.context.scalarToken;
    }

    public removeHook(hookId: string) {
        this.hooksBeingDeleted.push(hookId);
        this.webhooksApi.deleteWebhook(this.roomId, hookId, this.scalarToken).then(() => {
            this.toaster.pop("success", "Webhook deleted");

            let targetHook = null;
            for (var hook of this.integration.hooks) {
                if (hook.id === hookId) {
                    targetHook = hook;
                    break;
                }
            }
            if (targetHook) this.integration.hooks.splice(this.integration.hooks.indexOf(targetHook), 1);

            var idx = this.hooksBeingDeleted.indexOf(hookId);
            if (idx !== -1) this.hooksBeingDeleted.splice(idx, 1);
        }).catch(err => {
            this.toaster.pop("error", err.json().error);
            console.error(err);

            var idx = this.hooksBeingDeleted.indexOf(hookId);
            if (idx !== -1) this.hooksBeingDeleted.splice(idx, 1);
        });
    }

    public hookIsBeingRemoved(hookId: string) {
        return this.hooksBeingDeleted.indexOf(hookId) !== -1;
    }
}
