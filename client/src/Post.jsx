import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userContext } from './App';
import './Post.css';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const navigate = useNavigate();
    const user = useContext(userContext);

    useEffect(() => {
        axios.get('http://localhost:3001/getpostbyid/' + id)
            .then(result => setPost(result.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deletepost/' + id)
            .then(result => {
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='post_container'>
            <div className='post_post'>
                <img src={post.file} alt={post.title} className='post_image' />
                <h1 className='post_title'>{post.title}</h1>
                <p className='post_description'>{post.description}</p>
                <div className='post_actions'>
                    {user.email === post.email ? (
                        <div>
                            <Link to={`/editpost/${post._id}`} className='post_edit'>Edit</Link>
                            <button onClick={e => handleDelete(post._id)} className='post_delete'>Delete</button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Post;