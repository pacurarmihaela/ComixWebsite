import React, { useState,useEffect } from "react";
import "./Home.css"
import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import { useMediaQuery } from "@uidotdev/usehooks";

//Component for the home page
const Home = ({comix})=>{
  {/* COMIX FILTERS FOR DC,MARVEL, OTHER*/}
  const marvelComix = comix.filter((comic)=>comic.publisher=="Marvel");
  const dcComix = comix.filter((comic)=> comic.publisher=="DC");
  const otherPublisher = comix.filter((comic)=>comic.publisher=="other");
  {/* END OF FILTERING*/}

    {/* ------FRAMER MOTION-----  */}
    
    const isDesktop = useMediaQuery('(min-width:700px)');

     const variants = isDesktop ? {
      initial:{x:-1000, opacity:0} ,
      whileInView:{  x:0, opacity:1},
      transition:{duration:2}
     }:{
      initial:{ opacity:1, y:30} ,
      whileInView:{ opacity:1, y:0},
      transition:{duration:0.5}
     }

     console.log(isDesktop);

    return(
          <div className="Home">
            {/* FRAMER MOTION END*/}
        <motion.div   className="container">
          <motion.div className="intro"
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          exit={{opacity:0, x:-150}}>
            <motion.div className="herodesc">

            <h3>WELCOME TO </h3>
            <motion.h2  className="special"
            
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:1, delay:0.5}}
            >COMIX</motion.h2>
            <p>An Online Comic Book References</p>
            </motion.div>
          </motion.div>


          <div className="marvel-container">
                {/*++ FRAMER MOTION ++*/}
                {isDesktop ? <motion.div className="motionImg"
          
                >

                  {/*Make the intro image available onluy in desktop version */}
               
                <motion.img  
                
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -45, height:0}}
                
                transition={{duration:3}}
                
                src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
                />

                </motion.div> : <></>}
                

                {/* Comic Panel*/}
                <motion.section  className="motionPanel marvelMotion"
                variants={variants}
                initial={variants.initial} 
                whileInView={variants.whileInView} 
                transition={{duration:2}} 
                
                >

            <div className={isDesktop ? 'infoDetailsContainer' : 'infoDetailsContainer infoDetailsContainerMobile'}>
            <h2>READING LIST | MARVEL</h2>

             <ul>
              {comix && marvelComix.map((comic)=>(
                <li key={comic.id}>
                  <Link to={`/comix/${comic.title}`}>
                    {comic.title}
                  </Link>
                </li>
              ))}
             </ul>

            </div>
          <div className=
          {isDesktop ? 'imgContainer' : "imgContainerMobile"}
          >
            {isDesktop ?
            <img src="https://i.pinimg.com/originals/c1/6c/50/c16c500c9d0a78d7ed37ee6fe291be42.gif"/>
            
           :
           <></>}

            <Link to={`/marvel`}>
            <button  className="marvel-button home-button ">
              SEE MORE <b>MARVEL</b>
            </button>
            </Link>
            
            </div>
              </motion.section>
          </div>
          {/* --END OF MARVEL CONTAINER---*/}
          {/* ++++STARTD OF DC CONTAINER++++*/}
          <div className="dc-container">
          {isDesktop? <motion.div className="motionImg"
          
          >
          <motion.img  
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -45 }}
                transition={{duration:3}}

                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/DC_Comics_logo.png/768px-DC_Comics_logo.png"
                />
                </motion.div>
                : <></> }

                <motion.section  className="motionPanel dcMotion"
                variants={variants}
                initial={variants.initial} 
                whileInView={variants.whileInView} 
                transition={{duration:2}} 
               
                
                >

            <div className={isDesktop ? "dcInfoDetails infoDetailsContainer" :" infoDetailsContainer infoDetailsContainerMobile"}>
             <h2>READING LIST | DC</h2>
             <ul>
             
              {comix && dcComix.map((comic)=>(
                <li key={comic.id}>
                  <Link to={`/comix/${comic.title}`}>
                    {comic.title}
                  </Link>
                </li>
              ))}
             
             </ul>
            </div>
             <div className={isDesktop? "DCimgContainer imgContainer" : "imgContainerMobile"}>
             {isDesktop ?
            <img src="https://i.gifer.com/VR5y.gif"/>
          : <></>}
            
            <Link to={`/dc`}>

            <button className="dc-button home-button ">
              See more DC
            </button>
            </Link>
             </div>
            </motion.section>
          </div>
          {/* ------END OF DC---- CONTAINER*/}
          {/* +++ START OF OTHER PUBLISHER CONTAIENR*/}
          <div className="otherp-container">
            {isDesktop ? 
          <motion.div className="motionImg"
          
          >
          <motion.img  
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -45 }}
                transition={{duration:3}}

                src="https://clarifyconsultants.com/media/k2/items/cache/b8cc41f2c23fcd5970f74c3c49efafec_XL.jpg?t=20200904_203428"
                />
              </motion.div>
            
            
            :<></>  
        }
                <motion.section  className="motionPanel  otherPMotion"
                variants={variants}
                initial={variants.initial} 
                whileInView={variants.whileInView} 
                transition={{duration:2}} 
                >

            
             <div className={isDesktop ?"otherInfoDetails infoDetailsContainer" :"infoDetailsContainer infoDetailsContainerMobile"}>
             <h2>READING LIST | OTHER</h2>
             <ul>
             
              {comix && otherPublisher.map((comic)=>(
                <li key={comic.id}>
                  <Link to={`/comix/${comic.title}`}>
                    {comic.title}
                  </Link>
                </li>
              ))}
             
             </ul>
            </div>
             <div className={isDesktop ? "otherimgContainer imgContainer" : "imgContainerMobile"}>
            {isDesktop ?
            <img src="https://cdnb.artstation.com/p/assets/images/images/006/356/351/original/nara-ken-hellboy-20170620-3.gif?1497975721"/>
          : <></>}
            
            <Link to={`/otherPublisher`}>

            <button className="otherp-button home-button ">
              SEE OTHER PUBLISHERS
            </button>
            </Link>
             </div>
           </motion.section>

          </div>
          {/* -------END OF OTHER CONTAINER*/}
          {/* ++++++ START OF CHAT CONTAINER*/}
          <div className="chaterino-container">
            {isDesktop ?
            
          <motion.div className="motionImg">
          <motion.img  
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -45 }}
                transition={{duration:3}}
                
                src="https://static.vecteezy.com/system/resources/previews/010/765/539/non_2x/sticker-of-a-cartoon-chat-symbol-vector.jpg"
                />
                </motion.div>
                :<></>}
        
                <motion.section  className="motionPanel chaterinoMotion"
                variants={variants}
                initial={variants.initial} 
                whileInView={variants.whileInView} 
                transition={{duration:2}}>
            
              <Link to={`chat`}>
            <button className=" chaterino-button">
              ENTER IN THE CHAT ROOM
            </button>
              </Link>

           </motion.section>
          </div>
          
          {/* ------- END OFCHAT container */}
        </motion.div>
              </div>
    )
}

export default Home;