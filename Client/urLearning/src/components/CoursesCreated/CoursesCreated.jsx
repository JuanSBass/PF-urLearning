import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./coursescreated.module.css"
import { Table, Rating, Tooltip, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { getProfe } from '../../redux/actions'
import { FcEditImage } from "react-icons/fc"

export const CoursesCreated = () => {
  const coursesCreated = useSelector(state => state.coursesCreated)
  const dispatch = useDispatch();
  const tokken = window.localStorage.getItem("tokken");
  console.log(coursesCreated);

  useEffect(() => {
    dispatch(getProfe(tokken))

  }, [dispatch])


  return (
    <section className={styles.containercourses}>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>
            Portada
          </Table.HeadCell>
          <Table.HeadCell>
            Título del curso
          </Table.HeadCell>
          <Table.HeadCell>
            Rating
          </Table.HeadCell>
          <Table.HeadCell>
            Price
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">
              Edit
            </span>
          </Table.HeadCell>
        </Table.Head>

        {
          coursesCreated?.map(({ title, image, name_prof, rating, price, id, description }) =>
            <Table.Body className="divide-y" key={title}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <Link to={`/course/${id}`}>
                    <Tooltip
                      content={
                        <div>
                          <h1>{title}</h1><br />
                          <p>{description}</p>
                        </div>
                      }
                      style="dark"
                      placement='right'
                      trigger="hover"
                    >
                      <div className={styles.imgcard}>
                        <img src={image} alt="miniatura" />
                      </div>
                    </Tooltip>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <h1 id={styles.title}>{title}</h1>
                </Table.Cell>
                <Table.Cell>
                  <div className={styles.ratingcontainer}>
                    <Rating>
                      <Rating.Star filled={rating > 0} />
                      <Rating.Star filled={rating > 1} />
                      <Rating.Star filled={rating > 2} />
                      <Rating.Star filled={rating > 3} />
                      <Rating.Star filled={rating > 4} />
                    </Rating>
                      {
                        rating === 0 ? (<p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                          Sin resaña
                        </p>) : (<p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                          {rating} de 5
                        </p>)
                      }
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <h1><b>${price}</b></h1>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/course/editcourse/${id}`}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    <Button gradientMonochrome="success">
                      <FcEditImage className="mr-2 h-5 w-5" />
                      Editar
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          )
        }
      </Table>
    </section>
  )
}

export default CoursesCreated;