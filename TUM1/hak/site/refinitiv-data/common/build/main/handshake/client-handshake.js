"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientHandshake = void 0;
const endpoints_1 = require("./endpoints");
class ClientHandshake {
    constructor(ipcBus) {
        this.ipcBus = ipcBus;
    }
    async connect(channel) {
        await this.ipcBus.connect();
        return new Promise(resolve => {
            const subscription = this.ipcBus.subscribe(channel + endpoints_1.PONG_ENDPOINT, () => {
                resolve();
                subscription.unsubscribe();
            });
            this.ipcBus.publish(channel + endpoints_1.PING_ENDPOINT, {});
        });
    }
}
exports.ClientHandshake = ClientHandshake;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWhhbmRzaGFrZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kc2hha2UvY2xpZW50LWhhbmRzaGFrZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBMkQ7QUFLM0QsTUFBYSxlQUFlO0lBQ3hCLFlBQTJCLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBRyxDQUFDO0lBTTdDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZTtRQUNoQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFNUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN6QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcseUJBQWEsRUFBRSxHQUFHLEVBQUU7Z0JBQ3JFLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyx5QkFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBbkJELDBDQW1CQyJ9