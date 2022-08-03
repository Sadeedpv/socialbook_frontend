import axios from 'axios';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router'
import { baseUrl } from '../utils/BaseUrl';

function Update() {
    const id = useParams();
    const navigate = useNavigate();
    const [post, setPost] = React.useState();

    const [caption, setCaption] = React.useState('');
    const [tags, settags] = React.useState('');
    const [title, settitle] = React.useState('');

    useEffect(() => {
        axios.get( `${baseUrl}/posts/update/${id.id}`)
        .then(res => {
            setPost(res.data);
            setCaption(res.data.caption);
            settags(res.data.tags);
            settitle(res.data.title);
        })
        .catch(err => {
          alert(`Error: ${err.response.data}`);
          navigate('/');
        })
    }, [id.id, navigate])

    function handleSubmit(){
        axios.post(`${baseUrl}/posts/update/${id.id}`, {
            "title": title,
            "caption": caption,
            "creator":post.creator,
            "tags":tags.split(','),
            "selectedFile":post.selectedFile
        }).then(() =>{
            navigate('/');
        })
    }
    
  return (
    <div className='d-flex align-items-center justify-content-center mt-5'>
    <Form onClick={(e) =>{
        e.preventDefault();
        handleSubmit();
    }}>
      <Form.Group className="mb-4" >
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" value={post?.creator} disabled />
      </Form.Group>

      <Form.Group className="mb-4" >
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} 
        onChange={(e) => settitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4" >
        <img src={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt='Preview'
        className='img-fluid'
        style={{
            objectFit: 'contain',
            width: '20rem',
        }}
        /><br />
      </Form.Group>

      <Form.Group className="mb-4" >
        <Form.Label>Caption</Form.Label>
        <Form.Control type="text"  value={caption}
        onChange={(e) =>{setCaption(e.target.value)}}
        />
      </Form.Group>

      <Form.Group className="mb-4" >
        <Form.Label>Tags</Form.Label>
        <Form.Control type="text" value={tags} 
        onChange={(e) => {settags(e.target.value)}}
        />
        <Form.Text className="text-muted">
        Add tags without # symbol and , seperated
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Update post
      </Button>
    </Form>


    </div>
  )
}

export default Update