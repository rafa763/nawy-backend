import db from '../repo/db';
import { IPropertyModel } from '../middleware/propertyModel.interface';

export class Property implements IPropertyModel {
  async getAll(page: number = 1, size: number = 10) {
    const [properties, total] = await Promise.all([
      db.property.findMany({
        skip: (page - 1) * size,
        take: size,
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          rooms: true,
          size: true,
          imageUrl: true,
        },
      }),
      db.property.count(),
    ]);

    return {
      data: properties,
      total,
      page,
      size,
    };
  }

  async get(id: string) {
    const property = await db.property.findUnique({
      where: { id },
      include: {
        address: true,
        developer: true,
        project: true,
      },
    });
    return property;
  }

  async save(property: any) {
    const { address, developer, project, ...propertyData } = property;
    const res = await db.property.create({
      data: {
        ...propertyData,
        address: {
          connectOrCreate: {
            where: {
              street_city_zip_country: {
                street: address.street,
                city: address.city,
                zip: address.zip,
                country: address.country,
              },
            },
            create: {
              street: address.street,
              city: address.city,
              zip: address.zip,
              country: address.country,
            },
          },
        },
        developer: {
          connectOrCreate: {
            where: {
              name: developer.name,
            },
            create: {
              name: developer.name,
              description: developer.description,
            },
          },
        },
        project: {
          connectOrCreate: {
            where: {
              name: project.name,
            },
            create: {
              name: project.name,
            },
          },
        },
      },
    });
    return res;
  }

  async searchProperties(query: string) {
    const properties = await db.property.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            address: {
              street: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            developer: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            project: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        rooms: true,
        size: true,
        imageUrl: true,
      },
    });
    return properties;
  }
}
