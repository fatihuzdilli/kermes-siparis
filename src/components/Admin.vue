<template>
  <div class="row">
    <button @click="addNewProduct()" class="btn btn-danger">
      Add New Product
    </button>
  </div>
</template>

<script>
import { db } from "../config/db";

export default {
  name: "Admin",
  data() {
    return {};
  },
  firebase: {
    urunler: db.ref("urunler"),
  },
  methods: {
    addNewProduct() {
      this.$firebaseRefs.urunler.push({
        product: "Yeni",
        options: {
          Biber: true,
          Maydanoz: true,
          Salata: true,
          Soğan: true,
          Tomates: true,
        },
        quantity: 1,
        types: {
          chosen: "Ekmek üstü",
          selection: [
            "Ekmek üstü",
            "Ekmeksiz",
            "Paket:Ekmek",
            "Paket:Ekmeksiz",
          ],
        },
      });
    },
  },
};
</script>