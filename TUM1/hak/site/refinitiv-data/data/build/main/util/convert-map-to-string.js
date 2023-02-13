"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMapToString = void 0;
const convertMapToString = (map) => {
    const temp = [...map].reduce((acc, val) => {
        return [...acc, `${val[0]} ${val[1]}`];
    }, []);
    return temp.join();
};
exports.convertMapToString = convertMapToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1tYXAtdG8tc3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWwvY29udmVydC1tYXAtdG8tc3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFPLE1BQU0sa0JBQWtCLEdBQUcsQ0FBTyxHQUFjLEVBQVUsRUFBRTtJQUMvRCxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUMsRUFBRSxFQUFjLENBQUMsQ0FBQztJQUVuQixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN2QixDQUFDLENBQUM7QUFOVyxRQUFBLGtCQUFrQixzQkFNN0IifQ==