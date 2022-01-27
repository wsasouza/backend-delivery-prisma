import { Request, Response } from "express";
import { FindAllDeliveryAvailableUseCase } from "./FindAllDeliveryAvailableUseCase";

export class FindAllDeliveryAvailableController {
  async handle(request: Request, response: Response) {
    const findAllDeliveryAvailableUseCase =
      new FindAllDeliveryAvailableUseCase();

    const deliveries = await findAllDeliveryAvailableUseCase.execute();

    return response.json(deliveries);
  }
}
