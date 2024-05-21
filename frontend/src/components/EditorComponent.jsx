import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import '@ckeditor/ckeditor5-build-classic/build/translations/en';
// import { uploadImage } from './uploadImage'; 

function EditorComponent() {
  const [editorData, setEditorData] = useState('');

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const fontFamilies = [
    'Lato, sans-serif',
    'Poppins, sans-serif',
    'Roboto, sans-serif',
    'Sen, sans-serif',
    'Inter, sans-serif',
  ];

  return (
    <section>
        <div style={{padding: "50px 0"}}>
            <h2 className='heading2' style={{color: "var(--black-blue)", marginBottom: "20px"}}>Create Blog</h2>
            <CKEditor
                editor={ClassicEditor}
                config={{}}
                data={editorData}
                onChange={handleEditorChange}
            />
        </div>
    </section>
  );
}

export default EditorComponent;
