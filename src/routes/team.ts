import { Router, Request, Response } from 'express';
import * as TeamController from '../controllers/team';
import { IResponse } from '../types/IResponse';
import bodyParser from 'body-parser';
import { parseError } from '../utils/helper';

const router: Router = Router();
const jsonParser = bodyParser.json();

/**
 * @swagger
 * tags:
 *  name: Company
 *  description: Company Managing API
 */
/**
 * @swagger
 *  components:
 *    schemas:
 *      Company:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *            description: Company name
 *          owner:
 *            type: string
 *            description: Owner Name
 *          industryType:
 *            type: string
 *            description: type of industry
 *          location:
 *            type: string
 *            description: company location
 *          website:
 *            type: string
 *            description: website URL
 *          contact:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: company email
 *              countryCode:
 *                type: string
 *                description: company phone number Country Code
 *              phone:
 *                type: string
 *                description: company phone number
 *        example:
 *          name: Syntyce Solution
 *          owner: Michael Morris
 *          industryType: Chemical Industries
 *          location: Damascus, Syria
 *          webiste: www.syntycesolution.com
 *          contact:
 *            email: info@syntycesolution.com
 *            countryCode: '+91'
 *            phone: '0123456789'
 */

router.get('/team', jsonParser, async (req: Request, res: Response) => {
  let ApiResponse: IResponse = { code: 200, data: '' };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TeamController.readTeam();
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

/**
 * @swagger
 * /company:
 *  get:
 *    summary: Return Company list
 *    tags: [Company]
 *    responses:
 *      200:
 *        description: list of all company
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Company'
 *      500:
 *        description: server error
 */

router.post('/team/add', jsonParser, async (req: Request, res: Response) => {

  let ApiResponse: IResponse = { code: 200, data: '' };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TeamController.createTeam(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

/**
 * @swagger
 * /company/add:
 *  post:
 *    summary: Create Company Details
 *    tags: [Company]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Company'
 *    responses:
 *      200:
 *        description: Company Sucessfully added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Company'
 *      500:
 *        description: Server Error
 */


export default router;
