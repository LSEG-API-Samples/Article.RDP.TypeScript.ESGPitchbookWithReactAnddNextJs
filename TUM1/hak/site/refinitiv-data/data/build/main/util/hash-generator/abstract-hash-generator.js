"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractHashGenerator = void 0;
class AbstractHashGenerator {
    generateHash() {
        const hashGenerator = this.factoryMethod();
        return hashGenerator.generate();
    }
}
exports.AbstractHashGenerator = AbstractHashGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtaGFzaC1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbC9oYXNoLWdlbmVyYXRvci9hYnN0cmFjdC1oYXNoLWdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxNQUFzQixxQkFBcUI7SUFHaEMsWUFBWTtRQUNmLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQyxPQUFPLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0NBQ0o7QUFQRCxzREFPQyJ9