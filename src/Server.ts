import { generate } from "./utils";

export default class Server {
    readonly PRIVATE_KEY = 3;

    getPrivateKey(): number {
        return this.PRIVATE_KEY;
    }

    generate(g: number, n: number): number {
        return generate(g, n, this.PRIVATE_KEY);
    }
}