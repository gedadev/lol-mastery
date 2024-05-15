import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function ChampImage({ name }) {
  const [imgUrl, setImgUrl] = useState(false);

  const trimName = (str) => {
    const extensionIndex = str.lastIndexOf(".");
    if (extensionIndex !== -1) {
      return str.substring(0, extensionIndex);
    }
    return str;
  };

  useEffect(() => {
    const getImg = async () => {
      try {
        const img = await import(
          `../../assets/img/champion/card/${trimName(name)}_0.jpg`
        );
        const url = await img.default;
        setImgUrl(url);
      } catch (error) {
        console.error(error);
      }
    };

    getImg();
  }, [name]);

  return <>{imgUrl ? <img src={imgUrl} alt="" /> : <p>error</p>}</>;
}

ChampImage.propTypes = {
  name: PropTypes.string.isRequired,
};
