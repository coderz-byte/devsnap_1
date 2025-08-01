import { FaLink, FaRegComment } from "react-icons/fa6";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import { toast } from "sonner";

import { useAuthStore } from "@/store/useAuthStore";

import { usePostStore } from "../../usePostStore";

const PostActionButtons = ({ post, commentIcon = true }) => {
  const { authUser } = useAuthStore();
  const { likePost, bookmarkPost } = usePostStore();

  const authUserPostsLikes = post?.likes?.includes(authUser?._id);
  const postbookmarked = authUser?.bookmarks?.includes(post?._id);

  const handleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    likePost(post);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    e.preventDefault();
    bookmarkPost(post);
  };

  const handleCopyPostLink = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await navigator.clipboard.writeText(
      `${import.meta.env.VITE_BASE_URL}/post/${post._id}`,
    );

    toast.message("🔗 Copy link to clipboard");
  };

  return (
    <div className={`flex justify-between items-center`}>
      <div className={`flex gap-5`}>
        <button
          className={`flex gap-2 items-center z-10 cursor-pointer`}
          onClick={handleLike}
        >
          {authUserPostsLikes ? (
            <>
              <IoIosHeart
                className="text-like-text dark:text-green-400"
                size={20}
              />
              <span className="">{post?.likes?.length}</span>
            </>
          ) : (
            <>
              <IoIosHeartEmpty
                className="text-text-secondary group-hover:text-like-text"
                size={20}
              />
              <span>{post?.likes?.length}</span>
            </>
          )}
        </button>

        {commentIcon && (
          <button className={`flex gap-2 items-center z-10 cursor-pointer`}>
            <FaRegComment />
            <span>{post?.comments?.length}</span>
          </button>
        )}

        <button
          variant="ghost"
          onClick={handleBookmark}
          className="cursor-pointer"
        >
          {postbookmarked ? (
            <MdBookmark size={20} />
          ) : (
            <MdOutlineBookmarkBorder size={20} />
          )}
        </button>
      </div>
      <div>
        <button className="cursor-pointer" onClick={handleCopyPostLink}>
          <FaLink size={15} />
        </button>
      </div>
    </div>
  );
};

export default PostActionButtons;
