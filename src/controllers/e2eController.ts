import { e2eService } from "../services/e2eService.js";

async function reset() {
    await e2eService.reset();
}

export const e2eController = {
    reset
};