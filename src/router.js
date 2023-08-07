import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import CreateArticlPage from "@/pages/articls/index.vue";
import DeleteArticlPage from "@/pages/articls/delete.vue";
import SearchArticls from "@/pages/articls/search.vue";
import DeleteCategoryPage from "@/pages/categories/delete.vue";
import CreateCategoryPage from "@/pages/categories/index.vue";
import ResourceIndex from "@/pages/resource/index.vue";
import ForgotPassPage from "@/pages/forgot-pass.vue";
import ForgotUsernamePage from "@/pages/forgot-username.vue";
import LoginPage from "@/pages/login.vue";
import DeleteNote from "@/components/layout/NotesDelete.vue";
import EditNote from "@/components/layout/NotesForm.vue";
import NotFound from "@/pages/NotFound.vue";
import TabQuestionsAnswers from "@/components/layout/QAndAList.vue";
import ResetPasswordPage from "@/pages/change-password.vue";
import UsersPage from "@/pages/users/index.vue";
import VerifyEmailPage from "@/pages/verify-email.vue";
import CategoriesList from "@/components/layout/CategoriesList.vue";
import TabNotes from "@/components/layout/NotesList.vue";
import ArticlsList from "@/components/layout/ArticlsList.vue";
import ForbiddenPage from "@/pages/ForbiddenPage.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [

    {
      name: "ResourceIndex",
      path: "/resource/:slug?",
      component: ResourceIndex,
      children: [{
        name: "CategoriesList",
        path: "",
        component: CategoriesList,
        alias: ['/:slug?']
      },
      
      {
        name: "TabNotes",
        path: "notes",
        component: TabNotes,
        children: [
          {
            name: "EditNote",
            path: "edit/:id",
            component: EditNote,
          },
          {
            name: "EditNoteSuccess",
            path: "edited/:id",
            component: EditNote,
          },
          {
            name: "DeleteNote",
            path: "delete/:id",
            component: DeleteNote,
          }],
      },
      {
        name: "editCategory",
        path: "categories/edit/:id?",
        component: ResourceIndex,
      },

      {
        name: "CreateCategoryPage",
        path: "categories/:id?",
        component: CreateCategoryPage,
      },
      
      {
        name: "DeleteCategoryPage",
        path: "categories/delete/:id?",
        component: DeleteCategoryPage,
      },
      {
        name: "editArticl",
        path: "articls/edit/:editId",
        component: CreateArticlPage,
        props: true,
      },
  
      {
        name: "CreateArticlPage",
        path: "articls/create/:id",
        component: CreateArticlPage,
      },
  
      {
        name: "DeleteArticlPage",
        path: "articls/delete/:id",
        component: DeleteArticlPage,
        props: true,
      },
      
      {
        name: "ArticlsList",
        path: "articls/:articlType?",
        component: ArticlsList,
      }],

    },

    {
      name: "VerifyEmailPage",
      path: "/verify-email",
      component: VerifyEmailPage,
    },

    {
      name: "LoginPage",
      path: "/login",
      component: LoginPage,
    },

    {
      name: "sendVerificationEmail",
      path: "/send-verification-email",
      component: ResetPasswordPage,
    },

    {
      name: "ForgotPassPage",
      path: "/forgot-pass",
      component: ForgotPassPage,
    },

    {
      name: "ForgotUsernamePage",
      path: "/forgot-username",
      component: ForgotUsernamePage,
    },

    {
      name: "ResetPasswordPage",
      path: "/change-password",
      component: ResetPasswordPage,
    },

    {
      name: "UsersPage",
      path: "/users/:id",
      component: UsersPage,
    },

    {
      name: "users",
      path: "/users",
      component: UsersPage,
    },

    {
      name: "SearchArticls",
      path: "/articls/:slug?",
      component: SearchArticls,
    },

    {
      name: "forbidden",
      path: "/forbidden",
      component: ForbiddenPage,
    },

    {
      name: "NotFound", path: "/:NotFound(.*)", component: NotFound,
    },
  ],
});

/*
    {
      name: "importCategoriesPage",
      path: "/categories/:slug?",
      component: importCategoriesPage,
    },
*/
router.beforeEach((to, from, next) => {
  if (to.name !== "LoginPage") {
    console.log("setting lastPath", to.fullPath);
    store.dispatch("resources/lastPath", to.fullPath);
  }
  else {
    console.log("not setting last path to / because user is on login  page");
    store.dispatch("resources/lastPath", "/");
  }
  next();
});


export default router;
