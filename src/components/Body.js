import React, { useState } from 'react'
import { useStore } from '../reducer/useStore';
import {BsHeartFill, BsChat} from 'react-icons/bs';
import Avatar from 'react-avatar';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { baseUrl } from '../utils/BaseUrl';
import axios from 'axios';
import Feed from './Feed';


function Body() {
  const posts = useStore(state => state.Posts);

  const [open, setopen] = useState(false);

  const [name, setname] = useState('');
  const [comment, setcomment] = useState('');

  function handleClick(id){
    // Check if the user has already liked the post using localStorage
    if (localStorage.getItem(id) === null) {
      axios.patch(`${baseUrl}/posts/likepost/${id}`)
      .then(res => {
        console.log(res.data);
        localStorage.setItem(id, 'true');
      })      
    }
  }

  // Delete the post from the database
  function handleDelete(id){
    axios.delete(`${baseUrl}/posts/delete/${id}`)
    .then(res => {
      window.location.reload();
    })  
  }

  // Add a comment to the post
  function handleComment(id){
    axios.patch(`${baseUrl}/posts/addcomment/${id}`, {
      "comment": comment,
      "creator": name
    })
    .then(() =>{
      setopen(false);
      window.location.reload();
    })
  }


  return (
    <div className='d-flex flex-column align-items-center justify-content-center mt-4 gap-5'>
      {posts && posts.map((post, index) =>{
      return (
        <div key={index}
        className='d-flex flex-column'
        style={{
          width: window.innerWidth > 978? '50%':'85%',
        }}
        >
          <div className='d-flex align-items-center  justify-content-between'>
            <h2 className='mt-3 mb-3'>{post.creator}{' '}<Avatar name={post.creator} round size={45} /></h2>
            <Dropdown>
              <Dropdown.Toggle >
                Options{' '}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href={`/update/${post._id}`}>Edit</Dropdown.Item>
                <Dropdown.Item href="#" onClick={() =>{
                  handleDelete(post._id);
                }}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>
          <img src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt='Preview' className='img-fluid' />
          <h2 className='mt-3'>{post.title}</h2>
          <h5 className='text-muted'>{post.caption}</h5>
          <div className='d-flex gap-3 text-primary mt-4'>
            {post.tags.map((tag, index) => {
              return (
                <span key={index}>#{tag}</span>
              )
            })}
          </div>
          <div className='d-flex flex-column gap-3  mt-4'>
            {post.comments.map((comment, index) => {
              return (
                <div key={index}><span className='fw-bolder'>{comment.creator} </span> {comment.comment}</div>
              )
            })}
          </div>
          <div className='d-flex justify-content-between align-items-center mt-3'>
            <h3><BsHeartFill color={localStorage.getItem(post.id)? 'red':'gray'}  
            onClick={() =>{
              handleClick(post._id);
            }}
            /> {' '}&nbsp; <BsChat color='gray'
            onClick={() =>{
              setopen(!open);
            }}
            /></h3>
            <span>{post.createdAt.slice(0,10)}</span>
          </div>
          <div className='d-flex align-items-center mt-3'>
            <h4>{post.likeCount} likes</h4>
          </div>

        <InputGroup className={open? 'mt-3 d-flex':'d-none'}>
          <InputGroup.Text>Name and Comment</InputGroup.Text>
          <Form.Control value={name} onChange={(e) => setname(e.target.value)} />
          <Form.Control value={comment} onChange={(e) => setcomment(e.target.value)} />
          <Button variant='primary' 
          onClick={() =>{
            handleComment(post._id);
          }}
          >Submit</Button>
        </InputGroup>


        </div>
      )
    })}
    
    <Feed />
    </div>
  )
}

export default Body