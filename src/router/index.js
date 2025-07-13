import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import AboutView from "../pages/AboutView.vue";
import ProjectsView from "../pages/ProjectsView.vue";
import ContactView from "../pages/ContactView.vue";
import NotFoundView from "../pages/NotFoundView.vue";
import Posts from "@/components/Posts.vue";
import PostDetail from "@/components/PostDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectsView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/Posts",
      name: "Posts",
      component: Posts,
    },
    {
      path: "/Posts/:postId",
      name: ":postId",
      component: PostDetail,
    },
    {
      // Catch-all route for 404 pages
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
