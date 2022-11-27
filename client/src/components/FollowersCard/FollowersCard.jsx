import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../api/UserRequest'
import User from '../User/User'
import './FollowersCard.css'

const FollowersCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [persons, setPersons] = useState([])

  useEffect(() => {
    const fetchPerson = async () => {
      const { data } = await getAllUsers();
      setPersons(data)
    }
    fetchPerson();
  }, [])


  return (
    <div className="FollowersCard card">
      <h3>People you may know</h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />
        }
      })}

    </div>
  )
}

export default FollowersCard