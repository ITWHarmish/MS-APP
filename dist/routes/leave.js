"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const LeaveController = __importStar(require("../controllers/leave"));
const helper_1 = require("../utils/helper");
const router = (0, express_1.Router)();
router.get("/leave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Leave'] */
    let ApiResponse = { code: 200, data: "" };
    const uid = req.query.uid;
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield LeaveController.readLeave(uid);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.post("/leave/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Leave'] */
    let ApiResponse = { code: 200, data: null };
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield LeaveController.createLeave(req.body);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.put("/leave/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Leave'] */
    let ApiResponse = { code: 200, data: null };
    if (req.query.id === "")
        res.status(500).send({ error: "missing id query. leave id required!" });
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield LeaveController.updateLeave(req.query.id, req.body);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.delete("/leave/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Leave'] */
    let ApiResponse = { code: 200, data: "" };
    if (req.query.id === "")
        res.status(500).send({ error: "missing id query. leave id required!" });
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield LeaveController.deleteLeave(req.query.id);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
exports.default = router;
