<template>
  <div>
    <div
      class="navbar navbar-expand-sm bg-light"
      v-for="urun in urunler"
      v-bind:key="urun['.key']"
    >
      <router-link
        :to="{ name: 'Add', params: { key: urun['.key'] } }"
        class="btn btn-danger"
      >
        {{ urun.product }}
      </router-link>
    </div>
    <h1>List Item</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Type</th>
          <th>Option</th>
          <th>Person</th>
          <th colspan="2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of orderedItems" :key="item['.key']">
          <td>{{ item.product }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.types.chosen }}</td>
          <td>{{ item.options }}</td>
          <td>{{ item.name }}</td>
          <td>
            <router-link
              :to="{ name: 'Edit', params: { id: item['.key'] } }"
              class="btn btn-warning"
              >Edit</router-link
            >
          </td>
          <td>
            <button @click="deleteItem(item['.key'])" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from "../config/db";
import _ from "lodash";

export default {
  data() {
    return {
      items: [],
      urunler: [],
      x: {},
    };
  },
  firebase: {
    items: db.ref("items"),
    urunler: db.ref("urunler"),
  },
  computed: {
    orderedItems: function () {
      return _.orderBy(this.items, "creationTime");
    },
  },
  methods: {
    deleteItem(key) {
      this.$firebaseRefs.items.child(this.$route.params.id).set(this.newItem);
    },
  },
};
</script>