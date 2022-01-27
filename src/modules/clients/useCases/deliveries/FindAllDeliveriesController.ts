import { Request, Response } from "express";
import { FindAllDeliveriesUseCase } from "./FindAllDeliveriesUseCase";

export class FindAllDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id_client } = request;

    const findAllDeliveryAvailableUseCase = new FindAllDeliveriesUseCase();
    const deliveries = await findAllDeliveryAvailableUseCase.execute(id_client);

    return response.json(deliveries);
  }
}
