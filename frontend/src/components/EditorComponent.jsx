import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import axios from "axios"

function EditorComponent() {
  const [editorHtml, setEditorHtml] = useState('');
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

  const handleSave = async () => {
    try {
        const formData = new FormData();
        formData.append('title', title.title);
        formData.append('category', title.category);
        formData.append('content', editorHtml);

        // Send POST request to backend API endpoint
        await axios.post('http://localhost:5000/api/posts', formData);

        // Optionally, reset state after successful save
        setTitle({ title: '', category: '' });
        setEditorHtml('');
    } catch (error) {
        console.error('Error saving post:', error);
    }
  };

  return (
    <section style={{padding: "50px"}}>

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

      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={EditorComponent.modules}
        formats={EditorComponent.formats}
        placeholder="Write something amazing..."
      />
    </section>
  )
}

EditorComponent.modules = {
  toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
  ],
  clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
  },
};

EditorComponent.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image', 'video'
];

export default EditorComponent
