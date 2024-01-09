import { useGetPostsQuery, useNewPostMutation } from "./redux/api";
import PosterCard from "./components/PostsCard";
import { FormEvent, useState } from "react";

const App = () => {
  const { isLoading, isError, isSuccess, data } = useGetPostsQuery("");
  const [newPost] = useNewPostMutation();
  const [title, setText] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const post: Post = {
      title,
      body,
      id: Math.random() * 10000,
      userId: Math.random() * 10000,
    };

    newPost(post);
    setText("");
    setBody("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="text"
          onChange={(e) => setText(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="body"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
        <button type="submit">Submit</button>
      </form>
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        data?.map((item) => <PosterCard key={item.id} post={item} />)
      )}
    </div>
  );
};

export default App;
