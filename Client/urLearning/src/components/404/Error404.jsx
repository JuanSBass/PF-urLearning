import error from "../../img/_Pngtree_page_not_found_error_404_5333349-removebg-preview.png";
import { Button } from "flowbite-react";
import style from "./Error404.module.css";
import { useDispatch } from "react-redux";
import { getCourses } from "../../redux/actions";

const Error404 = () => {
  const dispatch = useDispatch();
  const uploadData = () => {
    dispatch(getCourses())

  }

  return (
    <div className={style.containererror}>
      <img src={error} alt="404" loading="lazy" />
      <Button gradientMonochrome="purple" onClick={uploadData}>
        Explorar de nuevo
      </Button>
    </div>
  )
}

export default Error404
