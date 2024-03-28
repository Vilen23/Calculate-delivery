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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcDeliverySchema = void 0;
const z = __importStar(require("zod"));
const calcDeliverySchema = z.object({
    zone: z.string().min(1, { message: "Zone is required" }),
    organisationId: z.string().min(1, { message: "Organisation ID is required" }),
    totalDistance: z.string()
        .min(1, { message: "Total distance must be greater than 0" })
        .refine((value) => Number(value) > 0, {
        message: "Total distance must be positive",
    }),
    itemType: z
        .enum(["perishable", "nonperishable"])
        .refine((value) => value === "perishable" || value === "nonperishable", {
        message: 'Item type must be either "perishable" or "nonperishable"',
    }),
});
exports.calcDeliverySchema = calcDeliverySchema;
