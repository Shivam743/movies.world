import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";
const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [Creadits, setCreadits] = useState();
  const items = Creadits?.map((c) => (
    <div className="carousalItem">
      <img
        src={
          c.profile_path
            ? `https://image.tmdb.org/t/p/w300${c.profile_path}`
            : "https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg"
        }
        alt={c?.name}
        onDragStart={handleDragStart}
        className="Creadits_img"
      />
      <b className="Creadits_name">{c?.name}</b>
    </div>
  ));
  const responsive = {
    0: { items: 3 },
    512: { items: 5 },
    1024: { items: 7 },
  };

  useEffect(() => {
    const fetchImage = async () => {
        try {
            
            const { data } = await axios.get(
              `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=c75430675bfaac5554a02c34599115cc&language=en-US`
            );
            setCreadits(data.cast);
        } catch (error) {
            console.log("error found",error)
        }
    };
    fetchImage();
  }, [id,media_type]);

  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      infinite
      disableDotsControls
      disableButtonsControls
      mouseTracking
      items={items}
    />
  );
};

export default Carousel;
