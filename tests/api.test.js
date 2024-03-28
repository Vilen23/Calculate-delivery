const request = require('supertest');
const app = require('../dist/index');

describe('API Tests', () => {

    let server;

    beforeAll(() => {
        server = app.listen(3000);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should calculate delivery price correctly', async () => {
      const res = await request(app)
        .post('/api/v1/delivery/calculate-delivery')
        .query({
          zone: 'central',
          organisationId: '54',
          totalDistance: '20',
          itemType: 'perishable'
        });
  
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.total_price).toBeDefined();
    });

    //Negative total distance
    it('should return 400 for negative totalDistance', async () => {
        const res = await request(app)
          .post('/api/v1/delivery/calculate-delivery')
          .query({
            zone: 'central',
            organisationId: '54',
            totalDistance: '-20', // Negative totalDistance
            itemType: 'perishable'
          });
    
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Total distance must be positive');
      });

      //organisation not in pricng
    it('should return 400 for negative totalDistance', async () => {
        const res = await request(app)
          .post('/api/v1/delivery/calculate-delivery')
          .query({
            zone: 'central',
            organisationId: 'wrongid',
            totalDistance: '20', // Negative totalDistance
            itemType: 'perishable'
          });
    
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Pricing not found');
      });
    
  });
  
