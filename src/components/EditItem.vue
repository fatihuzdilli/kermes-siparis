<template>
  <div class="row">
    <ItemForm
      v-bind:item="newItem"
      v-bind:onSubmit="updateItem"
      v-bind:onCancel="gotoHome"
      title="Sipariş Güncelle"
      submitLabel="Güncelle"
    />
    <br />
    <b>Sipariş saati: </b>{{ new Date(newItem.creationTime) }}
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <button
      v-if="newItem.status != 'DELETED'"
      @click="markItemAsDeleted()"
      class="btn btn-danger"
    >
      Sil
    </button>
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
    /*
    itemsObj: {
      source: db.ref("items"),
      asObject: true,
    },*/
  },
  data() {
    return {
      newItem: {},
    };
  },
  created() {
    let item = this.items[this.$route.params.id];
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
    markItemAsDeleted() {
      if (!confirm("Sipariş gerçekten silinsin mi?")) {
        return;
      }
      let key = this.$route.params.id;
      console.log(key);
      var editedItem = this.items[key];
      console.log(editedItem);
      editedItem.status = "DELETED";
      editedItem.deletedTime = Date.now();
      this.$firebaseRefs.items.child(key).set(editedItem);
      this.gotoHome();
    },
  },
};
</script>