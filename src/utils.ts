export function generate(g: number, n: number, privateKey: number): number {
    return ((Math.pow(g, privateKey)) % n);
}

export function isPrime(number: number): boolean {
    for(let i = 2, s = Math.sqrt(number); i <= s; i++) {
        if(number % i === 0) return false;
    }
    return number > 1;
}