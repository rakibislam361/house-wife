import React, { useState } from "react"
import { useDropzone } from "react-dropzone"

function Dropify ()  {

const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img className="dropzone-image" src={file.preview} alt="preview" />
      </div>
    </div>
  ))

  return (
     <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="dz-dropzone">
            <label className={images.length > 0 ? "dropzone-image" : "dropzone-label"}>{images.length > 0 ? images : "Drop files here to upload"}</label>
        </div>
      </div>
    </>
  )
}

export default Dropify
