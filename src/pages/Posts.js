import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'; 
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { checkFile, getBase64 } from '../utils/getBase64';
import { baseUrl } from '../utils/BaseUrl';
import { useNavigate } from 'react-router';
 

function BasicExample() {

  const navigate = useNavigate();

    const [author, setauthor] = useState('');
    const [title, settitle] = useState('');
    const [caption,setcaption ] = useState('');
    const [tags, settags] = useState('');
    const [image, setimage] = useState('');

    function handleSubmit(){
      if (author === '' || title === '' || caption === '' || tags === '' || image === '') {
        alert('Please fill all the fields');
        return;
      }else{
        axios.post(`${baseUrl}/posts`, {
            "title": title,
            "caption": caption,
            "creator": author,
            "tags": tags.split(','),
            "selectedFile": image,
          }).then(() =>{
            navigate('/');
          })
              .catch(err => console.log(err))
            }

        // Reset the text input

        settitle('');
        setcaption('');
        settags('');
        setimage('');
        setauthor('');
    }

  return (
    <div className='d-flex align-items-center justify-content-center mt-5'>
    <Form onSubmit={(e) =>{
        e.preventDefault();
        handleSubmit();
    }} action='/'>
      <Alert variant='warning' >Don't leave any fields blank!</Alert>
      <Form.Group className="mb-4" >
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" value={author} onChange={(e) => setauthor(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-4" >
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => settitle(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-4" >
        <img src={image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt='Preview'
        className='img-fluid'
        style={{
            objectFit: 'contain',
            width: '20rem',
        }}
        /><br />
        <Form.Label>Select Image</Form.Label><br />
        <Form.Control type="file" onChange={(e) =>{
          console.log(checkFile(e.target.files[0]));
          if (checkFile(e.target.files[0])){
            getBase64(e.target.files[0]).then(base64 => setimage(base64));
          }else{
            alert('Please select an image file');
          }
        }} />
      </Form.Group>

      <Form.Group className="mb-4" >
        <Form.Label>Caption</Form.Label>
        <Form.Control type="text"  value={caption} onChange={(e) => setcaption(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-4" >
        <Form.Label>Tags</Form.Label>
        <Form.Control type="text" value={tags} onChange={(e) => settags(e.target.value)} />
        <Form.Text className="text-muted">
        Add tags without # symbol and , seperated
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Create post
      </Button>
    </Form>


    </div>
  );
}

export default BasicExample;