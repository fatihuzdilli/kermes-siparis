<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h5>{{ title }}: {{ editedItem.product }}</h5>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="formSent">
          <div class="form-group">
            <label><b>Şahıs:</b></label>
            <input type="text" class="form-control" v-model="editedItem.name" />
          </div>

          <div class="form-group">
            <label><b>Porsiyon:</b></label>
            <select class="custom-select" v-model="editedItem.quantity">
              <option
                v-for="option in [1]"
                v-bind:key="option"
                v-bind:value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label><b>Servis Şekli:</b></label>
            <div class="container">
              <div class="row">
                <div class="col" v-for="colIdx in [0, 1]" v-bind:key="colIdx">
                  <div
                    v-for="(typeSelection, idx) in editedItem.types.selection"
                    v-bind:key="typeSelection"
                  >
                    <!-- <br v-if="idx === editedItem.types.selection.length / 2" />-->

                    <div
                      v-if="
                        Math.floor(
                          (idx / editedItem.types.selection.length) * 2
                        ) === colIdx
                      "
                    >
                      <input
                        type="radio"
                        name="types"
                        v-model="editedItem.types.chosen"
                        v-bind:id="typeSelection"
                        v-bind:value="typeSelection"
                        class="form-check-input"
                      />
                      <label v-bind:for="typeSelection">{{
                        typeSelection
                      }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label><b>Opsiyonlar:</b></label>
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
                value="İptal"
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
