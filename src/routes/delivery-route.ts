import express from 'express';
import { CalculateDelivery } from '../controllers/delivery-controllers';

const router = express.Router();

router.post('/calculate-delivery', CalculateDelivery);

export {router}
