"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = void 0;
const formatTime = (seconds) => {
    const moreThatMinute = seconds >= 60;
    const time = moreThatMinute ? seconds / 60 : seconds;
    const unit = moreThatMinute ? 'minute' : 'second';
    const ending = time > 1 ? 's' : '';
    return `${time} ${unit}${ending}`;
};
exports.formatTime = formatTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL3RpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRTtJQUMxQyxNQUFNLGNBQWMsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ3JDLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3JELE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDbEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFbkMsT0FBTyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBUFcsUUFBQSxVQUFVLGNBT3JCIn0=