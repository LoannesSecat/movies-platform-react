import Film from "../components/Film";
import Header from "../components/Header";
import "../utils/styles/Films.scss";
import Empty from "../components/Empty";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { ReadFilms } from "../redux/actions/FilmActions";
import { useEffect } from "react";
import FilmsPagination from "../components/FilmsPagination";
import { SearchText } from "../redux/actions/ToolActions";

export default function Home() {
  const dataFilms = useSelector((e) => e.film.films);
  const text = useSelector((e) => e.tool.searchText);

  useEffect(() => ReadFilms(), [text]);

  const CompFilms = () => {
    if (dataFilms === "loading") return <Loading />;

    if (dataFilms?.length) {
      return (
        <>
          <div className="Films">
            {dataFilms?.map((e, i) => (
              <Film data={e} key={i} />
            ))}
          </div>

          <FilmsPagination />
        </>
      );
    }

    return <Empty />;
  };

  const HandleSearch = (value) => {
    if (value[value.length - 1] === " " && value[value.length - 2] === " ") {
      SearchText(value.slice(0, -1));
    } else {
      SearchText(value);
    }
  };

  return (
    <>
      <Header>
        <div>Inicio</div>
        <input
          type="text"
          onChange={(e) => HandleSearch(e.target.value)}
          value={text}
          placeholder="Ej: Los guardianes de la galaxia"
        />
      </Header>

      <CompFilms />
    </>
  );
}