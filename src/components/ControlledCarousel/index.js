import React from 'react'
import Slider from 'react-slick'
import Popup from 'reactjs-popup'
import ReactPlayer from 'react-player'
import { IoMdClose } from 'react-icons/io'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const moviesList = [
  {
    id: '61227099e13958e58d31e74c',
    thumbnailUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAWSsy3EbJdd4KP_TiHveSy7xBI4zPDtCa6g&s',
      videoUrl:"https://www.youtube.com/embed/2LfmSIj3WsQ?si=5nlzioBQVjvHOOht",
    categoryId: 'CART',
  },
  {
    id: '612271842cad3c2dfcb82481',
    thumbnailUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpmhjyAJyCW__E_9_DFc_gAzLsDdXBO3YYHQ&s',
    videoUrl:"https://youtube.com/embed/vKOcI0W2J1k?si=emqLXbufCyYCJ2tB",
    categoryId: 'CART',
  },
  {
    id: '6122709941329807a4e17b39',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcSHcDeods5fJyvrfttaL1zUkhn7MRTb5jhA&s',
    videoUrl:"https://www.youtube.com/embed/S0RqHzm1r5E?si=-8KKT5sUm-sE62om",
    categoryId: 'CART',
  },
  {
    id: '61227184c889cff17f05900b',
    thumbnailUrl: 'https://images-platform.99static.com//kgcsnNyIeQR3MkoUN84a_4VaUiA=/126x183:1892x1949/fit-in/500x500/99designs-contests-attachments/130/130864/attachment_130864134',
    videoUrl:"https://youtube.com/embed/_K9ljt030Es?si=iK93JrFqccRv2nP_",
    categoryId: 'CART',
  },
  {
    id: '612271846f711783024f2bfa',
    thumbnailUrl: 'https://images-platform.99static.com//SUrUvg7BGVshu48ZmidkKKZZk2U=/0x0:2040x2040/fit-in/500x500/99designs-contests-attachments/153/153470/attachment_153470545',
    videoUrl:"https://www.youtube.com/embed/eA0AtIKHBAA?si=JNLdbiK6gI9SQQPT",
    categoryId: 'CART',
  },
  {
    id: '612271141bf93653809cdccb',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRINfbXnaOlyecuZ-LynqRZsc-8jmlM8qLibw&s',
    videoUrl:"https://www.youtube.com/embed/dIrrROL2pRE?si=Ot0DehBSPG_aqmKp",
    categoryId: 'CART',
  },
  
]

const ControlledCarousel = () => {
  const actionMovies = moviesList.filter(movie => movie.categoryId === 'CART')

  const settings = {
    dots: false,
    infinite: true, 
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 1000,
  }

  const MovieItem = ({ movieDetails }) => {
    const { thumbnailUrl, videoUrl } = movieDetails
    return (
      <div className="movie-item">
        <Popup
          modal
          trigger={<img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />}
          className="popup-content"
        >
          {close => (
            <div className="video-container">
              <button type="button" className="close-button" onClick={() => close()} data-testid="closeButton">
                <IoMdClose size={20} color="#231f20" />
              </button>
              <ReactPlayer url={videoUrl} controls />
            </div>
          )}
        </Popup>
      </div>
    )
  }

  const MoviesSlider = ({ moviesList }) => {
    return (
      <Slider {...settings}>
        {moviesList.map(movie => (
          <MovieItem key={movie.id} movieDetails={movie} />
        ))}
      </Slider>
    )
  }

  return (
    <div className="carousel-container">
      <div className="items-section">
        <MoviesSlider moviesList={actionMovies} />
      </div>
    </div>
  )
}



export default ControlledCarousel
