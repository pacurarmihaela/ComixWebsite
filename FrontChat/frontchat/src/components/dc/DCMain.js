import React, { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {motion,useAnimation} from "framer-motion";

import "./DCMain.css"

//Component for displaying DC Comix
const DCMain = ({comix})=>{

    // State variable for controlling visibility of comic details
    const [showAbout, setShowAbout] = useState(false);
    const controls = useAnimation(); //Animation controls

    // Function to handle click on arrow icon
    const handleIconClick = ()=>{
        setShowAbout(!showAbout);// Toggling showAbout state
        controls.start({ bottom: showAbout ? "100%" : "0%" });// Animation control for showing/hiding about section
    }

     // Filtering DC comics from the provided comics list
     const dcComix = comix.filter((comic)=> comic.publisher=="DC");
     return(
        <div className="dcmainwrapper">
         <div >
             <div className="wrapper dcwrapper">
             <h1>DC COMIX</h1>
             {/* Carousel component for displaying DC comics */}
              <Carousel className="carous">
            {/* Mapping through DC comics to display each comic */}
             {comix &&dcComix.map((comic)=>(
                 <div key={comic.id} className="mainContainer">
                    <div className="secondSection">
                    {/* Comic poster and details */}
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
                          {/* Link to view more details of the comic */}        
                     <Link to={`/comix/${comic.title}`}>
                         <button className="comicbtn">See More</button>
                     </Link>
                     </div>
                        </div>
                         {/* About section with motion animation */}        
                        <div>
                     <motion.div className="aboutSection" initial={{bottom:"100%"}} 
        animate={controls}>
                        
                          <h4>About: {comic.title}</h4>
                        <p>
                            {comic.about}
                            </p> 
                        
                       </motion.div>
                        {/* Button for toggling the about section */}
                     <button onClick={handleIconClick} className="ArrowkeyBtn">
                        {showAbout ? <KeyboardDoubleArrowUpIcon className="keyUp key"/> : <KeyboardDoubleArrowDownIcon className="keyDown key"/>}
                     </button>
            </div>

                     </div>
                     </div>

 
             ))}
             </Carousel>
         </div>
             </div>
            
 
                 </div>
     )
 }
 
 export default DCMain;