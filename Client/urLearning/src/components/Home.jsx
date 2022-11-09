import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../actions';


export const Home = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)
  console.log(users);
  return (
    <div>
      {users[0].name}
    </div>
  )
}

