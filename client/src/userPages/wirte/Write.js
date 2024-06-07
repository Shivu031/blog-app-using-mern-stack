import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './write.css';
import axios from 'axios';
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

const Write = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [title, setTitle] = useState('');
  const {user} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const quillInstance = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [2, 3, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
        ],
      },
    });
    quillRef.current = quillInstance;

    quillInstance.getModule('toolbar').addHandler('image', () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('name', file.name);
        formData.append('file', file);

        try {
          const res = await axios.post('http://127.0.0.1:5000/api/upload', formData);

          if (res) {
            const imageUrl = `http://127.0.0.1:5000/images/${file.name}`;
            const range = quillInstance.getSelection();
            quillInstance.insertEmbed(range.index, 'image', imageUrl);

            // Move cursor to the next line after inserting the image
            quillInstance.setSelection(range.index + 1);
          } else {
            console.error('Failed to upload image');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
    });
  }, []);

  const handleSubmit = async () => {
    const quill = quillRef.current;
    if(!quill){
      console.log("quill is not initialized")
    }
    const delta = quill.getContents();
    const description = delta.ops.map(op => {
      if (op.insert.image) {
        return { type: 'image', data: op.insert.image };
      } else if (typeof op.insert === 'string') {
        // Filter out empty strings and newlines
        const trimmedText = op.insert.trim();
        if (trimmedText) {
          return { type: 'text', data: trimmedText };
        }
      }
      return null;
    }).filter(Boolean);


    try {
      const res = await axios.post('http://127.0.0.1:5000/api/posts', {
        title,
        description,
        author: user.userId
      });

      if (res) {
        console.log('Post created successfully');
        console.log(res.data);
        navigate(`/user/post/${res.data._id}`);
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      <div className="write">
        <form className="writeForm" onSubmit={(e) => e.preventDefault()}>
          <div className="writeFormCon">
            <input
              type="text"
              className="writeInput"
              placeholder="Title"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormCon2">
            <div ref={editorRef} className="quill-editor"></div>
          </div>
          <button
            type="button"
            className="writeSubmit btn btn-success btn-lg"
            onClick={handleSubmit}
          >
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default Write;
