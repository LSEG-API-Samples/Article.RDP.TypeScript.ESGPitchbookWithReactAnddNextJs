"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBuilderImp = void 0;
const logger_1 = require("../../logger");
class TableBuilderImp {
    constructor(defaultTable = {}, log = logger_1.logger.getLogger('builder:fundamentalAndReference')) {
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
    checkDuplicates(data) {
        const keys = data.map(array => array[0]);
        return new Set(keys).size !== keys.length;
    }
    doBuild(responseData) {
        const { data, headers } = responseData;
        if (this.checkDuplicates(data)) {
            return data.reduce((prev, current, index) => {
                current.forEach((value, i) => {
                    prev[index] = Object.assign(Object.assign({}, prev[index]), { [headers[i].name]: value });
                });
                return prev;
            }, this.defaultTable);
        }
        return data.reduce((prev, current) => {
            const rawKey = current[0];
            current.forEach((value, i) => {
                if (i === 0) {
                    prev[rawKey] = {};
                }
                else {
                    prev[rawKey][headers[i].name] = value;
                }
            });
            return prev;
        }, this.defaultTable);
    }
}
exports.TableBuilderImp = TableBuilderImp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2Z1bmRhbWVudGFsLXJlZmVyZW5jZS90YWJsZS1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUE4QztBQUk5QyxNQUFhLGVBQWU7SUFDeEIsWUFBb0IsZUFBc0IsRUFBUyxFQUFVLE1BQWMsZUFBTSxDQUFDLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQztRQUExRyxpQkFBWSxHQUFaLFlBQVksQ0FBbUI7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUE4RDtJQUFHLENBQUM7SUFFM0gsS0FBSyxDQUFDLElBQVU7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVCO1FBRUQsSUFBSTtZQUNBLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVPLGVBQWUsQ0FBQyxJQUFVO1FBQzlCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsSUFBSSxLQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8sZUFBZSxDQUFDLElBQW1DO1FBQ3ZELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzlDLENBQUM7SUFFTyxPQUFPLENBQUMsWUFBa0I7UUFDOUIsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxZQUFZLENBQUM7UUFFdkMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsbUNBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUNkLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssR0FDM0IsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3pCO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDckI7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQ3pDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDSjtBQXBERCwwQ0FvREMifQ==