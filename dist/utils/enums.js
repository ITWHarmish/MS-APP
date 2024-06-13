"use strict";
// users
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectStatus = exports.UserRoles = void 0;
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["ADMIN"] = 1] = "ADMIN";
    UserRoles[UserRoles["MANAGEMENT"] = 2] = "MANAGEMENT";
    UserRoles[UserRoles["TEAMLEAD"] = 3] = "TEAMLEAD";
    UserRoles[UserRoles["STANDARD"] = 4] = "STANDARD";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
// Project
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["NOT_STARTED"] = 0] = "NOT_STARTED";
    ProjectStatus[ProjectStatus["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    ProjectStatus[ProjectStatus["COMPLETE"] = 2] = "COMPLETE";
    ProjectStatus[ProjectStatus["ON_HOLD"] = 3] = "ON_HOLD";
})(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
