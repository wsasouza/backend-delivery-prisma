import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (deliverymanExist) {
      throw new Error("Deliveryman already exists");
    }

    const hashPassword = await hash(password, 10);

    const { id, username: deliveryman } = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    const client = {
      id,
      deliveryman,
    };

    return client;
  }
}
