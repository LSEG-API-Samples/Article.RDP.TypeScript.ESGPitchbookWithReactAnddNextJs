"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerHandshake = void 0;
const endpoints_1 = require("./endpoints");
class ServerHandshake {
    constructor(ipcBus) {
        this.ipcBus = ipcBus;
    }
    async connect(channel) {
        if (this.subscription) {
            return;
        }
        await this.ipcBus.connect();
        this.subscription = this.ipcBus.subscribe(channel + endpoints_1.PING_ENDPOINT, () => {
            this.ipcBus.publish(channel + endpoints_1.PONG_ENDPOINT, {});
        });
        this.ipcBus.publish(channel + endpoints_1.PONG_ENDPOINT, {});
    }
    disconnect() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = void 0;
        }
    }
}
exports.ServerHandshake = ServerHandshake;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWhhbmRzaGFrZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kc2hha2Uvc2VydmVyLWhhbmRzaGFrZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBMkQ7QUFLM0QsTUFBYSxlQUFlO0lBTXhCLFlBQTJCLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBRyxDQUFDO0lBTTdDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZTtRQUNoQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsT0FBTztTQUNWO1FBRUQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLHlCQUFhLEVBQUUsR0FBRyxFQUFFO1lBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyx5QkFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLHlCQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUtNLFVBQVU7UUFDYixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztDQUNKO0FBbkNELDBDQW1DQyJ9