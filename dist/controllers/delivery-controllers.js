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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateDelivery = void 0;
const client_1 = require("@prisma/client");
const error_handler_1 = require("../utils/error-handler");
const calc_delivery_1 = require("../validation/calc-delivery");
const prisma = new client_1.PrismaClient();
const CalculateDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { zone, organisationId, totalDistance, itemType } = req.query;
        const response = calc_delivery_1.calcDeliverySchema.safeParse(req.query);
        if (!response.success) {
            console.log(response.error);
            return res.status(400).json({ error: response.error.issues[0].message });
        }
        const pricing = yield prisma.pricing.findFirst({
            where: {
                organisationId: organisationId,
                zone: zone,
                item: {
                    type: itemType,
                },
            },
        });
        if (!pricing)
            return res.status(404).json({ error: "Pricing not found" });
        let totalPrice = pricing.fixPrice * 100; // cents
        if (Number(totalDistance) > pricing.baseDistanceInKm) {
            totalPrice += (Number(totalDistance) - pricing.baseDistanceInKm) * pricing.kmPrice * 100;
        }
        return res
            .status(200)
            .json({ success: true, total_price: totalPrice + " cents" });
    }
    catch (error) {
        return (0, error_handler_1.errorHandler)(500, String(error), res);
    }
});
exports.CalculateDelivery = CalculateDelivery;
