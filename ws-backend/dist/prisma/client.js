"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client = global.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV === "production")
    global.prisma = client;
exports.default = client;
