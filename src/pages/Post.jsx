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

const Post = ({ supabase, navigate }) => {
    const state = useLocation().state;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // 👈 added loading state

    const [initialVotes, setVotes] = useState({
        upvotes: 0,
        downvotes: 0,
    });

    const handleVote = (voteType) => {
        setPost((prevPost) => ({
            ...prevPost,
            [voteType]: prevPost[voteType] + 1,
        }));
    };

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
    };

    const handleDelete = async () => {
        if (post.user_id !== state.user_id) {
            alert("You can only delete your own posts");
            return;
        }
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', state.post_id);
        if (error) {
            console.error(error);
            alert("Error deleting post");
        } else {
            navigate('/home');
        }
    };

    const handleEdit = () => {
        if (post.user_id !== state.user_id) {
            alert("You can only edit your own posts");
            return;
        }
        navigate(`/edit-post/${state.post_id}`, {
            state: {
                user_id: state.user_id,
                post: {
                    title: post.title,
                    content: post.content,
                    image: post.image,
                    post_id: state.post_id,
                },
            }
        });
    };

    const setTimeStr = (timeCreated) => getElapsedTime(timeCreated);

    useEffect(() => {
        if (post && (initialVotes.upvotes !== post?.upvotes || initialVotes.downvotes !== post?.downvotes)) {
            updateVotesDB();
        }
    }, [post]);

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
        };

        const fetchPost = async () => {
            setLoading(true); // 👈 show spinner while loading
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', state.post_id);

            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            fetchAuthor(data[0].user_id);

            setPost({
                title: data[0].title,
                content: data[0].content,
                image: data[0].image,
                user_id: data[0].user_id,
                upvotes: data[0].upvotes,
                downvotes: data[0].downvotes,
            });

            setVotes({
                upvotes: data[0].upvotes,
                downvotes: data[0].downvotes,
            });

            setLoading(false); // 👈 hide spinner once loaded
        };

        fetchPost();
    }, []);

    return (
        <div className='pg'>
            <Navbar_Login 
                navigate={navigate} 
                supabase={supabase} 
                userId={state.user_id} 
            />

            {loading ? (
                <div className="spinner"></div> // 👈 show spinner while loading
            ) : (
                <div className="pg-content">
                    <div className="post-content row">
                        <div className="post-ops col">
                            <IconButton 
                                icon={<ThumbUpOffAltIcon />}
                                content={post?.upvotes}
                                handleClick={() => handleVote('upvotes')} 
                            />
                            <IconButton 
                                icon={<ThumbDownOffAltIcon />}
                                content={post?.downvotes}
                                handleClick={() => handleVote('downvotes')} 
                            />
                            <IconButton 
                                icon={<EditOutlinedIcon />} 
                                handleClick={handleEdit} 
                            />
                            <IconButton 
                                icon={<DeleteIcon />} 
                                handleClick={handleDelete} 
                            />
                        </div>

                        <div className="post-container">
                            <p className='post-info'>
                                <b>{post?.author}</b> Posted {state.timeCreated !== "" ? `${state.timeCreated} ago` : "Right Now"}
                            </p>
                            <h1 className="post-title">{post?.title}</h1>
                            
                            {post?.image && (
                                <img 
                                    src={post?.image} 
                                    alt="Post Image" 
                                    className="post_img" 
                                />
                            )}
                            
                            <p className="post_txt">
                                {post?.content}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
