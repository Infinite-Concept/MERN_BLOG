import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import ImageResize from 'quill-image-resize-module-react';
import axios from "axios"
import { useAuth } from '../auth/Auth';

Quill.register('modules/imageResize', ImageResize);

function EditorComponent() {
  const [error, setError] = useState({});
  const [blog, setBlog] = useState({
    title: '',
    category: '',
    content: '',
    file: null
  });
  const {user, baseURL} = useAuth()

  let authorId = user?.user?._id;
  

  const handleTitleChange = (e) => {
    const {name, value} = e.target

    setBlog({ ...blog, [name]: value })

    setError(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleFileChange = (e) => {
    setBlog(prevData => ({
      ...prevData,
      file: e.target.files[0]
    }));
  };

  const handleChange = (html) => {
    setBlog(prevData => ({
      ...prevData,
      content: html
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault()

    const errors = {};

    if(!blog.title){
      errors.title = "Title is required"
    }else if(blog.title.length < 20){
      errors.title = "Title must contain more than 20 character"
    }

    if(!blog.category){
      errors.category = "Category is required"
    }

    if (!blog.file) {
      errors.file = "file is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {

      try {
        
        const formData = new FormData();
        formData.append("title", blog.title);
        formData.append("category", blog.category);
        formData.append("file", blog.file);
        formData.append("content", blog.content);
        formData.append("userId", authorId);
  
        // console.log(data);
        const response = await axios.post(`${baseURL}post/create`, formData)
        console.log(response);
        
        // setTitle({ title: '', category: '' });

      } catch (error) {
        console.error('Error saving post:', error);
      }
    }

  };

  return (
    <section style={{padding: "50px"}}>

      <form className='createBlogForm' action="" method="post" encType='multipart/form-data' onSubmit={handleSave}>

        <div className='input_group'>
          <input
            type="text"
            placeholder="Enter title..."
            name='title'
            value={blog.title}
            onChange={handleTitleChange}
          />
        </div>
        {error.title && <p>{error.title}</p>}

        <div className='input_group'>
          <select name="category" defaultValue="" onChange={handleTitleChange}>
            <option disabled value="">Choose category</option>
            <option value="business">Business</option>
            <option value="startup">Startup</option>
            <option value="economy">Economy</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        {error.category && <p>{error.category}</p>}

        <div className='input_group'>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
          />  
        </div>
        {error.file && <p>{error.file}</p>}

        <ReactQuill
          theme="snow"
          value={blog.content}
          onChange={handleChange}
          modules={EditorComponent.modules}
          formats={EditorComponent.formats}
          placeholder="Write something amazing..."
        />
        <input
          type="submit"
          value="Create Blog"
          className='submit_create'
          style={{width: '100%', border: "1px solid rgba(222, 216, 215, 0.4)", padding: "10px 20px", marginBottom: "20px"}}
        />

      </form>
    </section>
  )
}

EditorComponent.modules = {
  toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'],
  ],
  clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
};

EditorComponent.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet','indent', 'link', 'image', 'video',
  'color', 'background',
];

export default EditorComponent
