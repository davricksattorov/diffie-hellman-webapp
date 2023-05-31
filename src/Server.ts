import { generate } from "./utils";

export default class Server {
    readonly PRIVATE_KEY = 3;

    getPrivateKey(): number {
        return this.PRIVATE_KEY;
    }

    generate(g: number, p: number): number {
        return generate(g, p, this.PRIVATE_KEY);
    }
}