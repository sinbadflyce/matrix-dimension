import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class WebhooksApiService {
    constructor(private http: Http) {
    }

    deleteWebhook(roomId: string, hookId: string, scalarToken: string): Promise<any> {
        return this.http.delete("/api/v1/webhooks/" + roomId + "/hook/" + hookId, {params: {scalar_token: scalarToken}})
            .map(res => res.json()).toPromise();
    }
}
