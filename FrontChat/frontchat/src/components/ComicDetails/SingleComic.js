import React, {useState,useEffect} from 'react';
import api from '../../api/axios';
import "./SingleComic.css"
import {motion} from "framer-motion";

//Component for displaying details of a SINGLE COMIC
const SingleComic = ({title})=>{

    //State variable for storing comic data
    const [comic, setComic] = useState();

    // Effect hook to fetch comic data from the API
    useEffect(()=>{
        const fetchSingleComic = async()=>{
            try{
                 // Fetching comic data from the API using axios instance
                const response = await api.get(`api/v1/comix/${title}`);

                 // Updating state with fetched comic data
                setComic(response.data);
        }catch(err){
            console.error('error fetching',err);
        }
    };

    // Calling the fetch function
    fetchSingleComic();

   },[title]); //ensures effect runs when 'title' prop changes

   // Conditional rendering while waiting for comic data to load
   if(!comic){
    return <div>Loading...</div>
   }

   return(
    <div className='singleComicContainer'style={{"--img":`url(${comic.backdrop})`}}>
        <div className='issueMainContainer'>

        <div className="issueMainDetails">
        <h2>{comic.title}</h2>

        <p>publisher: {comic.publisher}</p>
        </div>
        <ul className='issueListContainer'>
        <h3>Issues</h3>
         {/* Mapping through comic issues to display issue details */}
            {comic.issues.map((issue)=>(
                <li key={issue.issueNumber}>
                     {/* Link to issue provided with issue title */}
                    <a href={issue.link} target="_blank">
                       {issue.title}
                    </a>
                </li>
            ))}
        </ul>
        </div>
            <div className='soundtrackMainContainer'>
            <h2>While Reading: </h2>
       
        <ul className='soundtrackDetails'>
               {/* Mapping through comic soundtrack to display soundtrack details */}
            {comic.soundtrack.map((sound)=>(
                    <motion.div className='singleSound' 
                    initial={{scale:"0.7",rotate:"-90deg"}}
                    whileHover={{ scale: 1, rotate: 0 }}
                    whileTap={{
                      scale: 0.8,
                      rotate: 0,
                      borderRadius: "100%"
                    }}
                    >
                    <ul className='soundList'>
                    <li className="soundItem" key={sound.id}>
                         <div className='singleImg'>
                         {/* Displaying soundtrack image */}
                                        
                        <img src={sound.picture} />
                         </div>

                         <div className='singleDetails'>
                        {/* Link to soundtrack provided with soundtrack title */}
                                       
                        <a href={sound.youtubeLink} target="_blank" >Listen to: {sound.title}</a>
                         </div>
                    </li>
                    </ul>
                    </motion.div>
                ))
            }
        </ul>

        </div>
    </div>

   )

}

export default SingleComic;