import React, {useState} from 'react';
import Server from "./Server";
import Client from "./Client";
import {generatePrimeNumber, isPrime} from "./utils";

const server = new Server();
const client = new Client();

function App() {
    const [g, setG] = useState(15);
    const [p, setP] = useState(17);

    const [gServerModN, setGServerModN] = useState(0);
    const [gClientModN, setGClientModN] = useState(0);

    const [dashServerModN, setDashServerModN] = useState(0);
    const [dashClientModN, setDashClientModN] = useState(0);

    const generateKey = () => {
        setGServerModN(server.generate(g, p));
        setGClientModN(client.generate(g, p));
    }

    const generateSecretKey = () => {
        setDashServerModN(server.generate(gClientModN, p));
        setDashClientModN(client.generate(gServerModN, p));
    }

    const generateRandomPrimeNumber = () => {
        resetPreviouslyGeneratedKeys();

        const primeNumber = generatePrimeNumber();

        setP(primeNumber);
    }

    const resetPreviouslyGeneratedKeys = () => {
        setGServerModN(0);
        setGClientModN(0);
        setDashServerModN(0);
        setDashClientModN(0);
    }

    return (
        <div className="w-screen h-128 flex space-x-4 p-8">
            <div className="flex-auto w-32 space-y-4 border-2 rounded-md p-4">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        G
                    </label>
                    <input type="number"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           value={g}
                           onChange={(e) => setG(+e.target.value)}
                           required/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        N
                    </label>
                    <input type="number"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="23"
                           value={p}
                           onChange={(e) => setP(+e.target.value)}
                           required/>
                    {!isPrime(p) &&
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        Please enter a prime number
                    </span>}
                </div>
                <div className="flex justify-between">
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => generateRandomPrimeNumber()}>
                            Generate random prime number
                        </button>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => generateKey()}>
                            Generate keys
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => generateSecretKey()}>
                            Generate secret keys
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-auto w-64 border-2 rounded-md p-4 grid grid-cols-3 divide-x-2">
                <div className="p-2">
                    <h5 className="text-center font-semibold text-cyan-800 pb-4">Server</h5>
                    <div className="flex flex-col space-y-4">
                        <p>PRIVATE_KEY: {server.getPrivateKey()}</p>
                        <p>G<sup>PRIVATE_KEY</sup> mod N: {gServerModN}</p>
                        <p>B<sup>PRIVATE_KEY</sup> mod N: {dashServerModN}</p>
                    </div>
                </div>
                <div className="p-2 font-semibold text-cyan-800">
                    <h5 className="text-center pb-4">Public</h5>
                    <div className="flex justify-between px-8">
                        <p>G: {g}</p>
                        <p>P: {p}</p>
                    </div>
                </div>
                <div className="p-2">
                    <h5 className="text-center font-semibold text-cyan-800 pb-4">Client</h5>
                    <div className="flex flex-col space-y-4">
                        <p>PRIVATE_KEY: {client.getPrivateKey()}</p>
                        <p>G<sup>PRIVATE_KEY</sup> mod P: {gClientModN}</p>
                        <p>A<sup>PRIVATE_KEY</sup> mod P: {dashClientModN}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
