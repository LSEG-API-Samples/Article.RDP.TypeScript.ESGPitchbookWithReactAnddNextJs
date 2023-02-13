"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBuilderImp = void 0;
const logger_1 = require("../../../logger");
const interfaces_1 = require("./interfaces");
class TableBuilderImp {
    constructor(defaultTable = {}, log = logger_1.logger.getLogger('builder:symbolConversion')) {
        this.defaultTable = defaultTable;
        this.log = log;
    }
    build({ data, params }) {
        if (!this.isTransformable(data, params)) {
            return this.defaultTable;
        }
        try {
            return this.doBuild(data, params);
        }
        catch (e) {
            this.log.warn('Can not build a table', e);
            return this.defaultTable;
        }
    }
    isTransformable(data, params) {
        return !!(data && data.Matches && Object.keys(data.Matches).length) && !!(params && params.toSymbolType && params.symbols);
    }
    doBuild(data, params) {
        const { Matches: matches } = data;
        const { toSymbolType, symbols } = params;
        return symbols.reduce((res, item) => {
            const match = matches[item];
            if (!match) {
                return Object.assign(Object.assign({}, res), { [item]: { error: `No data for ${item}.` } });
            }
            return Object.assign(Object.assign({}, res), { [item]: this.getSymbolConversionResponseItem(match, toSymbolType) });
        }, this.defaultTable);
    }
    getSymbolConversionResponseItem(match, toSymbolType) {
        return toSymbolType.reduce((res, key) => {
            const prop = interfaces_1.SearchToSymbolConversion[key];
            const value = match[key];
            return value ? Object.assign(Object.assign({}, res), { [prop]: value }) : Object.assign({}, res);
        }, {});
    }
}
exports.TableBuilderImp = TableBuilderImp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3NlYXJjaC9zeW1ib2wtY29udmVyc2lvbi90YWJsZS1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUFpRDtBQUVqRCw2Q0FBbUg7QUFFbkgsTUFBYSxlQUFlO0lBQ3hCLFlBQW9CLGVBQXNCLEVBQVMsRUFBVSxNQUFjLGVBQU0sQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUM7UUFBbkcsaUJBQVksR0FBWixZQUFZLENBQW1CO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBdUQ7SUFBRyxDQUFDO0lBRXBILEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQWtCO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDNUI7UUFFRCxJQUFJO1lBQ0EsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNyQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVPLGVBQWUsQ0FBQyxJQUFVLEVBQUUsTUFBd0I7UUFDeEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0gsQ0FBQztJQUVPLE9BQU8sQ0FBQyxJQUFVLEVBQUUsTUFBd0I7UUFDaEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDbEMsTUFBTSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFFekMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ2hDLE1BQU0sS0FBSyxHQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVqQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLHVDQUNPLEdBQUcsS0FDTixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsSUFBSSxHQUFHLEVBQUUsSUFDM0M7YUFDTDtZQUNELHVDQUNPLEdBQUcsS0FDTixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLElBQ25FO1FBQ04sQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU8sK0JBQStCLENBQUMsS0FBVSxFQUFFLFlBQTBCO1FBQzFFLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNwQyxNQUFNLElBQUksR0FBRyxxQ0FBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFekIsT0FBTyxLQUFLLENBQUMsQ0FBQyxpQ0FBTSxHQUFHLEtBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUcsQ0FBQyxtQkFBTSxHQUFHLENBQUUsQ0FBQztRQUMxRCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDWCxDQUFDO0NBQ0o7QUFoREQsMENBZ0RDIn0=