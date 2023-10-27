<template>
  <div>
    <div class="row">
      <div
        class="navbar navbar-expand-sm bg-light"
        v-for="urun in urunler"
        v-bind:key="urun['.key']"
      >
        <router-link
          :to="{ name: 'Add', params: { key: urun['.key'] } }"
          class="btn btn-danger"
        >
          + {{ urun.product }}
        </router-link>
      </div>
    </div>
    
    <h4>Açık Sipariş</h4>
    {{ summary }}
    <table class="table table-striped">
      <!--<thead>
          <tr>
            <th>Ürün</th>
            <th>Opsiyon</th>
            <th>Şahıs</th>
            <th></th>
          </tr>
        </thead>-->
      <tbody>
        <tr v-for="item of orderedItems" :key="item['.key']">
          <td @click="goToEdit(item['.key'])" class="text-nowrap">
            <b><!--{{ item.quantity }} x -->{{ item.product }}</b
            ><br />{{ item.types.chosen }}<br />
          </td>
          <td @click="goToEdit(item['.key'])">
            <div v-for="(value, option) of item.options" :key="option">
              <s v-if="!value"> {{ option }}</s>
              <!-- uncomment following if you want the options to be listed: -->
              <!-- <div v-if="value">{{ option }}</div> -->
            </div>
          </td>
          <td @click="goToEdit(item['.key'])">
            {{ item.name }}<br /><label class="text-muted">{{
              time(item.creationTime)
            }}</label>
          </td>
          <td>
            <button
              @click="markItemAsDone(item['.key'])"
              class="btn btn-warning"
            >
              Gönder
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <br /><br />
    
    <div v-if="orderedDoneItems.length > 0">
      <h4>Yolda</h4>
      <table class="table table-striped">
        <!--<thead>
          <tr>
            <th>Ürün</th>
            <th>Opsiyon</th>
            <th>Şahıs</th>
            <th></th>
          </tr>
        </thead>-->
        <tbody>
          <tr v-for="item of orderedDoneItems" :key="item['.key']">
            <td @click="goToEdit(item['.key'])" class="text-nowrap">
              <!--{{ item.quantity }} x -->{{ item.product }}<br />{{
                item.types.chosen
              }}<br />
            </td>
            <td @click="goToEdit(item['.key'])">
              <div v-for="(value, option) of item.options" :key="option">
                <s v-if="!value"> {{ option }}</s>
                <!-- uncomment following if you want the options to be listed: -->
                <!--<div v-if="value">{{ option }}</div>-->
              </div>
            </td>
            <td @click="goToEdit(item['.key'])">
              <b>{{ item.name }}</b
              ><br />{{ time(item.doneTime) }}
            </td>
            <td>
              <button
                @click="markItemAsArchived(item['.key'])"
                class="btn btn-success"
              >
                TeslimEt
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <br /><br /><br /><br /><br /><br /><br /><br />
    <h4>Teslim Edilen</h4>
    {{ summaryArchived }}
    <table class="table table-striped">
      <!--<thead>
          <tr>
            <th>Ürün</th>
            <th>Opsiyon</th>
            <th>Şahıs</th>
            <th></th>
          </tr>
        </thead>-->
      <tbody>
        <tr v-for="item of orderedArchivedItems" :key="item['.key']">
          <td @click="goToEdit(item['.key'])" class="text-nowrap">
            <!--{{ item.quantity }} x -->{{ item.product }}<br />{{ item.types.chosen
            }}<br />
          </td>
          <td @click="goToEdit(item['.key'])">
            <div v-for="(value, option) of item.options" :key="option">
              <s v-if="!value"> {{ option }}</s>
              <!-- uncomment following if you want the options to be listed: -->
              <!-- <div v-if="value">{{ option }}</div> -->
            </div>
          </td>
          <td @click="goToEdit(item['.key'])">
            {{ item.name }}<br /><label class="text-muted"
              >{{ time(item.creationTime) }} -</label
            >
            <b> {{ time(item.archivedTime) }}</b>
          </td>
          <td>
            <button @click="markItemAsNew(item['.key'])" class="btn btn-danger">
              Yenile
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <h4>Silinen</h4>
    <table class="table table-striped">
      <!--<thead>
          <tr>
            <th>Ürün</th>
            <th>Opsiyon</th>
            <th>Şahıs</th>
            <th></th>
          </tr>
        </thead>-->
      <tbody>
        <tr v-for="item of orderedDeletedItems" :key="item['.key']">
          <td @click="goToEdit(item['.key'])" class="text-nowrap">
            <!--{{ item.quantity }} x -->{{ item.product }}<br />{{ item.types.chosen
            }}<br />
          </td>
          <td @click="goToEdit(item['.key'])">
            <div v-for="(value, option) of item.options" :key="option">
              <s v-if="!value"> {{ option }}</s>
              <!-- uncomment following if you want the options to be listed: -->
              <!-- <div v-if="value">{{ option }}</div> -->
            </div>
          </td>
          <td @click="goToEdit(item['.key'])">{{ item.name }}</td>
          <td>
            <button @click="markItemAsNew(item['.key'])" class="btn btn-danger">
              Yenile
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
      itemsObj: {},
      urunler: [],
    };
  },
  firebase: {
    items: db.ref("items"),
    itemsObj: db.ref("items"),
    urunler: db.ref("urunler"),
  },
  computed: {
    summary: function () {
      let todoDesc = "";
      for (let i = 0; i < this.urunler.length; i++) {
        let p = this.urunler[i].product;
        let ordersOfThat = _.filter(
          this.items,
          (item) => item.product === p && item.status == null
        );
        let quant = 0;
        for (var index in ordersOfThat) {
          quant += ordersOfThat[index].quantity;
        }
        todoDesc += p + ": " + quant + ", ";
      }
      return todoDesc.slice(0, -2);
    },
    summaryArchived: function () {
      let todoDesc = "";
      for (let i = 0; i < this.urunler.length; i++) {
        let p = this.urunler[i].product;
        let ordersOfThat = _.filter(
          this.orderedArchivedItems,
          (item) => item.product === p
        );
        let quant = 0;
        for (var index in ordersOfThat) {
          quant += ordersOfThat[index].quantity;
        }
        todoDesc += p + ": " + quant + ", ";
      }
      return todoDesc.slice(0, -2);
    },
    orderedItems: function () {
      let ordered = _.orderBy(this.items, "creationTime");
      return _.filter(ordered, (item) => item.status == null);
    },
    orderedDoneItems: function () {
      let ordered = _.orderBy(this.items, "doneTime");
      return _.filter(ordered, (item) => item.status === "DONE");
    },
    orderedDeletedItems: function () {
      let ordered = _.orderBy(this.items, "deletedTime");
      return _.filter(ordered, (item) => item.status === "DELETED");
    },
    orderedArchivedItems: function () {
      let ordered = _.orderBy(this.items, "archivedTime", "desc");
      return _.filter(ordered, (item) => item.status === "ARCHIVED");
    },
  },
  methods: {
    markItemAsDone(key) {
      /*
      if (!confirm("Ürün hazırlandı mı?")) {
        return;
      }
      */
      console.log(key);
      var editedItem = this.itemsObj[key];
      console.log(editedItem);
      editedItem.status = "DONE";
      editedItem.doneTime = Date.now();
      this.$firebaseRefs.items.child(key).set(editedItem);
    },
    markItemAsDeleted(key) {
      if (!confirm("Silmek istediginize emin misiniz?")) {
        return;
      }
      console.log(key);
      var editedItem = this.itemsObj[key];
      console.log(editedItem);
      editedItem.status = "DELETED";
      editedItem.deletedTime = Date.now();
      this.$firebaseRefs.items.child(key).set(editedItem);
    },
    markItemAsArchived(key) {
      /*
      if (!confirm("Ürün teslim edildi veya gönderildi mi?")) {
        return;
      }
      */
      console.log(key);
      var editedItem = this.itemsObj[key];
      console.log(editedItem);
      editedItem.status = "ARCHIVED";
      editedItem.archivedTime = Date.now();
      this.$firebaseRefs.items.child(key).set(editedItem);
    },
    markItemAsNew(key) {
      if (!confirm("Siparişi tekrar listeye geri eklemek istiyor musunuz?")) {
        return;
      }
      console.log(key);
      var editedItem = this.itemsObj[key];
      console.log(editedItem);
      editedItem.status = null;
      this.$firebaseRefs.items.child(key).set(editedItem);
    },
    goToEdit(key) {
      console.log(key);
      this.$router.push({ name: "Edit", params: { id: key } });
    },
    time(timestamp) {
      let date = new Date(timestamp);
      return (
        date.getHours() +
        ":" +
        date.getMinutes().toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
      );
    },
  },
};
</script>
