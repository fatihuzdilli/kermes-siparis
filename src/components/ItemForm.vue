<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>{{ title }}: {{ editedItem.product }}</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="formSent">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="editedItem.name" />
          </div>

          <div class="form-group">
            <label>Quantity:</label>
            <select v-model="editedItem.quantity">
              <option
                v-for="option in Array(9).keys()"
                v-bind:key="option"
                v-bind:value="option + 1"
              >
                {{ option + 1 }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Service Style:</label>
            {{ editedItem.checkset }}
            <div
              v-for="typeSelection in editedItem.types.selection"
              v-bind:key="typeSelection"
            >
              <input
                type="radio"
                name="types"
                v-model="editedItem.types.chosen"
                v-bind:id="typeSelection"
                v-bind:value="typeSelection"
              />
              <label v-bind:for="typeSelection">{{ typeSelection }}</label>
            </div>
          </div>

          <div class="form-group">
            <label>Service Options:</label>
            {{ editedItem.checkset }}
            <div
              v-for="(value, option) in editedItem.options"
              v-bind:key="option"
            >
              <input
                type="checkbox"
                name="options"
                v-bind:id="option"
                v-model="editedItem.options[option]"
              />
              <label v-bind:for="option">{{ option }}</label>
            </div>
          </div>

          <div class="row">
            <input
              type="submit"
              class="btn btn-primary"
              v-model="submitLabel"
            />
            <div class="col">
              <input
                type="button"
                class="btn btn-warning"
                value="Cancel"
                v-on:click="onCancel"
              />
            </div>
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