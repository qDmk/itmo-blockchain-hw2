# Homework 3

#### _“Blockchain software ecosystem"_

All logic implemented in [`index.js`](index.js)  
[`static.js`](static.js) contains selection from ABI of oracle feed contract  
`"demo"` in `provider`(in `index.js`) should be replaced with your api key (but not necessarily)

### How to start
To start run:
``` bash
npm install
npm start
```

### Log example

```
Subscribed to pair ETH / USD:
        Aggregator proxy: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
        Aggregator: 0x37bC7498f4FF12C19678ee8fE19d713b87F6a9e6
        Latest price: 1626.23057724

Latest block updated: 15911850
Subscribed to pair BTC / USD:
        Aggregator proxy: 0xf4030086522a5beea4988f8ca5b36dbc97bee88c
        Aggregator: 0xAe74faA92cB67A95ebCAB07358bC222e33A34dA7
        Latest price: 21225.21

Subscribed to pair LINK / USD:
        Aggregator proxy: 0x2c1d072e956affc0d435cb7ac38ef18d24d9127c
        Aggregator: 0xDfd03BfC3465107Ce570a0397b247F546a42D0fA
        Latest price: 8.51877239
 
Latest block updated: 15911759
Latest block updated: 15911760
Latest block updated: 15911761
...
BTC / USD price updated: 21225.21
ETH / USD price updated: 1626.05
ETH / USD price updated: 1626.23057724
...
Latest block updated: 15911812
Latest block updated: 15911813
Latest block updated: 15911814


```