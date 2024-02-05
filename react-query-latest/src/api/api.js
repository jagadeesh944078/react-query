const fetchPosts = async () => {
  const res = await fetch("http://localhost:3000/posts?_sort=-id");
  const postData = await res.json();
  return postData;
};

export { fetchPosts };
