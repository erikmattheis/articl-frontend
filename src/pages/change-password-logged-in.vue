<template>
  <article>
    <h1>Change Password While Logged In</h1>
    <form>
      <label for="password">Current Password
        <div class="toggle-password">
          <input
            id="oldPassword"
            v-model="oldPassword"
            name="oldPassword"
            :type="oldPasswordType"
            autocomplete="current-password"><the-button-toggle-hidden
            class="toggle-password-mask"
            @show="oldPasswordType = oldPasswordType === 'text' ? 'password' : 'text'" />
        </div>
      </label>
      <label for="newPassword">New password
        <small
          v-if="passwordComplexity < 3"
          class="lighter left-space">
          Use upper- and lowercase, numerical and special characters.
        </small>
        <small
          v-else-if="newPassword.length < 8"
          class="lighter left-space">
          Please use 8 or more characters.
        </small>
        <div class="toggle-password">
          <input
            id="newPassword"
            v-model="newPassword"
            :type="newPasswordType"
            autocomplete="new-password">
          <the-button-toggle-hidden
            class="toggle-password-mask"
            @show="newPasswordType = newPasswordType === 'text' ? 'password' : 'text'" />
        </div>
      </label>
      <label for="newPassword2">Confirm new new password
        <div class="toggle-password">
          <input
            id="newPassword2"
            v-model="newPassword2"
            :type="newPassword2Type"
            autocomplete="new-password">
          <the-button-toggle-hidden
            class="toggle-password-mask"
            @show="newPassword2Type = newPassword2Type === 'text' ? 'password' : 'text'" />
        </div>
      </label>
      <input type="hidden" name="username" v-model="username">
      <button
        id="reset"
        type="submit"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()">
        <span v-if="!buttonDisabled">Change Password</span>
      </button>
      <p
        v-if="result"
        class="invalid">
        {{ result }}
      </p>
    </form>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import theButtonToggleHidden from "@/components/ui/TheButtonToggleHidden.vue";
import { scoreChars } from "@/services/userService";
import axiosInstance from "@/services/axiosService";

export default {
  name: "ChangePasswordLoggedIn",
  components: {
    theButtonToggleHidden,
  },
  data: () => ({
    oldPassword: null,
    newPassword: null,
    newPassword2: null,
    oldPasswordType: "password",
    passwordType: "password",
    newPasswordType: "password",
    newPassword2Type: "password",
    buttonDisabled: false,
    passwordComplexity: 0,
    errorMessage: "",
    success: false,
    result: null,
    chrs: 0,
    username: ""
  }),
  computed: {
    ...mapGetters({
      user: "users/user",
      tokens: "tokens/tokens"
    }),
  },
  watch: {
    newPassword: {
      handler(val) {
        this.passwordComplexity = scoreChars(val);
      },
    },
  },
  created() {
    this.username = this.user.username;
    this.setTitleAndDescriptionMixin({
      titleHtml: "Change Password",
    });
  },
  methods: {
    checkForm() {
      let passed = true;

      if (this.newPassword?.length < 8) {
        this.errorMessage = "Passwords are at least eight characters.";
        passed = false;
      } else if (this.newPassword !== this.newPassword2) {
        this.errorMessage = "Passwords do not mach.";
        passed = false;
      } else if (!this.tokens?.accessTokenValue) {
        this.errorMessage = "You are must be logged in to use this form.";
        passed = false;
      }

      return passed;
    },

    resetFormErrors() {
      this.success = null;

      this.result = null;
    },

    async submitForm() {
      try {
        if (this.checkForm() === true) {
          this.buttonDisabled = true;

          await axiosInstance({
            method: "POST",
            url: "/auth/change-pass-logged-in",
            data: {
              token: this.tokens?.accessTokenValue,
              oldPassword: this.oldPassword,
              password: this.newPassword,
              password2: this.newPassword2,
            },
          });

          this.$store.dispatch("modals/setSuccessTitle", "Password updated");

          this.$store.dispatch(
            "modals/setSuccessMessage",
            "You have successfully changed your password.",
          );
        } else {
          this.$store.dispatch("errors/setError", this.errorMessage);
        }
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      } finally {
        this.buttonDisabled = false;
      }
    },
  },
};
</script>
