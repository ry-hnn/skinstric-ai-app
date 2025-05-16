import React from 'react'
import { useNavigate } from 'react-router-dom'
import RotatingBoxes from './RotatingBoxes'
import FormInput from './FormInput'

function UserTest() {
  const navigate = useNavigate()

  return (
    <div className="user-test-container">
      <button className="back-button" onClick={() => navigate(-1)}>
         <object
              className="back-button-icon"
              type="image/svg+xml"
              data="button-icon-shrunk.svg"
              width="40"
              height="40"
            ></object>
        Back
      </button>
      <FormInput />
      <RotatingBoxes />
    </div>
  )
}

export default UserTest
