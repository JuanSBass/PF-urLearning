import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./coursescreated.module.css"
import { Table, Rating, Tooltip } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { getProfe } from '../../redux/actions'

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
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                </Table.Cell>
                <Table.Cell>
                  <h1>${price}</h1>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/course/editcourse/${id}`}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Edit
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
