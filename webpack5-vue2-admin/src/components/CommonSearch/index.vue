<template>
  <div class="common-search">
    <div class="search" @click="changeVisible">
      <img class="search-icon" src="@/static/icon/search.png" alt srcset />
      <span>搜索</span>
    </div>
    <div v-if="visible" class="more-container">
      <em class="el-icon-circle-close close" @click="visible = false"></em>
      <el-form
        ref="searchForm"
        :inline="true"
        label-position="right"
        label-width="120px"
        :model="searchForm"
      >
        <div class="inline-form" :class="{ 'inline-form__large': options.length > 2 }">
          <div v-for="(item, index) in options" :key="index" class="search-item">
            <!-- input -->
            <el-form-item v-if="item.type === 'Input' || item.type == 'Tel'" :label="item.label">
              <el-input
                v-model="searchForm[item.key]"
                style="width: 256px"
                :clearable="item.clear"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                @input="changeInputNumber(item)"
              ></el-input>
            </el-form-item>
            <!-- select -->
            <el-form-item v-if="item.type === 'Select'" :label="item.label">
              <el-select
                v-if="item.type === 'Select'"
                v-model="searchForm[item.key]"
                :filterable="item.filterable"
                :clearable="item.clear"
                :multiple="item.multiple"
                :placeholder="item.placeholder"
                style="width: 256px"
                :disabled="item.disabled"
                @change="changeOptions(item)"
              >
                <el-option
                  v-for="itemT in item.options"
                  :key="itemT.value"
                  :label="itemT.label"
                  :value="itemT.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- DatePicker -->
            <el-form-item v-if="item.type === 'DatePicker'" :label="item.label">
              <el-date-picker
                v-model="searchForm[item.key]"
                :type="item.picker_type"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                placeholder="请选择"
                style="width: 256px"
                value-format="timestamp"
                :default-time="['00:00:00', '23:59:59']"
                :disabled="item.disabled"
              ></el-date-picker>
            </el-form-item>
            <!-- DateTimePicker -->
            <el-form-item v-if="item.type === 'DateTimePicker'" :label="item.label">
              <el-date-picker
                v-model="searchForm[item.key]"
                :type="item.picker_type"
                :picker-options="item.pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                style="width: 256px"
                value-format="timestamp"
                :default-time="['00:00:00', '23:59:59']"
                :disabled="item.disabled"
              ></el-date-picker>
            </el-form-item>
            <!-- Cascader -->
            <el-form-item v-if="item.type === 'Cascader'" :label="item.label">
              <el-cascader
                v-model="searchForm[item.key]"
                clearable
                style="width: 256px"
                :options="item.options"
                :props="item.props"
                :disabled="item.disabled"
              ></el-cascader>
            </el-form-item>
          </div>
        </div>
        <div class="btn-search">
          <el-button class="btn" @click="reset()">重置</el-button>
          <el-button class="btn" type="primary" @click="search()">搜索</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [
          // type Select,Input,TimePicker,DatePicker,DateTimePicker, Cascader
          // {
          //   label: "标签类型",
          //   value: "",
          //   type: "Select",
          //   key: "type",
          //   multiple: false, // 可选
          //   options: [
          //     {
          //       value: "选项1",
          //       label: "黄金糕",
          //     },
          //     {
          //       value: "选项2",
          //       label: "双皮奶",
          //     },
          //     {
          //       value: "选项3",
          //       label: "蚵仔煎",
          //     },
          //     {
          //       value: "选项4",
          //       label: "龙须面",
          //     },
          //     {
          //       value: "选项5",
          //       label: "北京烤鸭",
          //     },
          //   ],
          //   clear: true, // 可选
          // },
          // {
          //   label: "标签名称/ID",
          //   value: "",
          //   type: "Input",
          //   key: "name",
          //   clear: true, // 可选
          // },
          // {
          //   label: '创建时间',
          //   value: '',
          //   type: 'DateTimePicker',
          //   key: 'dateTimeRange',
          //   picker_type: 'datetimerange', // year/month/date/week/datetime/datetimerange/daterange
          //   pickerOptions: {}, // 可选
          //   clear: true // 可选
          // },
          // {
          //   label: '标签日期',
          //   value: [],
          //   type: 'DatePicker',
          //   key: 'daterange',
          //   picker_type: 'daterange', // year/month/date/dates/week/datetime/datetimerange/daterange/monthrange
          //   pickerOptions: {}, // 可选
          //   clear: true // 可选
          // },
          // {
          //   label: "标签类型",
          //   value: "",
          //   type: "Select",
          //   key: "type2",
          //   multiple: false, // 可选
          //   options: [
          //     {
          //       value: "选项1",
          //       label: "黄金糕",
          //     },
          //     {
          //       value: "选项2",
          //       label: "双皮奶",
          //     },
          //     {
          //       value: "选项3",
          //       label: "蚵仔煎",
          //     },
          //   ],
          //   clear: true, // 可选
          // },
          // {
          //   label: "标签类型",
          //   value: "",
          //   type: "Select",
          //   key: "type1",
          //   multiple: false, // 可选
          //   options: [
          //     {
          //       value: "选项1",
          //       label: "黄金糕",
          //     },
          //     {
          //       value: "选项2",
          //       label: "双皮奶",
          //     },
          //   ],
          //   clear: true, // 可选
          // },
        ];
      }
    }
  },
  data() {
    return {
      visible: false,
      searchForm: {}
    };
  },
  created() {
    this.reset();
  },
  methods: {
    changeOptions(item) {
      if (this.$listeners["changeOptions"]) {
        this.$emit("changeOptions", item, this.searchForm);
      }
    },
    updateOptions() {
      let dic = {};
      this.options.forEach(e => {
        dic[e.key] = e.value;
      });
      this.searchForm = dic;
      this.$emit("commonSearch", this.searchForm);
    },
    changeInputNumber(val) {
      if (val.type === "Tel") {
        this.searchForm[val.key] = this.searchForm[val.key].replace(/[^\d]/g, "");
      }
    },
    changeVisible() {
      this.visible = !this.visible;
    },
    search() {
      this.$refs["searchForm"].validate(valid => {
        if (valid) {
          this.$emit("commonSearch", this.searchForm);
          this.visible = false;
        } else {
          return false;
        }
      });
    },
    reset() {
      let dic = {};
      this.options.map(e => {
        dic[e.key] = e.value;
      });
      this.searchForm = dic;
      if (this.$listeners["resetOptions"]) {
        this.$emit("resetOptions");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.common-search {
  position: relative;
  z-index: 100;
  .search {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $theme-color;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 20px;
    user-select: none;
    width: max-content;
    &-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }
  .more-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2000;
    padding: 30px 20px;
    background: #fff;
    box-shadow: 0px 10px 35px 0px rgba(47, 63, 95, 0.08);
    border-radius: 10px;
    width: 100%;
    min-height: 100px;
    color: #666;
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 25px;
      cursor: pointer;
    }
    .inline-form {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 1100px;
      margin: 0 auto;
      &__large {
        justify-content: flex-start;
      }
    }
    .search-item {
      margin-bottom: 20px;
    }
    .btn-search {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn {
        width: 100px;
        height: 40px;
      }
    }
  }
}
</style>
