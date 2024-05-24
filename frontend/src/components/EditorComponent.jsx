import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import ImageResize from 'quill-image-resize-module-react';
import axios from "axios"

Quill.register('modules/imageResize', ImageResize);

function EditorComponent() {
  const [editorHtml, setEditorHtml] = useState('');
  const [error, setError] = useState({});
  const [title, setTitle] = useState({
    title: '',
    category: '',
    file: null
  });

  const handleTitleChange = (e) => {
    const {name, value} = e.target

    setTitle({ ...title, [name]: value })
  };

  const handleFileChange = (e) => {
    setTitle(prevData => ({
      ...prevData,
      file: e.target.files[0]
    }));
  };

  const handleChange = (html) => {
      setEditorHtml(html);
  };

  const handleSave = async (e) => {
    e.preventDefault()

    const errors = {};

    if(title.title === ""){
      errors.title = "Title is required"
    }else if(title.title.length < 20){
      errors.title = "Title must contain more than 20 character"
    }

    if(title.category === ""){
      errors.title = "Category is required"
    }

    if (title.file === "") {
      errors.file = "file is required";
    }

    if (Object.keys(errors).length > 0) {
      // If there are errors, update state to display them
      setError(errors);
    } else {

      try {
        const data = {
          title: title.title,
          category: title.category,
          file: title.file,
          content: editorHtml
        }
  
        console.log(data);
        const response = await axios.post('http://localhost:3057/post/create', data, {
          headers: {
            'Content-Type': "multipart/form-data"
          }
        })

        setTitle({ title: '', category: '' });
        setEditorHtml('');

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
            value={title.title}
            onChange={handleTitleChange}
          />
        </div>
        {error.title && <p>{error.title}</p>}

        <div className='input_group'>
          <select name="category" value={title.category} onChange={handleTitleChange}>
            <option disabled selected value="">Choose category</option>
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
          value={editorHtml}
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
