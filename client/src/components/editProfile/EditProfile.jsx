import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/uploadAction';
import { updateUser } from '../../actions/userAction';
import './EditProfile.css';

const EditProfile = ({data}) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const {password, ...otherData} = data.user;
  const [formData, setFormData] = useState(otherData);
  const [profileImage, setProfileImage] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  
  const dispatch = useDispatch();
  const params = useParams();

  const navigate = useNavigate();


  //Trigger Functions
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    let userData = formData
    if (profileImage) {
      const data = new FormData();
      const filename = Date.now() + profileImage.name
      data.append("name", filename)
      data.append("file", profileImage)
      userData.profilePicture = filename

      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error);
      }
    }

    if (coverImage) {
      const data = new FormData();
      const filename = Date.now() + coverImage.name
      data.append("name", filename)
      data.append("file", coverImage)
      userData.coverPicture = filename

      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error);
      }
    }

    // console.log(params.id);
    // console.log(userData);

    dispatch(updateUser(params.id, userData))
    // navigate('/home')
  }

  return (
    <div className='EditProfile'>

      <div className="edit-title card flexbox">
        <h1>Edit Profile</h1>
      </div>

      <form className="edit-section card">

        <div className="edit-images">
          <p>Profile</p>
          <p>Cover</p>
          <img src={serverPublic + user.profilePicture} alt="" />
          <img src={serverPublic + "post1.jpg"} alt="" />
          <input type="file" name="profileImage" onChange={onImageChange}/>
          <input type="file" name="coverImage" onChange={onImageChange}/>
        </div>

        <div className="edit-details">

          <label htmlFor='firstname'>First Name</label>
          <input type="text" name='firstname' value={formData.firstname} onChange={handleChange}/>

          <label htmlFor='lastname'>Last Name</label>
          <input type="text" name='lastname' value={formData.lastname} onChange={handleChange}/>

          <label htmlFor='username'>Username</label>
          <input type="text" name='username' value={formData.username} onChange={handleChange}/>

          {/* <p>About</p> */}
          <label htmlFor="about">About</label>
          <textarea name="about" value={formData.about} onChange={handleChange}></textarea>

          <label htmlFor='country'>Country</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange}/>

          <label htmlFor='address'>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange}/>

<button className='button' onClick={handleSubmit}>Update</button>

        </div>

      </form>
    </div>

  )
}

export default EditProfile