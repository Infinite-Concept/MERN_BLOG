import React from 'react'
import Editor from '../../components/Editor'
import { useState } from 'react';
import axios from "axios"
import EditorComponent from '../../components/EditorComponent';

function CreateBlog() {

  // const [title, setTitle] = useState({
  //   title: '',
  //   category: '',
  //   file: null
  // });
  // const [content, setContent] = useState('');

  // const handleTitleChange = (e) => {
  //   const {name, value} = e.target
  //   setTitle({ ...title, [name]: value })
  // };

  // const handleFileChange = (e) => {
  //   setTitle(prevData => ({
  //     ...prevData,
  //     file: e.target.files[0]
  //   }));
  // };

  // const handleContentChange = (newContent) => {
  //   setContent(newContent);
  // };

  // const handleSave = async (e) => {
  //   e.preventDefault()
  //   try {
  //       const formData = new FormData();
  //       formData.append('title', title.title);
  //       formData.append('category', title.category);
  //       formData.append('content', content);

  //       // // Send POST request to backend API endpoint
  //       // await axios.post('http://localhost:3057/post/create', formData);

  //       console.log( content);

  //       // Optionally, reset state after successful save
  //       setTitle({ title: '', category: '', file: null, content: '' });
  //   } catch (error) {
  //       console.error('Error saving post:', error);
  //   }
  // };

  return (

  <section style={{padding: "50px"}}>

    {/* <form action="" method="post" encType='multipart/form-data' onSubmit={handleSave}>

      <input
        type="text"
        placeholder="Enter title..."
        name='title'
        value={title.title}
        onChange={handleTitleChange}
        style={{width: '100%', border: "1px solid rgba(222, 216, 215, 0.4)", padding: "10px 20px", marginBottom: "20px"}}
      />

      <input
        type="text"
        placeholder="Enter category..."
        name='category'
        value={title.category}
        onChange={handleTitleChange}
        style={{width: '100%', border: "1px solid rgba(222, 216, 215, 0.4)", padding: "10px 20px", marginBottom: "20px"}}
      />

      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        style={{width: '100%', border: "1px solid rgba(222, 216, 215, 0.4)", padding: "10px 20px", marginBottom: "20px"}}
      />

      <Editor getContent={handleContentChange}/>
      

      <input
        type="submit"
        value="Create Blog"
        className='submit_create'
        style={{width: '100%', border: "1px solid rgba(222, 216, 215, 0.4)", padding: "10px 20px", marginBottom: "20px"}}
      />

    </form> */}

    <EditorComponent />
  </section>
  )
}

export default CreateBlog
