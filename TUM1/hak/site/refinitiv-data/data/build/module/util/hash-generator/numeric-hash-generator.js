"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericHashGenerator = void 0;
const abstract_hash_generator_1 = require("./abstract-hash-generator");
const number_generator_1 = require("./number-generator");
class NumericHashGenerator extends abstract_hash_generator_1.AbstractHashGenerator {
    factoryMethod() {
        return new number_generator_1.NumberGenerator();
    }
}
exports.NumericHashGenerator = NumericHashGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1oYXNoLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlsL2hhc2gtZ2VuZXJhdG9yL251bWVyaWMtaGFzaC1nZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUVBQWlGO0FBQ2pGLHlEQUFxRDtBQUVyRCxNQUFhLG9CQUFxQixTQUFRLCtDQUE2QjtJQUN6RCxhQUFhO1FBQ25CLE9BQU8sSUFBSSxrQ0FBZSxFQUFFLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBSkQsb0RBSUMifQ==