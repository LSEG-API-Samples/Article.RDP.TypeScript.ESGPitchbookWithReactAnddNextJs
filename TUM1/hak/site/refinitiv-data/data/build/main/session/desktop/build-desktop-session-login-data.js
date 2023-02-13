"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDesktopSessionLoginData = void 0;
function buildDesktopSessionLoginData(params) {
    const { appKey, accessToken, tokenType } = params;
    return {
        applicationId: void 0,
        appKey,
        position: 'localhost',
        authorization: accessToken ? `${tokenType} ${accessToken}` : undefined,
    };
}
exports.buildDesktopSessionLoginData = buildDesktopSessionLoginData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtZGVza3RvcC1zZXNzaW9uLWxvZ2luLWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2Vzc2lvbi9kZXNrdG9wL2J1aWxkLWRlc2t0b3Atc2Vzc2lvbi1sb2dpbi1kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFBLFNBQWdCLDRCQUE0QixDQUFDLE1BQXlCO0lBQ2xFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQztJQUVsRCxPQUFPO1FBQ0gsYUFBYSxFQUFFLEtBQUssQ0FBQztRQUNyQixNQUFNO1FBQ04sUUFBUSxFQUFFLFdBQVc7UUFDckIsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7S0FDekUsQ0FBQztBQUNOLENBQUM7QUFURCxvRUFTQyJ9