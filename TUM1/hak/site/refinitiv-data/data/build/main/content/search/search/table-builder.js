"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBuilderImp = void 0;
const logger_1 = require("../../../logger");
class TableBuilderImp {
    constructor(defaultTable = {}, log = logger_1.logger.getLogger('builder:search')) {
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
        return !!(data && data.Hits);
    }
    doBuild(data) {
        const { Hits } = data;
        return Hits.reduce((prev, current, index) => {
            return Object.assign(Object.assign({}, prev), { [index]: current });
        }, this.defaultTable);
    }
}
exports.TableBuilderImp = TableBuilderImp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3NlYXJjaC9zZWFyY2gvdGFibGUtYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBaUQ7QUFJakQsTUFBYSxlQUFlO0lBQ3hCLFlBQW9CLGVBQXNCLEVBQVMsRUFBVSxNQUFjLGVBQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7UUFBekYsaUJBQVksR0FBWixZQUFZLENBQW1CO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBNkM7SUFBRyxDQUFDO0lBRTFHLEtBQUssQ0FBQyxJQUFVO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUM1QjtRQUVELElBQUk7WUFDQSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFTyxlQUFlLENBQUMsSUFBVTtRQUM5QixPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVPLE9BQU8sQ0FBQyxJQUFVO1FBQ3RCLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN4Qyx1Q0FDTyxJQUFJLEtBQ1AsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLElBQ2xCO1FBQ04sQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0o7QUE5QkQsMENBOEJDIn0=