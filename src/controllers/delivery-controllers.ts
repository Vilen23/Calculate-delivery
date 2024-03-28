import { Request, Response } from "express";
import { PrismaClient,ItemType } from "@prisma/client";
import { errorHandler } from "../utils/error-handler";
import { calcDeliverySchema } from "../validation/calc-delivery";

const prisma = new PrismaClient();

const CalculateDelivery = async (req: Request, res: Response) => {
  try {
    const { zone, organisationId, totalDistance, itemType } = req.query;
    const response = calcDeliverySchema.safeParse(req.query);
    
    if (!response.success){
      console.log(response.error);
      return res.status(400).json({error: response.error.issues[0].message});
    }
    

    const pricing = await prisma.pricing.findFirst({
      where: {
        organisationId: organisationId as string,
        zone: zone as string,
        item: {
          type: itemType as ItemType,
        },
      },
    });
    if (!pricing) return res.status(404).json({ error: "Pricing not found" });

    let totalPrice = pricing.fixPrice * 100; // cents
    if (Number(totalDistance) > pricing.baseDistanceInKm) {
      totalPrice += (Number(totalDistance) - pricing.baseDistanceInKm) * pricing.kmPrice * 100;
    }

    return res
      .status(200)
      .json({ success: true, total_price: totalPrice + " cents" });
  } catch (error) {
    return errorHandler(500, String(error), res);
  }
};

export { CalculateDelivery };
