import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

export default function SimpleSlider({ children }) {
  const PrevArrow = (props) => <ArrowBackIosIcon {...props} />;
  const NextArrow = (props) => <ArrowForwardIosIcon {...props} />;
  const settings = {
    infinite: true,
    speed: 500,
    prevArrow: <ArrowBackIosIcon color="primary" fontSize="small" />,
    nextArrow: <ArrowForwardIosIcon color="primary" fontSize="small" />,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Slider {...settings}>{children}</Slider>
    </>
  );
}
