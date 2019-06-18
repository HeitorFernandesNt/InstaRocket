import React, {Component} from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';
import { stripColor } from 'ansi-colors';

class Feed extends Component{

    state ={
        feed:[]
    };

    async componentDidMount(){

        this.registerToSocket();

        const response = await api.get('posts');
        this.setState({feed:response.data});
    }

    registerToSocket=()=> {
        const socket =io('http://localhost:3003');
        
        socket.on('post', newPost=> {
            this.setState({feed: [newPost, ...this.state.feed]});
        })

        socket.on('like', likePost=> {
            this.setState({feed: this.state.feed.map(post => post._id=== likePost._id ? likePost : post)})
        })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    render(){
        return(
         <section id="post-list">
             { this.state.feed.map(post=> (
            <article>
                <header>
                    <div className="user-info">
                        <spam>{post.author}</spam>
                        <spam className="place">{post.place}</spam>
                    </div>
                    <img src={more} alt="Mais" />                       
                </header>
                <img src={`http://localhost:3003/files/${post.image}`} alt="Mais" />   
                <footer>
                    <div className="actions">
                        <button type="button" onClick={() => this.handleLike(post._id)} >
                    <img src={like} alt="Like" />
                    </button>
                    <img src={comment} alt="Comment" />
                    <img src={send} alt="Sent" />
                    </div>
                    <strong>
                    {post.likes} curditas
                    </strong>
                    <p>
                    {post.description}
                        <spam>
                        {post.hashtags}
                        </spam>
                    </p>
                </footer>
            </article>
            ))}
        </section>
        )
    }
}

export default Feed;