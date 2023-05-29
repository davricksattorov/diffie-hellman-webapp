import { generate } from "./utils";

export default class Client {
    readonly PRIVATE_KEY = 4;

    getPrivateKey(): number {
        return this.PRIVATE_KEY;
    }

    generate(g: number, n: number): number {
        return generate(g, n, this.PRIVATE_KEY);
    }
}
