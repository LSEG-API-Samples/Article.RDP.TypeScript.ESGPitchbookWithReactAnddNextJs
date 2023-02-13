"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemStreamError = void 0;
class ItemStreamError extends Error {
    constructor(m, response) {
        super(m);
        this.response = response;
        Object.setPrototypeOf(this, ItemStreamError.prototype);
    }
}
exports.ItemStreamError = ItemStreamError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1zdHJlYW0tZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGVsaXZlcnkvc3RyZWFtL2l0ZW0tc3RyZWFtLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsZUFBbUIsU0FBUSxLQUFLO0lBQ3pDLFlBQVksQ0FBUyxFQUFrQixRQUFXO1FBQzlDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUQwQixhQUFRLEdBQVIsUUFBUSxDQUFHO1FBSTlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0o7QUFQRCwwQ0FPQyJ9