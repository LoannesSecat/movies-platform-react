import Parameters from "../../services/Parameters";
import Soliciter from "../../services/Soliciter";
import db from "../../services/Mocks";
import ACTIONS from "../ActionsCreators/FilmTypes";
import useDispatch from "../../utils/useDispatch";
import useStore from "../../utils/useStore";
import { NewPage, TotalPages } from "./ToolActions";

const TMDb = Parameters.TMDb;
let req = "";

export const ReadFilms = () => {
  const { FilmsMock } = db();
  const search_text = useStore({ reducer: "tool", value: "search_text" });
  const page = useStore({ reducer: "tool", value: "page" });
  const total_pages = useStore({ reducer: "tool", value: "total_pages" });
  const query = search_text === "" || search_text === " " ? "a" : search_text;
  req = `${TMDb.url_v3}${TMDb.multi_search}?${TMDb.api_key}&${TMDb.query}${query}&${TMDb.page}${page}&${TMDb.language}&${TMDb.include_adult}`;

  Soliciter({
    request: req,
    mock: FilmsMock,
    action: ACTIONS.READ_FILMS,
  }).then((e) => {
    if (total_pages !== e.data.total_pages) {
      TotalPages(e.data?.total_pages);
      NewPage();
    }

    useDispatch({
      type: e.type,
      payload: e.data?.results,
    });
  });
};

export const FilmDetails = (extra_data) => {
  const { id } = extra_data;
  const { FilmDetailsMock } = db();
  req = `${TMDb.url_v3}${TMDb.movie}${id}?${TMDb.api_key}&${TMDb.language}`;

  Soliciter({
    request: req,
    mock: { ...FilmDetailsMock, ...extra_data },
    action: ACTIONS.FILM_DETAILS,
  }).then((e) => {
    useDispatch({
      type: e.type,
      payload: { ...extra_data, ...e.data },
    });

    localStorage.setItem(e.type, JSON.stringify({ ...extra_data, ...e.data }));
  });
};

export const PersonDetails = (extra_data) => {
  const { id } = extra_data;
  req = `${TMDb.url_v3}${TMDb.person}${id}?${TMDb.api_key}&${TMDb.language}`;

  Soliciter({ request: req, mock: {}, action: ACTIONS.PERSON_DETAILS }).then(
    (e) => {
      useDispatch({ type: e.type, payload: { ...extra_data, ...e.data } });

      localStorage.setItem(
        e.type,
        JSON.stringify({ ...extra_data, ...e.data })
      );
    }
  );
};

export const SerieDetails = (extra_data) => {
  const { id } = extra_data;
  const { SerieDetailsMock } = db();
  req = `${TMDb.url_v3}${TMDb.tv}${id}?${TMDb.api_key}&${TMDb.language}`;

  Soliciter({
    request: req,
    mock: { ...SerieDetailsMock, ...extra_data },
    action: ACTIONS.SERIE_DETAILS,
  }).then((e) => {
    useDispatch({
      type: e.type,
      payload: { ...extra_data, ...e.data },
    });

    localStorage.setItem(e.type, JSON.stringify({ ...extra_data, ...e.data }));
  });
};

export const MediaType = (type_media) => {
  useDispatch({
    type: ACTIONS.MEDIA_TYPE,
    payload: type_media,
  });

  localStorage.setItem(ACTIONS.MEDIA_TYPE, type_media);
};
