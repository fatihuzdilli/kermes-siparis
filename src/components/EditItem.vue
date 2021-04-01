<template>
  <div class="container">
    <ItemForm
      v-bind:item="newItem"
      v-bind:onSubmit="updateItem"
      v-bind:onCancel="gotoHome"
      title="Edit Item"
      submitLabel="Update"
    />
  </div>
</template>

<script>
import ItemForm from "./ItemForm";
import { db } from "../config/db";

export default {
  name: "EditItem",
  components: {
    ItemForm,
  },
  firebase: {
    items: db.ref("items"),
    itemsObj: {
      source: db.ref("items"),
      asObject: true,
    },
  },
  data() {
    return {
      newItem: {},
    };
  },
  created() {
    let item = this.itemsObj[this.$route.params.id];
    this.newItem = item;
  },
  methods: {
    updateItem() {
      this.$firebaseRefs.items.child(this.$route.params.id).set(this.newItem);
      this.gotoHome();
    },
    gotoHome() {
      this.$router.push("/");
    },
  },
};
</script>