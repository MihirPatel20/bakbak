import { UilTimes } from '@iconscout/react-unicons';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/uploadAction';
import avatarImage from '../../images/profile-photos/toy-6.jpg';
import ImageVector from '../../images/svg/image-video-vector-2.svg';
import './NewPostColumn.css';

const NewPostColumn = () => {
  const {user} = useSelector((state)=>state.authReducer.authData)
  const loading = useSelector((state) => state.postReducer.uploading)
  const [image, setImage] = useState(null);
  const desc = useRef();
  const dispatch = useDispatch();
  

  const onImageChange = (event) => {

    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }

    if(image) {
      const data = new FormData()
      const filename = Date.now() + image.name;
      data.append("name", filename)
      data.append("file", image)
      newPost.image = filename;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
      
    }

    dispatch(uploadPost(newPost))

    reset()
  }

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  }


  return (
    <div className="NewPostColumn">
      <div className="NewPostTitle card flexbox">
        <h3>Create a New Post</h3>
      </div>


      <div className="PreviewImage card">

        <div className='SharePost card'>
          <div className="share-section flex">
            <img className='profile-picture' src={avatarImage} alt="" />
            <input ref={desc} required type="text" placeholder="What's on your mind!" name="desc" id="" />
            <button className="button share-btn" onClick={handleSubmit}>
              {loading ? "Uploading..." : "Share"}
            </button>
          </div>
        </div>

        {image
          ? (
            <div className="PreviewImageArea flexbox">
              <img className='myImage' src={URL.createObjectURL(image)} alt="" />
              <UilTimes onClick={()=> setImage(null)}/>
            </div>)
          : (
            <div className="SelectImage card flexbox">
              <img src={ImageVector} alt="" />
              <p>Drag your image here</p>
              <label htmlFor="file">Browse File</label>
              <input type='file' id='file' className="input-image" onChange={onImageChange}/>
            </div>)
        }


      </div>

    </div>
  )
}

export default NewPostColumn