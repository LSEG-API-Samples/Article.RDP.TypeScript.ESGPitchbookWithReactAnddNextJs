"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamError = void 0;
class StreamError extends Error {
    constructor(m, name) {
        super(m);
        this.name = name;
        Object.setPrototypeOf(this, StreamError.prototype);
    }
}
exports.StreamError = StreamError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2luZy1zdHJlYW0tZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udGVudC9wcmljaW5nL3N0cmVhbS9wcmljaW5nLXN0cmVhbS1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLFdBQVksU0FBUSxLQUFLO0lBQ2xDLFlBQVksQ0FBUyxFQUFrQixJQUFZO1FBQy9DLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUQwQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBSS9DLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0o7QUFQRCxrQ0FPQyJ9