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

<style scoped>
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.post-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 15px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.post-title {
  color: #007acc;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.post-body {
  color: #666;
  margin: 5px 0;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #666;
  padding: 40px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

button {
  background: #007acc;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}
button:hover {
  background: #005f99;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.success {
  background: #e6ffe6;
  color: #060;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
}

.error {
  background: #ffe6e6;
  color: #d00;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
}

button#back-btn {
  background: gray;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: bold;
}
button#back-btn:hover {
  background: darkgray;
}
</style>
