
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Inversion du chevron pour changer l'ordre d'apparition des slides
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    // Rajout de -1 à la taille du tableau byDateDesc
    // ajout d'une vérification byDateDesc && avant de tenter d'accéder à la propriété 'length', 
    // ce qui évitera l'erreur si byDateDesc est undefined
    setTimeout(() => setIndex((prevIndex) => 
      (byDateDesc && prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0)), 5000);
  };

  useEffect(() => {
    nextCard();
    // Ajout de [index, byDateDesc] comme dépendances pour éviter des erreurs dans les règles ESLint
  }, [index, byDateDesc]);  
  
  return (
    <div className="SlideCardList">
    {byDateDesc?.map((event, idx) => (
      <div key={event.title} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
        <img src={event.cover} alt="forum" />
        <div className="SlideCard__descriptionContainer">
          <div className="SlideCard__description">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <div>{getMonth(new Date(event.date))}</div>
          </div>
        </div>
      </div>
    ))}
    <div className="SlideCard__paginationContainer">
      <div className="SlideCard__pagination">

        {/* ajout de byDateDesc?.map : vérifie si data et data.focus sont définis avant de tenter d'accéder à byDateDesc et de le mapper. */}
        {byDateDesc?.map((value, radioIdx) => (
          <input
            key={`radio-${value.id || radioIdx}`}  // Utilise l'index si value.id est undefined
            type="radio"
            name="radio-button"
            checked={index === radioIdx}
            readOnly
          />
        ))}
      </div>
    </div>
  </div>
  );
};

export default Slider;

