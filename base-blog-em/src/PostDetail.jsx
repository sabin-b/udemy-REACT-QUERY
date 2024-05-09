import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";
import Spinner from "./Spinner";

export function PostDetail({ post, mutateFunc, updateMutateFunc }) {
  // replace with useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["postcommernt", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) return <Spinner />;

  if (isError) return <p>there is a problem</p>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => mutateFunc(post.id)}>Delete</button>{" "}
      <button onClick={() => updateMutateFunc(post.id)}>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
