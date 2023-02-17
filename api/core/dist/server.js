"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("@adminjs/express"));
const prisma_1 = require("@adminjs/prisma");
const client_1 = require("@prisma/client");
const adminjs_1 = __importDefault(require("adminjs"));
const express_2 = __importDefault(require("express"));
const PORT = process.env.port || 3000;
const prisma = new client_1.PrismaClient();
adminjs_1.default.registerAdapter({ Database: prisma_1.Database, Resource: prisma_1.Resource });
const app = (0, express_2.default)();
// `_baseDmmf` contains necessary Model metadata. `PrismaClient` type doesn't have it included
const dmmf = prisma._baseDmmf;
const admin = new adminjs_1.default({
    resources: [
        {
            resource: { model: dmmf.modelMap.Project, client: prisma },
            options: {}
        },
        {
            resource: { model: dmmf.modelMap.Challenge, client: prisma },
            options: {}
        },
        {
            resource: { model: dmmf.modelMap.ProjectStack, client: prisma },
            options: {}
        },
        {
            resource: { model: dmmf.modelMap.ChallengeStack, client: prisma },
            options: {}
        },
        {
            resource: { model: dmmf.modelMap.Tech, client: prisma },
            options: {}
        }
    ]
});
const router = express_1.default.buildRouter(admin);
app.use(admin.options.rootPath, router);
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
exports.default = app;
