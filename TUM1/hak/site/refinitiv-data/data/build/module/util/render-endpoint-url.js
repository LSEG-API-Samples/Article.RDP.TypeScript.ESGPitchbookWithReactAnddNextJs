"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEndpointUrl = void 0;
const mustache_1 = __importDefault(require("mustache"));
const TAGS = ['{', '}'];
const getPathNames = url => {
    const parseResults = mustache_1.default.parse(url, TAGS);
    return parseResults.map(([type, value]) => (type === 'name' ? value : null)).filter(Boolean);
};
const getMissingField = (url, path) => {
    const requiredNames = getPathNames(url);
    const actualNames = Object.keys(path || {});
    return requiredNames.find(requiredName => !actualNames.includes(requiredName));
};
const renderEndpointUrl = (url, path) => {
    const missingField = getMissingField(url, path);
    if (missingField) {
        throw new Error(`Render URL: path param ${missingField} is missing!`);
    }
    return mustache_1.default.render(url, path, {}, TAGS);
};
exports.renderEndpointUrl = renderEndpointUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWVuZHBvaW50LXVybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL3JlbmRlci1lbmRwb2ludC11cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQWdDO0FBRWhDLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRXhCLE1BQU0sWUFBWSxHQUE4QixHQUFHLENBQUMsRUFBRTtJQUNsRCxNQUFNLFlBQVksR0FBWSxrQkFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFeEQsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqRyxDQUFDLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBbUQsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDbEYsTUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRTVDLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ25GLENBQUMsQ0FBQztBQUVLLE1BQU0saUJBQWlCLEdBQXVDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQy9FLE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFaEQsSUFBSSxZQUFZLEVBQUU7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixZQUFZLGNBQWMsQ0FBQyxDQUFDO0tBQ3pFO0lBRUQsT0FBTyxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUM7QUFSVyxRQUFBLGlCQUFpQixxQkFRNUIifQ==