import { prisma } from "../../../../database/prismaClient";

interface IUpdateEndDate {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateEndDate) {
    const delivered = await prisma.deliveries.findFirst({
      where: {
        id: id_delivery,
      },
    });

    if (delivered?.end_at) {
      return delivered;
    }

    const result = await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
      data: {
        end_at: new Date(),
      },
    });

    if (result.count !== 1) {
      throw new Error("Failed to update delivery");
    }

    const status = {
      delivered_at: new Date(),
    };

    return status;
  }
}
