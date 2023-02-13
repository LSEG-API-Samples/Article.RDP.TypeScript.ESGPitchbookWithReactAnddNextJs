"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STREAMING_CHAINS_NAME_PATTERN = exports.QUANTITY_CHAIN_RECORDS_TO_REQUEST = exports.Event = void 0;
const state_manager_interface_1 = require("../../../state/state-manager.interface");
const Add = 'Add';
const Update = 'Update';
const Remove = 'Remove';
const Complete = 'Complete';
exports.Event = Object.assign(Object.assign({}, state_manager_interface_1.StateEvent), { Complete, Add, Remove, Update });
exports.QUANTITY_CHAIN_RECORDS_TO_REQUEST = 10;
exports.STREAMING_CHAINS_NAME_PATTERN = /^(\d*?)#?\.([\w.]+)$/;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtaW5nLWNoYWluLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3ByaWNpbmcvY2hhaW4vc3RyZWFtaW5nLWNoYWluLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvRkFBK0Y7QUFzQy9GLE1BQU0sR0FBRyxHQUFVLEtBQUssQ0FBQztBQUN6QixNQUFNLE1BQU0sR0FBYSxRQUFRLENBQUM7QUFDbEMsTUFBTSxNQUFNLEdBQWEsUUFBUSxDQUFDO0FBQ2xDLE1BQU0sUUFBUSxHQUFlLFVBQVUsQ0FBQztBQUUzQixRQUFBLEtBQUssbUNBQVEsb0NBQVUsS0FBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLElBQUc7QUFFekQsUUFBQSxpQ0FBaUMsR0FBRyxFQUFFLENBQUM7QUFFdkMsUUFBQSw2QkFBNkIsR0FBRyxzQkFBc0IsQ0FBQyJ9