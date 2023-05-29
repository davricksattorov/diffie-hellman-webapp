import React, {useState} from 'react';
import Server from "./Server";
import Client from "./Client";
import {isPrime, generate} from "./utils";

const server = new Server();
const client = new Client();

function App() {
    const [g, setG] = useState(15);
    const [n, setN] = useState(17);

    const [gServerModN, setGServerModN] = useState(0);
    const [gClientModN, setGClientModN] = useState(0);

    const [dashServerModN, setDashServerModN] = useState(0);
    const [dashClientModN, setDashClientModN] = useState(0);

    const generateKey = () => {
        setGServerModN(server.generate(g, n));
        setGClientModN(client.generate(g, n));

        setDashServerModN(server.generate(gClientModN, n));
        setDashClientModN(client.generate(gServerModN, n));
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
                           value={n}
                           onChange={(e) => setN(+e.target.value)}
                           required/>
                    {!isPrime(n) &&
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        Please enter a prime number
                    </span>}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => generateKey()}>
                    Generate
                </button>
            </div>
            <div className="flex-auto w-64 border-2 rounded-md p-4 grid grid-cols-3 divide-x-2">
                <div className="p-2">
                    <h5 className="text-center font-semibold text-cyan-800 pb-4">Server</h5>
                    <div className="flex flex-col space-y-4">
                        <p>{server.getPrivateKey()}</p>
                        <p>G<sup>PRIVATE_KEY</sup> mod N: {gServerModN}</p>
                        <p>B<sup>PRIVATE_KEY</sup> mod N: {dashServerModN}</p>
                    </div>
                </div>
                <div className="p-2 font-semibold text-cyan-800">
                    <h5 className="text-center pb-4">Public</h5>
                    <div className="flex justify-between px-8">
                        <p>G: {g}</p>
                        <p>N: {n}</p>
                    </div>
                </div>
                <div className="p-2">
                    <h5 className="text-center font-semibold text-cyan-800 pb-4">Client</h5>
                    <div className="flex flex-col space-y-4">
                        <p>{client.getPrivateKey()}</p>
                        <p>G<sup>PRIVATE_KEY</sup> mod N: {gClientModN}</p>
                        <p>A<sup>PRIVATE_KEY</sup> mod N: {dashClientModN}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
