"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBuilderImp = void 0;
const logger_1 = require("../../../logger");
class TableBuilderImp {
    constructor(defaultTable = {}, log = logger_1.logger.getLogger('builder:financialContracts')) {
        this.defaultTable = defaultTable;
        this.log = log;
    }
    build(data) {
        if (!this.isTransformable(data)) {
            return this.defaultTable;
        }
        try {
            return this.doBuild(data);
        }
        catch (e) {
            this.log.warn('Can not build a table', e);
            return this.defaultTable;
        }
    }
    isTransformable(data) {
        return !!((data === null || data === void 0 ? void 0 : data.data) && data.headers);
    }
    doBuild(responseData) {
        const { data, headers } = responseData;
        return data.reduce((prev, current, index) => {
            current.forEach((value, i) => {
                prev[index] = Object.assign(Object.assign({}, prev[index]), { [headers[i].name]: value });
            });
            return prev;
        }, this.defaultTable);
    }
}
exports.TableBuilderImp = TableBuilderImp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL3RhYmxlLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQWlEO0FBSWpELE1BQWEsZUFBZTtJQUN4QixZQUFvQixlQUFlLEVBQVMsRUFBVSxNQUFjLGVBQU0sQ0FBQyxTQUFTLENBQUMsNEJBQTRCLENBQUM7UUFBOUYsaUJBQVksR0FBWixZQUFZLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUF5RDtJQUFHLENBQUM7SUFFL0csS0FBSyxDQUFDLElBQVU7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVCO1FBRUQsSUFBSTtZQUNBLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVPLGVBQWUsQ0FBQyxJQUFVO1FBQzlCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsSUFBSSxLQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8sT0FBTyxDQUFDLFlBQWtCO1FBQzlCLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsWUFBWSxDQUFDO1FBRXZDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQ0FDSixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQ2QsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxHQUMzQixDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDSjtBQWpDRCwwQ0FpQ0MifQ==