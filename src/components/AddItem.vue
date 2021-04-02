<template>
  <div class="row">
    <ItemForm
      v-bind:item="newItem"
      v-bind:onSubmit="addItem"
      v-bind:onCancel="gotoHome"
      title="Sipariş Ekle"
      submitLabel="Ekle"
    />
  </div>
</template>

<script>
import ItemForm from "./ItemForm";
import { db } from "../config/db";

export default {
  name: "AddItem",
  components: {
    ItemForm,
  },
  firebase: {
    items: db.ref("items"),
    urunler: db.ref("urunler"),
  },
  data() {
    return {
      urunler: {},
      newItem: {},
    };
  },
  created() {
    this.newItem = this.urunler[this.$route.params.key];
  },
  methods: {
    addItem() {
      this.newItem.creationTime = Date.now();
      this.$firebaseRefs.items.push(this.newItem);
      this.gotoHome();
    },
    gotoHome() {
      this.$router.push("/");
    },
  },
};
</script>