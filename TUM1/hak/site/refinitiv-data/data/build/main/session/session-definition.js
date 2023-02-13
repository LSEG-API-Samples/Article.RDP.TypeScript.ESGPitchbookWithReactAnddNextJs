"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionDefinitionImpl = void 0;
class SessionDefinitionImpl {
    constructor(sessionCreator) {
        this.sessionCreator = sessionCreator;
    }
    getSession() {
        return this.sessionCreator();
    }
}
exports.SessionDefinitionImpl = SessionDefinitionImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi1kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Nlc3Npb24vc2Vzc2lvbi1kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEscUJBQXFCO0lBQzlCLFlBQW9CLGNBQTZCO1FBQTdCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO0lBQUcsQ0FBQztJQUU5QyxVQUFVO1FBQ2IsT0FBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBTkQsc0RBTUMifQ==