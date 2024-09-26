import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ShowComment from "./showComment";
// import CommentPost from "./CommentPost";

const CommentPage = ({ id }: any) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <ShowComment id={id} />
      {/* <CommentPost slug={id} isAuth={isAuthenticated} /> */}
    </>
  );
};

export default CommentPage;
