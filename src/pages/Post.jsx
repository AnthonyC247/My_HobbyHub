import './Post.css';
import Navbar_Login from '../components/Navbar_login';
import IconButton from '../components/IconButton';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getElapsedTime } from '../js/time';

// icons
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const Post = ({supabase, navigate}) => {
    const state = useLocation().state;
    console.log(state);

    const [post, setPost] = useState(null);

    const [initialVotes, setVotes] = useState({
        upvotes: 0,
        downvotes: 0,
    });

    const handleVote = (voteType) => {
        setPost((prevPost) => ({
            ...prevPost,
            [voteType]: prevPost[voteType] + 1,
        }));
    }

    const updateVotesDB = async () => {
        const { data, error } = await supabase
            .from('posts')
            .update({
                upvotes: post['upvotes'],
                downvotes: post['downvotes'],
            })
            .eq('id', state.post_id);
        if (error) {
            console.error(error);
            alert("Error updating votes");
        }
    }

    const handleDelete = async () => {
        // check if the user is the author of the post
        if (post.user_id !== state.user_id) {
            alert("You can only delete your own posts");
            return;
        } else {
            const { data, error } = await supabase
                .from('posts')
                .delete()
                .eq('id', state.post_id);
            if (error) {
                console.error(error);
                alert("Error deleting post");
            }
            navigate('/home');
        }
    }

    const handleEdit = () => {
        // only the author can edit the post
        if (post.user_id !== state.user_id) {
            alert("You can only edit your own posts");
            return;
        } else {
            navigate(`/edit-post/${state.post_id}`, {state: {
                user_id: state.user_id,
                post: {
                    title: post.title,
                    content: post.content,
                    image: post.image,
                    post_id: state.post_id,
                },
            }});
        }
        
    }
    console.log(`Post: ${post?.user_id}\nSigned in: ${state.user_id}`);


    const setTimeStr = (timeCreated) => getElapsedTime(timeCreated);

    useEffect(() => {
        if (post && (initialVotes.upvotes !== post?.upvotes || initialVotes.downvotes !== initialVotes?.downvotes)) updateVotesDB();
    }, [post]);


    // Pull the relavent comments for from the db
    useEffect(() => {
        const fetchAuthor = async (authorID) => {
            const { data, error } = await supabase
                .from('users')
                .select('username')
                .eq('id', authorID);
            if (error) {
                console.error(error);
                return;
            }
            setPost((prevPost) => ({
                ...prevPost,
                author: data[0].username,
            }));
        }

        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', state.post_id);
            if (error) {
                console.error(error);
                return;
            }
            fetchAuthor(data[0].user_id);
            
            setPost((prevPost) => ({
                ...prevPost,
                title: data[0].title,
                content: data[0].content,
                image: data[0].image,
                user_id: data[0].user_id,
                upvotes: data[0].upvotes,
                downvotes: data[0].downvotes,
            }));

            // set the time str
            setTimeStr(data[0].created_at);

            // set the inital vote count
            setVotes((prevVotes) => ({
                ...prevVotes,
                upvotes: data[0].upvotes,
                downvotes: data[0].downvotes,
            }));
        }

        fetchPost();

    }, []);

    return (
        <div className='pg'>
            <Navbar_Login 
                navigate={navigate} 
                supabase={supabase} 
                userId={state.user_id}/>
            <div className="pg-content">
                <div className="post-content row">
                    <div className="post-ops col">
                        <IconButton 
                            icon={<ThumbUpOffAltIcon />}
                            content={post?.upvotes}
                            handleClick={() => handleVote('upvotes')} />
                        <IconButton 
                            icon={<ThumbDownOffAltIcon />}
                            content={post?.downvotes}
                            handleClick={() => handleVote('downvotes')} />
                        <IconButton 
                            icon={<EditOutlinedIcon />} 
                            handleClick={handleEdit}/>
                        <IconButton 
                            icon={<DeleteIcon />} 
                            handleClick={handleDelete}/>
                    </div>

                    <div className="post-container">
                        <p className='post-info'>
                            <b>{post?.author}</b> Posted {state.timeCreated !== "" ? state.timeCreated + " ago" : "Right Now"}
                        </p>
                        <h1 className="post-title">{post?.title}</h1>
                        
                        <img 
                            src={post?.image} 
                            alt="Post Image" 
                            className="post_img" />
                        
                        <p className="post_txt">
                            {post?.content}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Post;