"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const index_1 = __importDefault(require("./routes/index"));
const socket_1 = __importDefault(require("./socket"));
const swaggerFile = require("../swagger-output.json");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb", parameterLimit: 1000000 }));
app.use(body_parser_1.default.json());
socket_1.default.connect(server);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}))
    .catch((error) => {
    throw error;
});
app.use("/doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerFile));
(0, index_1.default)(app);
