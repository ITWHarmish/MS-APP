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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAccess_1 = __importDefault(require("../../models/userAccess"));
const helper_1 = require("../../utils/helper");
const router = (0, express_1.Router)();
router.get("/oauthcallback", (req, res) => {
    /*  #swagger.tags = ['Google Auth'] */
    const url = helper_1.oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: helper_1.scopes, // If you only need one scope you can pass it as a string
    });
    res.status(200).json({ url: url });
});
router.get("/retrievetoken/:uid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Google Auth'] */
    try {
        const { tokens } = yield helper_1.oauth2Client.getToken(req.query.code.toString());
        const result = yield userAccess_1.default.findOne({ uid: req.params.uid });
        if (result) {
            yield userAccess_1.default.findByIdAndUpdate(result.id, { google: tokens });
        }
        else {
            const credentials = new userAccess_1.default({ uid: req.params.uid, google: tokens });
            yield credentials.save();
        }
        res.status(200).json({ status: "success" });
    }
    catch (error) {
        res.status(500).json({ status: "error", message: error });
    }
}));
router.get("/checkaccess/:uid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Google Auth'] */
    const result = yield userAccess_1.default.findOne({ uid: req.params.uid });
    if (result && result.google) {
        res.status(200).json({ google: "connected" });
    }
    else {
        res.status(401).send("Unauthorized: Account not connected");
    }
}));
exports.default = router;
