<template>
  <div class="container">
    <ItemForm
      v-bind:item="newItem"
      v-bind:onSubmit="addItem"
      v-bind:onCancel="gotoHome"
      title="Add Item"
      submitLabel="Add"
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
    urunlerObj: {
      source: db.ref("urunler"),
      asObject: true,
    },
  },
  data() {
    return {
      newItem: {},
    };
  },
  created() {
    this.newItem = this.urunlerObj[this.$route.params.key];
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