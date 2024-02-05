const fetchPosts = async (page) => {
  const res = await fetch(
    `http://localhost:3000/posts?_sort=-id&${
      page ? `_page=${page}&_per_page=5` : ""
    }`
  );
  const postData = await res.json();
  return postData;
};

const fetchTags = async () => {
  const res = await fetch("http://localhost:3000/tags");
  const tagsData = await res.json();
  return tagsData;
};

const addPost = async (post) => {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(post),
  });

  return response.json();
};

export { fetchPosts, fetchTags, addPost };
