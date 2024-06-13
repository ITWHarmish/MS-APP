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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const TimelogController = __importStar(require("../controllers/timelog"));
const helper_1 = require("../utils/helper");
const router = (0, express_1.Router)();
const jsonParser = body_parser_1.default.json();
router.get("/timelog/upload", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Timelog']
      #swagger.description = 'Endpoint to upload timelog.' */
    let ApiResponse = { code: 200, data: "" };
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield TimelogController.uploadTimelogToDrive(req.query.uid);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.get("/timelog/all", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Timelog']
      #swagger.description = 'Endpoint to get all user timelog.' */
    let ApiResponse = { code: 200, data: "" };
    if (req.query.startDate === "")
        res.status(500).send({ error: "missing startDate query. timelog startDate required!" });
    if (req.query.endDate === "")
        res.status(500).send({ error: "missing endDate query. timelog endDate required!" });
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield TimelogController.getAllTimelogs(req.query);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.get("/timelog", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Timelog']
        #swagger.description = 'Endpoint to get the specific user timelog.' */
    let ApiResponse = { code: 200, data: "" };
    if (req.query.uid === "")
        res.status(500).send({ error: "missing uid query. timelog uid required!" });
    if (req.query.date === "")
        res.status(500).send({ error: "missing date query. timelog date required!" });
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield TimelogController.readTimelog(req.query);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.post("/timelog/add", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Timelog']
      #swagger.description = 'Endpoint to add specific user timelog.' */
    let ApiResponse = { code: 200, data: "" };
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield TimelogController.createTimelog(req.body);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.put("/timelog/update", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Timelog']
      #swagger.description = 'Endpoint to update specific user timelog.' */
    let ApiResponse = { code: 200, data: "" };
    if (req.query.id === "")
        res.status(500).send({ error: "missing id query. timelog id required!" });
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield TimelogController.updateTimelog(req.query.id, req.body);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.delete("/timelog/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Timelog']
      #swagger.description = 'Endpoint to delete specific user timelog.' */
    let ApiResponse = { code: 200, data: "" };
    if (req.query.id === "")
        res.status(500).send({ error: "missing id query. timelog id required!" });
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield TimelogController.deleteTimelog(req.query.id);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.get("/timelog/totalhours", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Timelog']
      #swagger.description = 'Endpoint to get the specific user timelog total hours.' */
    let ApiResponse = { code: 200, data: "" };
    if (req.query.uid === "")
        res.status(500).send({ error: "missing uid query. timelog uid required!" });
    if (req.query.startDate === "")
        res.status(500).send({ error: "missing startDate query. timelog startDate required!" });
    if (req.query.endDate === "")
        res.status(500).send({ error: "missing endDate query. timelog endDate required!" });
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield TimelogController.getTotalHours(req.query.uid, req.query.startDate, req.query.endDate);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.get("/timelog/timeloghours", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Timelog']
      #swagger.description = 'Endpoint to get the specific user timelog hours.' */
    let ApiResponse = { code: 200, data: "" };
    if (req.query.uid === "")
        res.status(500).send({ error: "missing uid query. timelog uid required!" });
    if (req.query.date === "")
        res.status(500).send({ error: "missing date query. timelog date required!" });
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield TimelogController.getTimelogHours(req.query.uid, req.query.date);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.get("/timelog/projecthours", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Timelog']
      #swagger.description = 'Endpoint to get the specific user project timelog.' */
    let ApiResponse = { code: 200, data: "" };
    if (req.query.uid === "")
        res.status(500).send({ error: "missing uid query. timelog uid required!" });
    if (req.query.startDate === "")
        res.status(500).send({ error: "missing startDate query. timelog startDate required!" });
    if (req.query.endDate === "")
        res.status(500).send({ error: "missing endDate query. timelog endDate required!" });
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield TimelogController.projectHours(req.query.uid, req.query.startDate, req.query.endDate);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
exports.default = router;
