import React, { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null); // Utilisez useRef pour garder une référence au timer.

  useEffect(() => {
    if (data && data.focus.length > 1) {
      const byDateDesc = [...data.focus].sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
      );

      // Nettoyez le timer précédent s'il existe.
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Définissez le nouveau timer.
      timerRef.current = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
      }, 5000);

      // Nettoyez le timer lors du démontage de l'effet.
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [data]);

  return (
    <div className="SlideCardList">
      {data?.focus.map((event, idx) => (
        event && (
          <div key={event.id} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        )
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {data?.focus.map((_, radioIdx) => (
            <input
              key={data.focus[radioIdx].id}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
