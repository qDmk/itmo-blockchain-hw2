const {ethers} = require("ethers")
const {AggregatorProxyABI} = require("./static")

const provider = new ethers.providers.AlchemyProvider("homestead", "demo");

/**
 * Chainlink oracle feeds contracts
 * @type {string[]}
 */
const pairs = [
    "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH / USD
    "0xf4030086522a5beea4988f8ca5b36dbc97bee88c", // BTC / USD
    "0x2c1d072e956affc0d435cb7ac38ef18d24d9127c", // LINK / USD
]

async function subscribeToPairs(pairs) {
    const abstractProxy = new ethers.Contract("0", AggregatorProxyABI, provider)

    async function subscribeToPair(address) {
        try {
            // Request data from contract
            const aggregatorProxy = abstractProxy.attach(address)
            const request = Promise.all([
                aggregatorProxy.aggregator(),
                aggregatorProxy.description(),
                aggregatorProxy.latestRoundData(),
                aggregatorProxy.decimals()
            ])
            const [aggregatorAddress, pairName, [, answ,], decimals] = await request
            const pow = 10 ** decimals;

            // Subscribe for events
            const filter = {
                address: aggregatorAddress,
                topics: ["0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f"]
            }
            const aggregator = new ethers.Contract(aggregatorAddress, [], provider)
            aggregator.on(filter, e => {
                console.log(`${pairName} price updated: ${parseInt(e.topics[1], 16) / pow}`)
            })


            const msg = `Subscribed to pair ${pairName}:\n` +
                    `\tAggregator proxy: ${address}\n` +
                    `\tAggregator: ${aggregatorAddress}\n` +
                    `\tLatest price: ${answ / pow}\n`
            console.log(msg)
        } catch (e) {
            console.log(`Could not subscribe to ${address}: `, e)
        }
    }

    pairs.forEach(subscribeToPair)
}

function subscribeToBlocks() {
    provider.on("block", r => {
        console.log(`Latest block updated: ${r}`)
    })
}

async function main() {
    subscribeToBlocks()
    await subscribeToPairs(pairs)
}

main();