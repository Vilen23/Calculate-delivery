import * as z from "zod";

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

export { calcDeliverySchema}