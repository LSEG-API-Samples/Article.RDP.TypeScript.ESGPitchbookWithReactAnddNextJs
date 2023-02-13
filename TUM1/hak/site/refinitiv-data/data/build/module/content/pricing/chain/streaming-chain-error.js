"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingChainError = void 0;
class StreamingChainError extends Error {
    constructor(m, name) {
        super(m);
        this.name = name;
        Object.setPrototypeOf(this, StreamingChainError.prototype);
    }
}
exports.StreamingChainError = StreamingChainError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtaW5nLWNoYWluLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvcHJpY2luZy9jaGFpbi9zdHJlYW1pbmctY2hhaW4tZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxtQkFBb0IsU0FBUSxLQUFLO0lBQzFDLFlBQVksQ0FBUyxFQUFrQixJQUFZO1FBQy9DLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUQwQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBSS9DLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDSjtBQVBELGtEQU9DIn0=