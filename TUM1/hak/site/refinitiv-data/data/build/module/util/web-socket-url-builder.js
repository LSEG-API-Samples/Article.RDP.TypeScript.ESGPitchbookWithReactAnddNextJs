"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketUrlBuilderImpl = void 0;
const util_1 = __importDefault(require("util"));
class WebSocketUrlBuilderImpl {
    constructor() {
        this.wsUrlTemplate = 'wss://%s:%d%s';
        this.httpsProtocolPrefix = 'https://';
        this.emptyPathname = '/';
    }
    static getNewInstance() {
        return new this();
    }
    setUrl(url) {
        try {
            this.url = new URL(url);
        }
        catch (err) {
            this.url = new URL(this.httpsProtocolPrefix + url);
        }
        return this;
    }
    setPort(port) {
        this.port = port;
        return this;
    }
    setDefaultPathname(pathname) {
        const regExp = new RegExp(`^${this.emptyPathname}`);
        this.defaultPathname = regExp.test(pathname) ? pathname : this.emptyPathname + pathname;
        return this;
    }
    build() {
        this.checkRequired();
        return util_1.default.format(this.wsUrlTemplate, this.url.hostname, this.url.port || this.port, this.url.pathname !== this.emptyPathname ? this.url.pathname : this.defaultPathname);
    }
    checkRequired() {
        if (this.url === undefined) {
            throw new Error('An url is not set');
        }
        if (this.port === undefined) {
            throw new Error('A port is not set');
        }
        if (this.defaultPathname === undefined) {
            throw new Error('A default path name is not set');
        }
    }
}
exports.WebSocketUrlBuilderImpl = WebSocketUrlBuilderImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXNvY2tldC11cmwtYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL3dlYi1zb2NrZXQtdXJsLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXdCO0FBWXhCLE1BQWEsdUJBQXVCO0lBQXBDO1FBV3FCLGtCQUFhLEdBQVcsZUFBZSxDQUFDO1FBRXhDLHdCQUFtQixHQUFXLFVBQVUsQ0FBQztRQUV6QyxrQkFBYSxHQUFXLEdBQUcsQ0FBQztJQWtEakQsQ0FBQztJQWhFVSxNQUFNLENBQUMsY0FBYztRQUN4QixPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQWNNLE1BQU0sQ0FBQyxHQUFXO1FBQ3JCLElBQUk7WUFDQSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUN0RDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxPQUFPLENBQUMsSUFBWTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sa0JBQWtCLENBQUMsUUFBZ0I7UUFDdEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFFeEYsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsT0FBTyxjQUFJLENBQUMsTUFBTSxDQUNkLElBQUksQ0FBQyxhQUFhLEVBRWxCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUVqQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUUxQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FDdEYsQ0FBQztJQUNOLENBQUM7SUFFTyxhQUFhO1FBQ2pCLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDeEM7UUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssU0FBUyxFQUFFO1lBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztTQUNyRDtJQUNMLENBQUM7Q0FDSjtBQWpFRCwwREFpRUMifQ==