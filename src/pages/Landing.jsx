import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

import "./Landing.css"
const Landing = ({navigate, supabase}) => {
    return (
        <>
            <Navbar navigate={navigate} supabase={supabase}/>
            <div className='background-pg'>
                <h1>Welcome to D&D Hobby Hub</h1>
                <p className='intro-txt'>Find everything D&D related here!</p>
                <div className="row" style={{width: '40%'}}>
                    <Button
                        content={"Login"}
                        icon={<ArrowRightAltIcon 
                                style={{marginLeft: "1vw"}}
                                className='icon'/>}
                        handleClick={() => navigate("/login")} />
                        
                    <Button 
                        classes={"outlined"}
                        content={"Register"}
                        handleClick={() => navigate("/signup")} />
                </div>
            </div>
        </>
    );
}

export default Landing;