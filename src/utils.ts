export function generate(g: number, n: number, privateKey: number): number {
    return ((Math.pow(g, privateKey)) % n);
}

export function isPrime(number: number): boolean {
    for(let i = 2, s = Math.sqrt(number); i <= s; i++) {
        if(number % i === 0) return false;
    }
    return number > 1;
}

export function generatePrimeNumber(): number {
    const minDigits = 2;
    const maxDigits = 5;

    let randomNumber = getRandomNumberInRange(minDigits, maxDigits);

    while (!isPrime(randomNumber)) {
        randomNumber = getRandomNumberInRange(minDigits, maxDigits);
    }

    return randomNumber;
}

function getRandomNumberInRange(minDigits: number, maxDigits: number): number {
    const min = 10 ** (minDigits - 1); // Minimum value for the desired number of digits
    const max = (10 ** maxDigits) - 1; // Maximum value for the desired number of digits

    return getRandomIntInRange(min, max);
}

function getRandomIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}