import React from 'react';
import "./write.css";

const Write = () => {
  return (
    <>
      <div className="write">
        <form className="writeForm">
          <div className="writeFormCon">
            <input type="text" className="writeInput" placeholder="Title" autoFocus={true} />
          </div>
          <div className="writeFormCon2">
            <label htmlFor="fileInput" className="form-label">
              <i className="writeIcon fa-solid fa-plus"></i>
            </label>
            <input type="file" style={{display:'none'}} id="fileInput"/>
            <textarea placeholder='Tell your story...' type='text' className='writeInput writeText'></textarea>
          </div>
          <button type="button" class="writeSubmit btn btn-success btn-lg">Publish</button>
        </form>
      </div>
    </>
  )
}

export default Write
