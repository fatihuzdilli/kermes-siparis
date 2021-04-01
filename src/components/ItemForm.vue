<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="formSent">
          <div class="form-group">
            <label>Item Name:</label>
            <input type="text" class="form-control" v-model="editedItem.name" />
          </div>
          <div class="form-group">
            <label>Item Price:</label>
            <input
              type="text"
              class="form-control"
              v-model="editedItem.price"
            />
          </div>
          <div class="form-group">
            <input
              type="submit"
              class="btn btn-primary"
              v-model="submitLabel"
            />
            <input
              type="button"
              class="btn btn-primary"
              value="Cancel"
              v-on:click="onCancel"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemForm",
  props: {
    item: {
      type: Object,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    submitLabel: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      editedItem: {},
    };
  },
  created() {
    this.editedItem = this.item;
  },
  methods: {
    formSent() {
      console.log("Form sent");
      this.onSubmit();
    },
  },
};
</script>