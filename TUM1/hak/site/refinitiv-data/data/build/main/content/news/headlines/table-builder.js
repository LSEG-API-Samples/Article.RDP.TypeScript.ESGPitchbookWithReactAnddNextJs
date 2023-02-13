"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBuilderImp = void 0;
const logger_1 = require("../../../logger");
class TableBuilderImp {
    constructor(defaultTable = {}, log = logger_1.logger.getLogger('builder:headlines')) {
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
        return !!(data && data.data);
    }
    doBuild(responseData) {
        const { data } = responseData;
        return data.reduce((prev, { storyId, newsItem }, i) => {
            prev[i] = Object.assign({ storyId }, newsItem);
            return prev;
        }, this.defaultTable);
    }
}
exports.TableBuilderImp = TableBuilderImp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L25ld3MvaGVhZGxpbmVzL3RhYmxlLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQWlEO0FBSWpELE1BQWEsZUFBZTtJQUN4QixZQUFvQixlQUFzQixFQUFTLEVBQVUsTUFBYyxlQUFNLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDO1FBQTVGLGlCQUFZLEdBQVosWUFBWSxDQUFtQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQWdEO0lBQUcsQ0FBQztJQUU3RyxLQUFLLENBQUMsSUFBVTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDNUI7UUFFRCxJQUFJO1lBQ0EsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRU8sZUFBZSxDQUFDLElBQVU7UUFDOUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxPQUFPLENBQUMsWUFBa0I7UUFDOUIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLFlBQVksQ0FBQztRQUU5QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFDSCxPQUFPLElBQ0osUUFBUSxDQUNkLENBQUM7WUFDRixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDSjtBQS9CRCwwQ0ErQkMifQ==