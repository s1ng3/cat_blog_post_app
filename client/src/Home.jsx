import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/getposts')
            .then(posts => {
                setPosts(posts.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='posts_container'>
            {posts.map(post => (
                <Link to={`/post/${post._id}`} className='post' key={post._id}>
                    <div className='post_post'>
                        <img src={post.file} alt={post.title} className='post_image' />
                        <div className='post_text'>
                            <h2 className='post_title'>{post.title}</h2>
                            <p className='post_description'>{post.description}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Home;
