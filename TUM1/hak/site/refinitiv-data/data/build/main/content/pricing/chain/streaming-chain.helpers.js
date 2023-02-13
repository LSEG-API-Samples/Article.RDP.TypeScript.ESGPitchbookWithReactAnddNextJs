"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChainRecordsNames = exports.getNextChainRecordName = exports.getItemStreamInitParams = void 0;
const pricing_stream_interfaces_1 = require("../stream/pricing-stream.interfaces");
const streaming_chain_interface_1 = require("./streaming-chain.interface");
const getItemStreamInitParams = (name, params) => {
    return {
        domain: pricing_stream_interfaces_1.MARKET_PRICE_DOMAIN,
        service: params === null || params === void 0 ? void 0 : params.service,
        api: params === null || params === void 0 ? void 0 : params.api,
        extendedParams: params === null || params === void 0 ? void 0 : params.extendedParams,
        name,
    };
};
exports.getItemStreamInitParams = getItemStreamInitParams;
const getNextChainRecordName = (name) => {
    const match = name.match(streaming_chain_interface_1.STREAMING_CHAINS_NAME_PATTERN);
    if (!match) {
        return '';
    }
    const recordNumber = match[1];
    const instrumentCode = match[2];
    if (!recordNumber) {
        return `1#.${instrumentCode}`;
    }
    return `${Number(recordNumber) + 1}#.${instrumentCode}`;
};
exports.getNextChainRecordName = getNextChainRecordName;
const generateChainRecordsNames = (name, nameGuessingQuantity) => {
    const match = name.match(streaming_chain_interface_1.STREAMING_CHAINS_NAME_PATTERN);
    if (!match) {
        return [];
    }
    const recordNumber = match[1];
    const instrumentCode = match[2];
    return Array.from({ length: nameGuessingQuantity }).map((v, i) => {
        if (!recordNumber && i === 0) {
            return `.${instrumentCode}`;
        }
        if (Number(recordNumber) > 0) {
            return `${Number(recordNumber) + i}#.${instrumentCode}`;
        }
        return `${i}#.${instrumentCode}`;
    });
};
exports.generateChainRecordsNames = generateChainRecordsNames;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtaW5nLWNoYWluLmhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udGVudC9wcmljaW5nL2NoYWluL3N0cmVhbWluZy1jaGFpbi5oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1GQUEwRTtBQUMxRSwyRUFBMkY7QUFFcEYsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLElBQVksRUFBRSxNQUFzQixFQUEwQixFQUFFO0lBQ3BHLE9BQU87UUFDSCxNQUFNLEVBQUUsK0NBQW1CO1FBQzNCLE9BQU8sRUFBRSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsT0FBTztRQUN4QixHQUFHLEVBQUUsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEdBQUc7UUFDaEIsY0FBYyxFQUFFLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxjQUFjO1FBQ3RDLElBQUk7S0FDUCxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBUlcsUUFBQSx1QkFBdUIsMkJBUWxDO0FBRUssTUFBTSxzQkFBc0IsR0FBRyxDQUFDLElBQVksRUFBVSxFQUFFO0lBQzNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMseURBQTZCLENBQUMsQ0FBQztJQUV4RCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUVELE1BQU0sWUFBWSxHQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxNQUFNLGNBQWMsR0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFeEMsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNmLE9BQU8sTUFBTSxjQUFjLEVBQUUsQ0FBQztLQUNqQztJQUVELE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGNBQWMsRUFBRSxDQUFDO0FBQzVELENBQUMsQ0FBQztBQWZXLFFBQUEsc0JBQXNCLDBCQWVqQztBQUVLLE1BQU0seUJBQXlCLEdBQUcsQ0FBQyxJQUFZLEVBQUUsb0JBQTRCLEVBQVksRUFBRTtJQUM5RixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHlEQUE2QixDQUFDLENBQUM7SUFFeEQsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFFRCxNQUFNLFlBQVksR0FBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsTUFBTSxjQUFjLEdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzdELElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQixPQUFPLElBQUksY0FBYyxFQUFFLENBQUM7U0FDL0I7UUFFRCxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssY0FBYyxFQUFFLENBQUM7U0FDM0Q7UUFFRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLGNBQWMsRUFBRSxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBckJXLFFBQUEseUJBQXlCLDZCQXFCcEMifQ==