import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addPost, fetchPosts, fetchTags } from "../api/api";
import { useState } from "react";

const PostLists = () => {
  const [page, setPage] = useState(1);

  const {
    data: postData,
    isLoading,
    isError,
    error,
    // hasNextPage,
    // fetchNextPage,
  } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: () => fetchPosts(page),
    // getNextPageParam: (postData) => postData.next,

    // staleTime: 1000 * 60 * 5,
    // placeholderData: keepPreviousData,

    // it will never be cached it will forever stale
    // gcTime: 0,
    //it will be fetched every 5 seconds
    // refetchInterval: 1000 * 5,
  });

  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  const {
    mutate,
    isError: isPostError,
    error: postError,
    isPending,
    reset,
  } = useMutation({
    mutationFn: addPost,
    onMutate: () => {
      return { id: 1 };
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
        // predicate: (query) =>
        //   query.queryKey[0] === "posts" && query.queryKey[1].page > 2,
      });
    },
    // onError:(error,variables,context) => {},
    // onSettled:(data,error,variables,context) => {}
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on"
    );
    if (!title || !tags) return;
    mutate({ id: postData.data.length + 1, title, tags });
    e.target.reset();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="enter the title"
          className="postbox"
        />
        <div className="tags">
          {tagsData?.map((tag) => (
            <div key={tag}>
              <input type="checkBox" id={tag} name={tag} />
              <label htmlFor={tag}>{tag}</label>
            </div>
          ))}
        </div>
        <button disabled={isPending}>
          {isPending ? "pending..." : "Post"}
        </button>
      </form>

      <div className="pages">
        <button
          onClick={() => setPage((oldpage) => Math.max(oldpage - 1, 0))}
          disabled={!postData?.prev}
        >
          prevpage
        </button>
        <span>{page}</span>
        <button
          onClick={() => setPage((oldPage) => oldPage + 1)}
          disabled={!postData?.next}
        >
          nextpage
        </button>
      </div>

      {isLoading && isPending && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}
      {isPostError && <p onClick={() => reset()}>Unable to Save Data</p>}
      {postData?.data?.map((post) => (
        <div key={post.id} className="post">
          <div>{post.title}</div>
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      ))}
      {/* {hasNextPage && <button onClick={fetchNextPage}>Load More</button>} */}
    </div>
  );
};

export default PostLists;
