"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const delivery_1 = require("../../../delivery");
const default_session_1 = require("../../../session/default-session");
const streaming_chain_1 = require("./streaming-chain");
function Definition(params) {
    let name;
    let parameters;
    if (isPlainObject_1.default(params)) {
        const _a = params, { name: universeName } = _a, restParams = __rest(_a, ["name"]);
        name = universeName;
        parameters = restParams;
    }
    else {
        name = params;
        parameters = undefined;
    }
    return {
        getStream(session = default_session_1.getDefault(), api = delivery_1.DEFAULT_OMM_STREAMING_CONNECTION_NAME) {
            return new streaming_chain_1.StreamingChainImpl(session, name, Object.assign(Object.assign({}, parameters), { api }));
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3ByaWNpbmcvY2hhaW4vZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUFpRDtBQUVqRCxnREFBMEU7QUFDMUUsc0VBQThEO0FBRzlELHVEQUF1RDtBQUt2RCxTQUFnQixVQUFVLENBQUMsTUFBdUI7SUFDOUMsSUFBSSxJQUFZLENBQUM7SUFDakIsSUFBSSxVQUFxQyxDQUFDO0lBQzFDLElBQUksdUJBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN2QixNQUFNLEtBQXdDLE1BQWdCLEVBQXhELEVBQUUsSUFBSSxFQUFFLFlBQVksT0FBb0MsRUFBL0IsVUFBVSxjQUFuQyxRQUFxQyxDQUFtQixDQUFDO1FBQy9ELElBQUksR0FBRyxZQUFZLENBQUM7UUFDcEIsVUFBVSxHQUFHLFVBQVUsQ0FBQztLQUMzQjtTQUFNO1FBQ0gsSUFBSSxHQUFHLE1BQWdCLENBQUM7UUFDeEIsVUFBVSxHQUFHLFNBQVMsQ0FBQztLQUMxQjtJQUVELE9BQU87UUFDSCxTQUFTLENBQUMsVUFBbUIsNEJBQVUsRUFBRSxFQUFFLE1BQWMsZ0RBQXFDO1lBQzFGLE9BQU8sSUFBSSxvQ0FBa0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxrQ0FBTyxVQUFVLEtBQUUsR0FBRyxJQUFHLENBQUM7UUFDekUsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBakJELGdDQWlCQyJ9