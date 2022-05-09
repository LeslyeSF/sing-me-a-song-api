import { recommendationRepository } from "../repositories/recommendationRepository.js";

async function reset() {
    await recommendationRepository.resetDatabase();
}
export const e2eService = { reset };