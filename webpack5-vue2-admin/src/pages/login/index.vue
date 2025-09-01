<template>
  <div class="login">
    <div class="content">
      <div class="login-area">
        <div class="title">
          账号登录
          <div class="line"></div>
        </div>
        <div class="remind">请输入您的账号和密码进行登录</div>
        <el-form ref="loginForm" :model="loginInfo" :rules="rules" label-width="0">
          <el-form-item label prop="mobile">
            <el-input v-model="loginInfo.mobile" class="account" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label prop="password">
            <el-input
              v-model="loginInfo.password"
              class="password"
              placeholder="密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form>
            <div class="submit" @click="handleSubmit">
              <p>立即登录</p>
              <img :src="arrow" alt />
            </div>
          </el-form>
        </el-form>
      </div>
    </div>
    <div class="copyright">Copyright &copy; 2001-{{ year }} XXX 版权所有</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions } from "vuex";
import { throttle } from "@/utils/descriptor";

export default {
  data() {
    return {
      arrow: require("@/static/login/login-arrow.png"),
      year: dayjs().format("YYYY"),
      loginInfo: {
        mobile: "",
        password: ""
      },
      rules: {
        mobile: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      redirect: ""
    };
  },

  created() {},
  mounted() {},
  methods: {
    // @throttle(1000)
    async handleSubmit() {
      this.$refs["loginForm"].validate(async valid => {
        if (valid) {
          // 获取token
          await this.$store.dispatch("user/login", this.loginInfo);
          // this.$router.push({ path: this.redirect || "/", query: this.otherQuery });
          this.$router.push("/");
        } else {
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("@/static/login/admin-login.png");
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1070px;
    height: 640px;
    z-index: 2;
    background-image: url("@/static/login/login-bg.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .login-area {
      padding-right: 120px;
      .title {
        // height: 28px;
        display: inline-block;
        color: #333333;
        font-size: 28px;
        font-weight: 700;
        position: relative;
        .line {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 6px;
          height: 6px;
          background-color: #00b5ba;
          z-index: -1;
        }
      }
      .remind {
        margin-top: 12px;
        color: #666666;
        font-size: 14px;
      }
      .account {
        margin-top: 60px;
        width: 390px;
        height: 50px;
      }
      .password {
        width: 390px;
        height: 50px;
      }
      .submit {
        cursor: pointer;
        margin-top: 40px;
        width: 155px;
        height: 50px;
        border-radius: 25px;
        display: flex;
        justify-content: center;
        background-color: #3e65ec;
        align-items: center;
        p {
          color: #fff;
          font-size: 18px;
        }
        img {
          margin-left: 10px;
          width: 20px;
          height: 8px;
        }
      }
    }
  }
  .copyright {
    font-size: 14px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #333;
  }
}
</style>
