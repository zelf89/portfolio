<style scoped src="@/styles/post.css"></style>

<template>
  <div>
    <h1>Post Detail</h1>

    <button id="back-btn" @click="backToPosts">Back</button>

    <div v-if="loading" class="loading">📥 Loading post detail...</div>

    <div v-if="error" class="error">
      ❌ {{ error }}
      <br />
      <button @click="loadPost" style="margin-top: 10px">Try Again</button>
    </div>

    <div v-if="!loading && post">
      <div class="post-card">
        <div class="post-title">{{ post.title }}</div>
        <div class="post-body">{{ post.body }}</div>
      </div>
    </div>

    <h1>Update Post</h1>

    <!-- Success message -->
    <div v-if="successMessage" class="success">✅ {{ successMessage }}</div>

    <!-- Error message -->
    <div v-if="errorMessage" class="error">
      ❌ {{ errorMessage }}
      <button @click="updatePost" style="margin-left: 15px; padding: 5px 10px">Try Again</button>
    </div>

    <!-- Form to update post -->
    <form @submit.prevent="updatePost">
      <div class="form-group">
        <label for="title">Post Title:</label>
        <input
          type="text"
          id="title"
          v-model="newPost.title"
          placeholder="Write your post title here"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="body">Post Content:</label>
        <textarea
          id="body"
          v-model="newPost.body"
          placeholder="Write your post content here"
          rows="5"
          required
          :disabled="loading"
        >
        </textarea>
      </div>

      <button type="submit" :disabled="loading || !newPost.title || !newPost.body">
        <span v-if="loading" class="loading">📤 Updating Post...</span>
        <span v-else>Update Post</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.postId;

console.log("Post ID:", id);

const post = ref({});
const loading = ref(false);
const error = ref(null);

const successMessage = ref("");
const errorMessage = ref("");

const newPost = ref({
  title: "",
  body: "",
});

//-------------- back button function ------------//
const backToPosts = () => {
  window.history.back();
};

//-------------- delay function ------------//
const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

//-------------- get post funtion ------------//
const loadPost = async () => {
  loading.value = true;
  error.value = null;
  post.value = null;

  try {
    await delay();

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!response.ok) {
      throw new Error("Failed to load post");
    }

    const data = await response.json();
    post.value = data;

    newPost.value.title = data.title;
    newPost.value.body = data.body;
  } catch (err) {
    error.value = "Could not load post. Please check your internet connection and try again.";
    console.error("Error loading post:", err);
  } finally {
    loading.value = false;
  }
};

//-------------- update post function ------------//
const updatePost = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  if (!newPost.value.title.trim() || !newPost.value.body.trim()) {
    errorMessage.value = "Please fill in both title and content!";
    return;
  }

  loading.value = true;

  try {
    await delay();

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: newPost.value.title,
        body: newPost.value.body,
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    const result = await response.json();
    successMessage.value = "Post updated successfully!";
    post.value = result;

    // Clear success message after 5 seconds
    setTimeout(() => {
      successMessage.value = "";
    }, 5000);
  } catch (err) {
    errorMessage.value =
      "Could not update post. Please check your internet connection and try again.";
    console.error("Error updating post:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadPost();
});
</script>
