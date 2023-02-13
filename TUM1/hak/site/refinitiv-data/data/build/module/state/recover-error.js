"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverError = void 0;
class RecoverError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, RecoverError.prototype);
    }
}
exports.RecoverError = RecoverError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3Zlci1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdGF0ZS9yZWNvdmVyLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsWUFBYSxTQUFRLEtBQUs7SUFDbkMsWUFBWSxPQUFlO1FBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0o7QUFMRCxvQ0FLQyJ9