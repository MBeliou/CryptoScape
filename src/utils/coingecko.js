const BASE_URL = "https://api.coingecko.com/api/v3/";

// Hardcoded for simplicity. See Coin Gecko API for parameters and such: https://www.coingecko.com/api?locale=en 
const QUERY_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=";
const ARGS_URL = "&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h";

import axios from 'axios';


// TODO: try catch
export const getCurrencies = async (fiat) => {
  let lowercase_fiat = fiat.toLowerCase()
  const url = QUERY_URL + lowercase_fiat + ARGS_URL
  const req = await axios.get(url, {
    accept: 'application/json'
  })
  return req.data;
}
