import { useEffect, useState } from 'react';
import Navbar_Login from '../components/Navbar_login';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import "./CreatePost.css";
import { useLocation } from 'react-router-dom';

const CreatePost = ({navigate, supabase}) => {
    const userId = useLocation().state?.user_id;
    const postInfo = useLocation().state?.post;

    const [post, setPost] = useState({ 
        title: postInfo?.title || '', 
        content: postInfo?.content || '',
        image: postInfo?.image || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // add the post to the database
        await editPost();
        
        navigate(`/post/${postInfo.post_id}`, {state: {
            user_id: userId,
            post_id: postInfo.post_id,
        }}); // navigate back to the post page
    };

    const editPost = async () => {
        const { data, error } = await supabase
            .from('Posts')
            .update({
                title: post.title,
                content: post.content,
                image: post.image,
            })
            .eq('id', postInfo.post_id);
        if (error) {
            console.error(error);
            alert("Error updating post");
        }
    }

    return (
        <div className='pg'>
            <Navbar_Login 
                navigate={navigate} 
                supabase={supabase}
                userId={userId} />
            <div className='post-form-container'>
                <h1 className='form-title'>Editing Post</h1>
                <form onSubmit={handleSubmit}>
                    <TextInput 
                        placeholder={"Title"}
                        classes={"post-form-input form-txt"}
                        value={post.title}
                        handleChange={handleChange}
                        name={"title"}/>
                    <textarea
                        name="content"
                        placeholder='Content...'
                        value={post.content}
                        onChange={handleChange}
                        className='text-area form-txt'
                    ></textarea>
                    <div className="row">
                        <TextInput 
                            placeholder={"Image URL (Optional)"}
                            classes={"post-form-input form-txt"}
                            value={post.image}
                            handleChange={handleChange}
                            name={"image"}/>
                    </div>
                    <Button 
                        submit={true}
                        content={"Edit Post"}
                        handleClick={handleSubmit}
                        classes={"form-btn"}
                        />
                </form>
            </div>
        </div>
    );
};

export default CreatePost;