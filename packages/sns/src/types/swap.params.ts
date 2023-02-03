import type { NeuronId } from "../../candid/sns_governance";
import type { E8s } from "./common";

/**
 * The parameters to create a sale ticket (payment flow)
 */
export interface NewSaleTicketParams {
  neuronId: NeuronId;
  amount_icp_e8s: E8s;
}