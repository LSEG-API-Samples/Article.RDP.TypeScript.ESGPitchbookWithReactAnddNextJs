"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandshakePayload = void 0;
const DEFAULT_SCOPE = 'rapi';
const getHandshakePayload = (appKey, uuid) => {
    return {
        AppKey: appKey,
        AppScope: DEFAULT_SCOPE,
        ApiVersion: '^1.0.0',
        LibraryName: 'Refinitiv Data Library for TS/JS',
        LibraryVersion: '3.5.0-beta',
        Uuid: uuid,
    };
};
exports.getHandshakePayload = getHandshakePayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZHNoYWtlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hhbmRzaGFrZS9oYW5kc2hha2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDO0FBRXRCLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxNQUFjLEVBQUUsSUFBYSxFQUFvQixFQUFFO0lBQ25GLE9BQU87UUFDSCxNQUFNLEVBQUUsTUFBTTtRQUNkLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLFdBQVcsRUFBRSxrQ0FBa0M7UUFDL0MsY0FBYyxFQUFFLFlBQVk7UUFDNUIsSUFBSSxFQUFFLElBQUk7S0FDYixDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBVFcsUUFBQSxtQkFBbUIsdUJBUzlCIn0=