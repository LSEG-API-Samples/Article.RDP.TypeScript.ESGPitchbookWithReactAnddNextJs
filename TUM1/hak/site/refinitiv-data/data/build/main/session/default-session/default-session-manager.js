"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSessionManagerImpl = void 0;
const logger_1 = require("../../logger");
const is_session_instance_1 = require("../../util/is-session-instance");
class DefaultSessionManagerImpl {
    constructor() {
        this.getDefault = () => {
            if (!this.defaultSession) {
                this.log.error('No default session created yet. Please create a session first!');
                throw new Error('No default session created yet. Please create a session first!');
            }
            return this.defaultSession;
        };
        this.setDefault = (session) => {
            if (session === null) {
                this.log.debug('Remove a reference to a default session instance.');
                this.defaultSession = void 0;
                return this.defaultSession;
            }
            this.log.debug('New default session assigning...');
            if (!is_session_instance_1.isSessionInstance(session)) {
                this.log.error('Invalid argument.');
                throw new TypeError('Invalid argument.');
            }
            this.defaultSession = session;
            this.log.debug('Default session has been assigned successfully.');
            return void 0;
        };
        this.log = logger_1.logger.getLogger('session:default');
        this.log.debug('Create an instance of DefaultSessionManager');
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
}
exports.DefaultSessionManagerImpl = DefaultSessionManagerImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1zZXNzaW9uLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2Vzc2lvbi9kZWZhdWx0LXNlc3Npb24vZGVmYXVsdC1zZXNzaW9uLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQThDO0FBRTlDLHdFQUFtRTtBQUduRSxNQUFhLHlCQUF5QjtJQWFsQztRQUtPLGVBQVUsR0FBa0IsR0FBRyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO2dCQUNqRixNQUFNLElBQUksS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7YUFDckY7WUFFRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQyxDQUFDO1FBRUssZUFBVSxHQUFzQyxDQUFDLE9BQXVCLEVBQUUsRUFBRTtZQUMvRSxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7Z0JBQ3BFLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQzthQUM5QjtZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFFbkQsSUFBSSxDQUFDLHVDQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLElBQUksU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDNUM7WUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztZQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1lBRWxFLE9BQU8sS0FBSyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDO1FBL0JFLElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQWRNLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUM5QjtRQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0NBc0NKO0FBOUNELDhEQThDQyJ9