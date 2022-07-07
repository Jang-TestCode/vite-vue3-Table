<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <slot name="herder"></slot>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="item.id">
        <slot name="body" :user="item" :index="index"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "MyTable",
  props: {
    data: {
      type: Array,
      required: true,
      defult: [],
    },
  },
};
</script>

<style lang="less" scoped>
</style>