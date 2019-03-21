<template>
  <ion-item>
    <ion-grid style="display: flex; flex-flow: column;">
      <ion-row class="ion-align-items-center" style="height:100%;">
        <ion-col size="3">
          <ion-row style="height:70%;">
            <ion-col text-center>
              <img :src="logo" style="height:auto; width:50px;">
            </ion-col>
          </ion-row>
          <ion-row style="height:30%;">
            <ion-col text-center>
              <ion-label text-wrap>
                <span style="font-size: 13px; font-weight: bold;">{{name}}</span>
              </ion-label>
            </ion-col>
          </ion-row>
        </ion-col>
        <ion-col text-center size="4">
          <ion-label>{{price}}{{currencySymbol}}</ion-label>
        </ion-col>
        <ion-col>
          <ion-row>
            <ion-col text-center>
              <ion-label>Daily change</ion-label>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col text-center>
              <ion-label>
                <span
                  v-bind:class="[isPositiveChange ? positiveClass: negativeClass]"
                >{{change_as_string }}%</span>
              </ion-label>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>

<script>
export default {
  props: {
    currency: { type: Object, default: () => {} },
    fiat: { type: String, default: 'USD' },
  },
  data() {
    return {
      positiveClass: 'positive',
      negativeClass: 'negative',
      fiats: {
        USD: '$',
        EUR: '€',
        JPY: '¥',
      },
    }
  },
  computed: {
    rank: function() {
      return this.currency.market_cap_rank
    },
    name: function() {
      return this.currency.name
    },
    logo: function() {
      return this.currency.image
    },
    price: function() {
      let as_str = this.currency.current_price.toString()
      let point_index = as_str.indexOf('.')
      return as_str.slice(0, point_index + 4)
    },
    change_24h: function() {
      return this.currency.price_change_percentage_24h
    },
    change_as_string: function() {
      let as_str = this.change_24h.toString()
      let point_index = as_str.indexOf('.')
      return as_str.slice(0, point_index + 3)
    },
    isPositiveChange: function() {
      return this.change_24h > 0
    },
    currencySymbol: function() {
      return this.fiats[this.fiat]
    },
  },
}
</script>

<style>
.price-text {
  height: 100%;
  font-size: 12px;
  background-color: red;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
