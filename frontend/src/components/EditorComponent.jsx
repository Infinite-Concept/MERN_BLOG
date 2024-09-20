import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import ImageResize from 'quill-image-resize-module-react';
import axios from "axios"
import { useAuth } from '../auth/Auth';
import Modal from '../common/modal/Modal';
import { useNavigate } from 'react-router-dom';
import Input from './form/Input';

Quill.register('modules/imageResize', ImageResize);

function EditorComponent() {
  const [error, setError] = useState({});
  const [blog, setBlog] = useState({
    title: '',
    category: '',
    description: '',
    content: '',
    file: null
  });
  const {user, baseURL, closeModal, openModal, isOpen} = useAuth()
  const navigate = useNavigate()
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

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

    if(!blog.description){
      errors.description = "Description is required"
    }

    if (!blog.file) {
      errors.file = "File is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {

      try {
        
        const formData = new FormData();
        formData.append("title", blog.title);
        formData.append("category", blog.category);
        formData.append("description", blog.description);
        formData.append("file", blog.file);
        formData.append("content", blog.content);
        formData.append("userId", authorId);
  
        const response = await axios.post(`${baseURL}post/create`, formData)
        const result = await response.data

        console.log(result);
        
        
        if(!result.status){
          setModalContent({ title: result.message , body: 'Invalid credentials' });
        }else{
          setModalContent({ title: result.message , body: 'You have successfully added a blog' });
        }
        openModal();

      } catch (error) {
        console.error('Error saving post:', error);
        setModalContent({ title: 'Request failed', body: error.response.data.message });
        openModal();
      }
    }

  };

  return (
    <section style={{padding: "50px"}}>

      <form className='createBlogForm' action="" method="post" encType='multipart/form-data' onSubmit={handleSave}>

        <Input label='Enter blog title' name='title' type='text' errors={error.title} handleFileChange={handleTitleChange} placeholder='Enter title...' value={blog.title} />

        <div className='input_group'>
          <label htmlFor="category">Select blog category</label>
          <select name="category" defaultValue="" onChange={handleTitleChange} id='category'>
            <option disabled value="">Choose category</option>
            <option value="business">Business</option>
            <option value="startup">Startup</option>
            <option value="economy">Economy</option>
            <option value="technology">Technology</option>
          </select>
          {error.category && <p className='error'>{error.category}</p>}
        </div>

        <div className='input_group'>
          <label htmlFor="description">Write blog description</label>
          <textarea name="description" id="description" placeholder="Enter description..." value={blog.description}
            onChange={handleTitleChange} ></textarea>
            {error.description && <p className='error'>{error.description}</p>}
        </div>

        <div className='input_group'>
          <label htmlFor="file">Choose blog image</label>
          <input
            type="file"
            name="file"
            id='file'
            onChange={handleFileChange}
          />  
          {error.file && <p className='error'>{error.file}</p>}
        </div>

        <label htmlFor="">Write blog Content</label>
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

      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} title={modalContent.title} body={modalContent.body}  />
      )}

    </section>
  )
}

EditorComponent.modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ size: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ list: 'ordered'}, { list: 'bullet' }],
    [{ indent: '-1'}, { indent: '+1' }],
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
  'header', 'font', 'size', 'align',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet','indent', 'link', 'image', 'video',
  'color', 'background',
];

export default EditorComponent
