import { useEffect, useState } from "react";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "./Spinner";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const queryclient = useQueryClient();

  // useeffect prefetch
  useEffect(() => {
    const nextpage = currentPage + 1;
    queryclient.prefetchQuery({
      queryKey: ["posts", nextpage],
      queryFn: () => fetchPosts(nextpage),
    });
  }, [currentPage, queryclient]);

  // replace with useQuery
  const { data, isLoading } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPosts(currentPage),
  });

  // use mutation
  const mutatefunc = useMutation({
    mutationFn: (postid) => deletePost(postid),
  });

  // use mutate 2
  const mutatefuncupdate = useMutation({
    mutationFn: (postid) => updatePost(postid),
  });

  if (isLoading) return <Spinner />;
  return (
    <>
      <ul>
        {data?.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => {
              mutatefunc.reset();
              setSelectedPost(post);
              mutatefuncupdate.reset();
            }}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous page
        </button>
        <span>Page {currentPage === 1 ? 1 : currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && (
        <PostDetail
          mutateFunc={mutatefunc.mutate}
          updateMutateFunc={mutatefuncupdate.mutate}
          post={selectedPost}
        />
      )}
    </>
  );
}
