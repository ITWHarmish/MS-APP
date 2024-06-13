"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const helper_1 = require("../../utils/helper");
const router = (0, express_1.Router)();
router.get("/calander-list/:uid", middleware_1.gAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Google Calendar'] */
    const calendar = yield (0, helper_1.getCalender)(req.params.uid);
    const list = yield calendar.calendarList.list();
    return res.status(200).json(list.data);
}));
router.get("/calander-events/:uid", middleware_1.gAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Google Calendar'] */
    const calendar = yield (0, helper_1.getCalender)(req.params.uid);
    const list = yield calendar.events.list({
        calendarId: "itw.divyap@gmail.com",
    });
    return res.status(200).json(list.data);
}));
exports.default = router;
