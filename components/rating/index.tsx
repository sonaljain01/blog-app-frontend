import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { PostRating } from "./ratingPost";
import { ShowRating } from "./showRating";
const Rating = ({ id }: any) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <ShowRating id={id} />
      <PostRating id={id} isAuth={isAuthenticated} />
    </>
  );
};

export default Rating;
