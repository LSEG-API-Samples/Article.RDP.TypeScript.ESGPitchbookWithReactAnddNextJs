"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLocalSessionLoginData = exports.buildRdpSessionLoginData = void 0;
const config_1 = require("../config");
const get_position_1 = require("./get-position");
function buildRdpSessionLoginData(params) {
    const { dacs = {}, accessToken, userName } = params;
    return {
        applicationId: dacs.applicationId,
        position: dacs.position || get_position_1.getPosition(),
        authenticationToken: accessToken,
        name: dacs.userName || userName,
        nameType: 'AuthnToken',
    };
}
exports.buildRdpSessionLoginData = buildRdpSessionLoginData;
function buildLocalSessionLoginData(dacs = {}) {
    const trepDacsConfig = config_1.config.get('sessions').platform['default-session']['realtime-distribution-system'].dacs;
    return {
        applicationId: dacs.applicationId || trepDacsConfig['application-id'],
        position: dacs.position || trepDacsConfig.position,
        name: dacs.userName || trepDacsConfig.username,
    };
}
exports.buildLocalSessionLoginData = buildLocalSessionLoginData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLWxvZ2luLXJlcXVlc3QtY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWwvc3RyZWFtLWxvZ2luLXJlcXVlc3QtY29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHNDQUFtQztBQUduQyxpREFBNkM7QUFPN0MsU0FBZ0Isd0JBQXdCLENBQUMsTUFBcUI7SUFDMUQsTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQztJQUVwRCxPQUFPO1FBQ0gsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1FBQ2pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLDBCQUFXLEVBQUU7UUFDeEMsbUJBQW1CLEVBQUUsV0FBVztRQUNoQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRO1FBQy9CLFFBQVEsRUFBRSxZQUFZO0tBQ3pCLENBQUM7QUFDTixDQUFDO0FBVkQsNERBVUM7QUFLRCxTQUFnQiwwQkFBMEIsQ0FBQyxPQUFhLEVBQUU7SUFDdEQsTUFBTSxjQUFjLEdBQUcsZUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUUvRyxPQUFPO1FBQ0gsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLElBQUksY0FBYyxDQUFDLGdCQUFnQixDQUFDO1FBQ3JFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLGNBQWMsQ0FBQyxRQUFRO1FBQ2xELElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLGNBQWMsQ0FBQyxRQUFRO0tBQ2pELENBQUM7QUFDTixDQUFDO0FBUkQsZ0VBUUMifQ==