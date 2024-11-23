import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PropertyService } from '../service/property.service';

export class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  public getProperty: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.propertyService.getProperty(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getProperties: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { page, size } = req.query;
      const pageNumber = page ? parseInt(page as string, 10) : 1;
      const sizeNumber = size ? parseInt(size as string, 10) : 10;
      const data = await this.propertyService.getProperties(
        pageNumber,
        sizeNumber,
      );
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public searchProperties: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { query } = req.query;
      const data = await this.propertyService.searchProperties(query as string);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public createProperty: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {
        name,
        description,
        price,
        rooms,
        size,
        address,
        developer,
        project,
      } = req.body;
      const data = await this.propertyService.createProperty({
        name,
        description,
        price,
        rooms,
        size,
        address,
        developer,
        project,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  public updateProperty: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id, name, description, price, rooms, size, address } = req.body;
      const data = await this.propertyService.updateProperty(id, {
        name,
        description,
        price,
        rooms,
        size,
        address,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public deleteProperty: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.body;
      const data = await this.propertyService.deleteProperty(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
