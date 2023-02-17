"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_adapter_1 = require("@h4ad/serverless-adapter");
const aws_1 = require("@h4ad/serverless-adapter/lib/adapters/aws");
const express_1 = require("@h4ad/serverless-adapter/lib/frameworks/express");
const default_1 = require("@h4ad/serverless-adapter/lib/handlers/default");
const promise_1 = require("@h4ad/serverless-adapter/lib/resolvers/promise");
const server_1 = __importDefault(require("./server"));
exports.handler = serverless_adapter_1.ServerlessAdapter.new(server_1.default)
    .setFramework(new express_1.ExpressFramework())
    .setHandler(new default_1.DefaultHandler())
    .setResolver(new promise_1.PromiseResolver())
    .addAdapter(new aws_1.ApiGatewayV2Adapter())
    .build();
