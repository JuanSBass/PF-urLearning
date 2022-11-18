import React from 'react';
import style from "./UploadVideo.module.css";
import Dropzone from "react-dropzone";
import { useState } from 'react';
import axios from 'axios';

const UploadVideo = () => {
  const [video, setVideo] = useState({ linksVideos: [] });
  const [loading, setLoading] = useState(false);

  const handleDrop = (files) => {
    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "urLearning");
      formData.append("api_key", "983694461673571");
      formData.append("timestamp", (Date.now() / 1000) | 0);
      setLoading(true);
      return axios
        .post("https://api.cloudinary.com/v1_1/dv2xlr9k0/video/upload", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          const fileURL = data.secure_url;
          // console.log(fileURL);

          let spicificLinks = video.linksVideos
          spicificLinks.push(fileURL);
          const newObj = { ...video, spicificLinks }
          setVideo(newObj)
          console.log(video);
        })

    })
    axios.all(uploaders).then(() => {
      setLoading(false)
    })

  }


  return (
    <div className={style.contenedorupload}>
      <h1>Sube tus videos aqui</h1>
      <Dropzone
        className={style.dropzone}
        onDrop={handleDrop}
        onChange={e => setImage(e.target.value)}
        value={video}
      >

        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps({ className: "dropzone" })}
              className={style.dropzone}
            >
              <input {...getInputProps()} />
              <span>📁</span>
              <p>Carga tu video aqui o click para seleccionar</p>
            </div>
          </section>
        )}
      </Dropzone>
      {loading ?
        (
          <div className={style.loading}><h3>Cargando video...</h3></div>
        ) :
        (<></>
        )}
      <div className={style.videos}>
        {video.linksVideos.length <= 0
          ? "No hay videos"
          : video.linksVideos.map(vid =>
            <video controls autoPlay key={vid}>
              <source src={vid} type="video/mp4" />
            </video>
          )
        }
      </div>
    </div>
  )
}

export default UploadVideo
