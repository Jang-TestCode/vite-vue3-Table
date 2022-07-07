<template>
  <div>
    <h1>App根组件</h1>
    <my-table :data="goodslist">
      <template #herder>
        <th>#</th>
        <th>商品名称</th>
        <th>价格</th>
        <th>标签</th>
        <th>操作</th>
      </template>
      <template #body="{ user }">
        <td>{{ user.id }}</td>
        <td>{{ user.goods_name }}</td>
        <td>￥{{ user.goods_price }}</td>
        <td>
          <input
            type="text"
            class="form-control form-control-sm form-ipt"
            v-if="user.inputVisible"
            v-focus
            v-model.trim="user.inputValue"
            @blur="getTag(user)"
            @keyup.enter="getTag(user)"
            @keyup.esc="user.inputValue = ''"
          /><!-- 监听键盘按下事件 -->
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="user.inputVisible = true"
            v-else
          >
            +Tag
          </button>
          <span
            class="badge badge-warning ml-2"
            v-for="item in user.tags"
            :key="item.id"
          >
            {{ item }}</span
          >
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click="del(user.id)"
          >
            删除
          </button>
        </td>
      </template>
    </my-table>
  </div>
</template>

<script>
import MyTable from "./components/MyTable.vue";
export default {
  name: "MyApp",
  components: {
    MyTable,
  },
  data() {
    return {
      goodslist: [],
    };
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get("/api/goods");
      if (res.status !== 0) return console.log("获取列表数据失败！");
      this.goodslist = res.data;
      console.log(res);
    },
    del(id) {
      this.goodslist = this.goodslist.filter((item) => item.id !== id);
    },
    getTag(user) {
      const val = user.inputValue;
      user.inputValue = "";
      user.inputVisible = false;
      // 1.判断 val 的值是否为空，2.判断 val 的值是否已经存在数组中，防止重复添加
      if (!val || user.tags.indexOf(val) !== -1) return;
      user.tags.push(val);
    },
  },
  directives: {
    focus(el) {
      el.focus();
    },
  },
  created() {
    this.getGoodsList();
  },
};
</script>

<style lang="less" scoped>
</style>