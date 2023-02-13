"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JETBusBrowser = void 0;
class JETBusBrowser {
    constructor() {
        this.channelMap = new Map();
        this.JET = window.JET;
    }
    subscribe(channel, callback) {
        const subscription = this.JET.subscribe(channel, this.jetCallback.bind(null, callback));
        if (!this.channelMap.has(channel)) {
            this.channelMap.set(channel, new Map());
        }
        const callbackMap = this.channelMap.get(channel);
        if (callbackMap && !callbackMap.has(callback)) {
            callbackMap.set(callback, subscription);
        }
        return subscription;
    }
    unsubscribe(channel, callback) {
        const callbackMap = this.channelMap.get(channel);
        if (callbackMap) {
            const subscription = callbackMap.get(callback);
            if (subscription) {
                subscription.unsubscribe();
                callbackMap.delete(callback);
            }
        }
    }
    publish(channel, data) {
        return this.JET.publish(channel, data);
    }
    connect() {
        return Promise.resolve(void 0);
    }
    jetCallback(callback, data, channel) {
        if (typeof data === 'string') {
            try {
                callback(channel, JSON.parse(data));
            }
            catch (err) {
                callback(channel, data);
            }
        }
        else {
            callback(channel, data);
        }
    }
}
exports.JETBusBrowser = JETBusBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamV0LWJ1cy1icm93c2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3Nlc3Npb24vY29udGFpbmVyL2pldC1idXMtYnJvd3Nlci9qZXQtYnVzLWJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBU0EsTUFBYSxhQUFhO0lBSXRCO1FBRlEsZUFBVSxHQUF5RCxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBR2pGLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUMxQixDQUFDO0lBRU0sU0FBUyxDQUFDLE9BQWUsRUFBRSxRQUF3QjtRQUN0RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFeEYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDM0M7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0MsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDM0M7UUFFRCxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRU0sV0FBVyxDQUFDLE9BQWUsRUFBRSxRQUF3QjtRQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLFdBQVcsRUFBRTtZQUNiLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0MsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQixXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7SUFDTCxDQUFDO0lBRU0sT0FBTyxDQUFDLE9BQWUsRUFBRSxJQUFTO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxPQUFPO1FBQ1YsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVPLFdBQVcsQ0FBQyxRQUF3QixFQUFFLElBQVMsRUFBRSxPQUFlO1FBQ3BFLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzFCLElBQUk7Z0JBQ0EsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDdkM7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNCO1NBQ0o7YUFBTTtZQUNILFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0I7SUFDTCxDQUFDO0NBQ0o7QUFyREQsc0NBcURDIn0=