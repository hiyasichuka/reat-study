import React, { useState, useEffect } from "react";
import axios from "../axios";
import { requests } from "../request";
import "./Banner.scss";

type moiveProps = {
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
};

export const Banner = () => {
  const [movie, setMovie] = useState<moiveProps>({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.feachNetflixOriginals);
      //apiからランダムで値を取得
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="Banner-contents">
        <h1 className="Banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="Banner-buttons">
          <button className="Banner-button">Play</button>
          <button className="Banner-button">My List</button>
        </div>

        <h1 className="Banner-description">{movie?.overview} </h1>
      </div>

      <div className="Banner-fadeBottom" />
    </header>
  );
};
