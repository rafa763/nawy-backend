import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PropertyService } from '../service/property.service';
import ValidationError from '../error/validation.error';

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
      const sizeNumber = Math.min(size ? parseInt(size as string, 10) : 10, 20);
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
        floor,
        size,
        street,
        city,
        zip,
        country,
        developerName,
        developerDescription,
        projectName,
      } = req.body;

      const image = req.file?.buffer;

      if (!image) {
        throw new ValidationError('Image is required');
      }

      const data = await this.propertyService.createProperty(
        {
          name,
          description,
          price: parseFloat(price),
          rooms: parseInt(rooms, 10),
          size: parseFloat(size),
          imageUrl: null,
          floor: floor ? parseInt(floor, 10) : null,
          address: {
            street,
            city,
            zip,
            country,
          },
          developer: {
            name: developerName,
            description: developerDescription,
          },
          project: {
            name: projectName,
          },
        },
        image,
      );
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };
}
