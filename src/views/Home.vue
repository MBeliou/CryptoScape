<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>CryptoScape</ion-title>
        <ion-select slot="end" :value="selectedFiat" @ionChange="changeSelectedFiat($event)">
          <ion-select-option v-for="fiat in fiats" v-bind:key="fiat" values="fiat">{{fiat}}</ion-select-option>
        </ion-select>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-content" padding>
      <ion-list>
        <coin
          v-for="(currency, i) in currencies"
          :key="i"
          :currency="currency"
          :fiat="selectedFiat"
        ></coin>
      </ion-list>
    </ion-content>
    <ion-footer class="bottom-footer">
      <div class="footer-error">
        <div class="footer-text">Powered by</div>
        <a href="https://www.coingecko.com/en" target="_blank">
          <img src="@/images/CoinGecko.png" class="coin-gecko-logo" alt="Coin Gecko Logo">
        </a>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script>
import coin from '@/components/coin'
import { getCurrencies } from '@/utils/coingecko'

export default {
  components: {
    coin,
  },
  data() {
    return {
      links: ['Action Sheet', 'Alert', 'Loading', 'Menu', 'Modal', 'Popover'],
      currencies: [],
      fiats: ['USD', 'EUR', 'JPY'],
      selectedFiat: 'USD',
    }
  },
  methods: {
    changeSelectedFiat: async function(event) {
      console.log('Changed current fiat to:', event.detail.value)
      this.selectedFiat = event.detail.value
      this.currencies = await getCurrencies(this.selectedFiat)
    },
  },
  async mounted() {
    this.currencies = await getCurrencies(this.selectedFiat)
  },
}
</script>


<style scoped>
.footer-text {
  font-size: 80%;
  margin: 10px 0;
  text-align: center;
}
.coin-gecko-logo {
  display: block;
  margin: 0 auto 10px auto;
  width: 9.6825rem;
}

.footer-error {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.bottom-footer {
  margin-top: 100px;
}
</style>