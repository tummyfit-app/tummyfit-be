"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        status: "success",
    });
});
app.use("/api/v1", UserRoute_1.default);
const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
    console.log(`Server is listening to PORT ${process.env.PORT}`);
});
