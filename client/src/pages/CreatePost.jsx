import React, {useState} from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase.js";
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function CreatePost() {
  const { currentUser } = useSelector(state => state.user);
  const [file, setfile] = useState(null);
  const [uploadProgress, setuploadProgress] = useState(null);
  const [uploadError, setuploadError] = useState(null);
  const [formData, setformData] = useState({});
  const [publishError, setpublishError] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    try {
      if(!file) {
        setuploadError("Please select an image");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setuploadProgress(progress.toFixed(0));
        },
        (error) => {
          setuploadError("Image upload failed");
          setuploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setuploadProgress(null);
            setuploadError(null);
            setformData({
              ...formData,
              image: downloadURL
            });
          })
        }
      )
    } catch (error) {
      setuploadError("Image upload failed");
      setuploadProgress(null);
      console.log(error);
    }
  }


  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedData = {
      ...formData,
      userId: currentUser._id
    }
    console.log(combinedData);
    const response = await fetch('https://insightx-blog.onrender.com/api/post/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(combinedData)
    });
    const data = await response.json();
    console.log(data);
    if(!response.ok) {
      setpublishError(data.message);
    }
    else {
      setpublishError(null);
      navigate(`/post/${data.slug}`);
    }
  }


  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            onChange = {handleChange}
          />
          <Select
            id = "category"
            onChange={handleChange}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="machine-learning">Machine Learning</option>
            <option value="database">Database</option>
            <option value="cloud">Cloud</option>
            <option value="security">Security</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setfile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleFileUpload}
            disabled = {uploadProgress}
          >
            {
              uploadProgress? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value = {uploadProgress}
                    text = {`${uploadProgress || 0}%`}
                  />
                </div>
              ): (
                'Upload an image'
              )
            }
          </Button>
        </div>
        {uploadError && (
          <Alert color= 'failure'>{uploadError}</Alert>
        )}
        {formData.image && (
          <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange= {(value) => {setformData({
            ...formData,
            content: value
          })}}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {
          publishError && (
            <Alert color = "failure" className="mt-5">{publishError}</Alert>
          )
        }
      </form>
    </div>
  );
}
