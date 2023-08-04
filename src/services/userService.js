import axiosInstance from "@/services/axiosService";

const charCounts = (val) => ({
  numUpper: val.length - val.replace(/[A-Z]/g, "").length,
  numLower: val.length - val.replace(/[a-z]/g, "").length,
  numDigit: val.length - val.replace(/[0-9]/g, "").length,
  numSpecial: val.length - val.replace(/\W|_/g, "").length,
});

const scoreChars = (val) => {
  if (!val) {
    return 0;
  }

  const chars = charCounts(val);
  const a = chars.numUpper > 0 ? 1 : 0;
  const b = chars.numLower > 0 ? 1 : 0;
  const c = chars.numDigit > 0 ? 1 : 0;
  const d = val.length > 7 ? 1 : 0;

  return a + b + c + d;
};

const validateEmail = (email) => {
  if (!email) {
    return false;
  }

  return email.match(

    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  );
};

const login = async ({ username, password }) => {
  try {
    const data = await axiosInstance.post("/auth/login", { username, password });

    this.$cookies.set("accessTokenExpires", this.tokens.accessTokenExpires);
    this.$cookies.set("accessTokenValue", this.tokens.accessTokenValue);
    this.$cookies.set("refreshTokenExpires", this.tokens.refreshTokenExpires);
    this.$cookies.set("refreshTokenValue", this.tokens.refreshTokenValue);
    this.$cookies.set("user", this.user);
    return data;

  } catch (error) {
    throw new Error(error);
  }
};

const logout = async ({ accessToken }) => {
  try {
    await axiosInstance.post("/auth/logout", { accessToken });
    this.$cookies.remove("accessTokenExpires");
    this.$cookies.remove("accessTokenValue");
    this.$cookies.remove("refreshTokenExpires");
    this.$cookies.remove("refreshTokenValue");
    this.$cookies.remove("user");
  } catch (error) {
    console.log("Logout error:", error)
    if (error.response && error.response.data.message === "Token not found") {
      // Display an error message to the user
      throw new Error("Token not found during logout:", error);
      // Optionally, you can redirect the user to the login page or display a user-friendly error message on the front end.
    } else {
      // Handle other errors
      throw new Error("Logout error:", error);
      // Display a user-friendly error message or take appropriate actions based on the error.
    }
  }
};

export {
  scoreChars, validateEmail, login, logout,
};
