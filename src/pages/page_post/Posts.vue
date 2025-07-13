<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);
const posts_backup = ref([]);

const loading = ref(false);
const error = ref(null);

const successMessage = ref("");
const errorMessage = ref("");

const newPost = ref({
  title: "",
  body: "",
});

const searchQuery = ref("");
const searchTimeout = ref(null);

//-------------- back button function ------------//
const backToProjects = () => {
  window.history.back();
};

//-------------- delay function ------------//
const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

//-------------- get post funtion ------------//

const loadPosts = async () => {
  // Start loading
  loading.value = true;
  error.value = null;
  posts.value = [];

  searchQuery.value = "";
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }

  try {
    await delay();
    // Get data from the API
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to load posts");
    }

    // Convert response to JSON
    const data = await response.json();

    // Save the posts
    posts.value = data;
    posts_backup.value = data;
  } catch (err) {
    error.value = "Could not load posts. Please check your internet connection and try again.";
    console.error("Error loading posts:", err);
  } finally {
    loading.value = false;
  }
};

//-------------- create post funtion ------------//

const createPost = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  if (!newPost.value.title.trim() || !newPost.value.body.trim()) {
    errorMessage.value = "Please fill in both title and content!";
    return;
  }

  loading.value = true;

  try {
    const postData = {
      title: newPost.value.title.trim(),
      body: newPost.value.body.trim(),
      userId: 1,
    };

    await delay();

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    // Get the response from the server
    const result = await response.json();

    // Show success
    successMessage.value = "Post created successfully!";

    // Add the new post to the top of the posts list
    posts.value.unshift(result);

    // Clear the form
    newPost.value.title = "";
    newPost.value.body = "";

    // Clear success message after 5 seconds
    setTimeout(() => {
      successMessage.value = "";
    }, 5000);
  } catch (error) {
    errorMessage.value = "Sorry, there was a problem creating your post. Please try again.";
    console.error("Error creating post:", error);
  } finally {
    loading.value = false;
  }
};

//-------------- search funtion ------------//
const searchPosts = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  searchTimeout.value = setTimeout(() => {
    const query = searchQuery.value.trim().toLowerCase();

    posts.value = posts_backup.value;

    posts.value = posts.value.filter(
      (post) => post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query)
    );
  }, 300);
};

onMounted(() => {
  loadPosts();
});
</script>

<template>
  <div>
    <button id="back-btn" @click="backToProjects">Back</button>
    <div class="post-header">
      <h1>Posts Directory</h1>
      <button @click="loadPosts">Refresh Posts</button>
    </div>

    <input
      type="text"
      class="search-box"
      v-model="searchQuery"
      @input="searchPosts"
      placeholder="search post..."
      :disabled="loading"
    />

    <div v-if="loading" class="loading">📥 Loading posts...</div>

    <div v-if="error" class="error">
      ❌ {{ error }}
      <br />
      <button @click="loadPosts" style="margin-top: 10px">Try Again</button>
    </div>

    <div v-if="posts.length > 0 && !loading">
      <h2>{{ posts.length }} Posts Found</h2>

      <div
        v-for="post in posts"
        :key="post.id"
        @click="$router.push(`/posts/${post.id}`)"
        class="post-card"
      >
        <div class="post-title">{{ post.title }}</div>
        <div class="post-body">{{ post.body }}</div>
      </div>
    </div>

    <h1>Create a New Post</h1>

    <!-- Success message -->
    <div v-if="successMessage" class="success">✅ {{ successMessage }}</div>

    <!-- Error message -->
    <div v-if="errorMessage" class="error">
      ❌ {{ errorMessage }}
      <button @click="createPost" style="margin-left: 15px; padding: 5px 10px">Try Again</button>
    </div>

    <!-- Form to create a new post -->
    <form @submit.prevent="createPost">
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
        <span v-if="loading" class="loading">📤 Creating Post...</span>
        <span v-else>Create Post</span>
      </button>
    </form>
  </div>
</template>

<style scoped src="@/styles/post.css"></style>
