import React, {useState} from "react";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {motion,useAnimation} from "framer-motion";

//Component for other Publishers
const OtherPublisher = ({comix})=>{
     // State variables
    const [showAbout, setShowAbout] = useState(false); // State variable for toggling about section
    const controls = useAnimation(); // Framer Motion controls

     // Function to handle icon click to toggle about section
    const handleIconClick = ()=>{
        setShowAbout(!showAbout); // Toggle the state variable
        controls.start({ bottom: showAbout ? "100%" : "0%" }); // Animate the about section in or out
    }

    // Filtering comics for other publishers
     const otherComix = comix.filter((comic)=> comic.publisher=="other");
 
     return(
        <div className="othermainwrapper">
        <div>
            <div className="wrapper otherwrapper">
            <h1>OTHER COMIX</h1>
             {/* Carousel to display other publisher comics */}
            <Carousel className="carous"> 
                {/* Mapping through other publisher comics and displaying each comic */}
            {comix &&otherComix.map((comic)=>(
                <div key={comic.id} className="mainContainer">
                   <div className="secondSection">
                     {/* Poster container */}
                    <div className="posterContainer " style={{"--img":`url(${comic.backdrop})`}}>
                       <div className="imageContainer">
                        <img src={comic.poster}/>
                        </div>
                        <div className="withButton">
                    <div className="comicDetails">
                    <h2>{comic.title}</h2>
                    <p>Publisher: {comic.publisher}</p>
                    <p>Author: {comic.author}</p>
                        </div>
                        {/* Button to see more details */}
                                            
                    <Link to={`/comix/${comic.title}`}>
                        <button className="comicbtn">See More</button>
                    </Link>
                    </div>
                    </div>
                     {/* About section */}
                    <div>
                     {/* Framer Motion animation for the about section */}
                                       
                <motion.div className="aboutSection" initial={{bottom:"100%"}} 
                animate={controls}>
   
                 <h4>About: {comic.title}</h4>
                    <p>
                      {comic.about}
                     </p> 
   
                </motion.div>
                  {/* Button to toggle about section */}
                                        
                <button onClick={handleIconClick} className="ArrowkeyBtn">
                {showAbout ? <KeyboardDoubleArrowUpIcon className="keyUp key"/> : <KeyboardDoubleArrowDownIcon className="keyDown key"/>}
</button>
</div>
                      </div>

                    <div className="aboutSection">
                       {comic.about}
                       </div>
                    </div>

            ))}
             </Carousel>
        </div>
            </div>
           

                </div>
     )
 }
 
 export default OtherPublisher;