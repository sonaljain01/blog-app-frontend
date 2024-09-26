import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ShowComment from "./showComment";
import CommentPost from "./commentPost";

const CommentPage = ({ id }: any) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <ShowComment id={id} />
      <CommentPost id={id} isAuth={isAuthenticated} />
    </>
  );
};

export default CommentPage;
