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
const CompanyController = __importStar(require("../controllers/company"));
const helper_1 = require("../utils/helper");
const router = (0, express_1.Router)();
const jsonParser = body_parser_1.default.json();
router.get("/company", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Company'] */
    let ApiResponse = { code: 200, data: "" };
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield CompanyController.readCompany();
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.post("/company/add", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Company'] */
    let ApiResponse = { code: 200, data: "" };
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield CompanyController.createCompany(req.body);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.put("/company/update", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Company'] */
    let ApiResponse = { code: 200, data: "" };
    if (req.query.id === "")
        res.status(500).send({ error: "missing id query. company id required!" });
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield CompanyController.updateCompany(req.query.id, req.body);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
router.delete("/company/delete", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Company'] */
    let ApiResponse = { code: 200, data: "" };
    if (req.query.id === "")
        res.status(500).send({ error: "missing id query. company id required!" });
    try {
        ApiResponse.code = 200;
        ApiResponse.data = yield CompanyController.deleteCompany(req.query.id);
    }
    catch (error) {
        ApiResponse = (0, helper_1.parseError)(error);
    }
    finally {
        res.status(ApiResponse.code).send(ApiResponse.data);
    }
}));
exports.default = router;
