import { useState, ChangeEvent } from "react";

import "react-icons/fa";

import axios from "../config/axios";

import ShortedLink from "../components/ShortedLink";
import Loading from "../components/Loading";
import {
  EMPTY_URL_FIELD,
  INVALID_URL_MISSNG_PARTS,
  INVALID_URL,
} from "../error/messages";

export default function Home() {
  const [original, setOriginal] = useState("");
  const [shorted, setShorted] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingLink, setLoadingLink] = useState(false);

  const handleUrlChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let text = evt.target.value.trim();

    setOriginal(text);
    setErrorMessage("");
    setShorted("");
  };

  const checkOriginalIsInvalid = () => {
    let reg = /^(http:\/\/www|https:\/\/www|www\.)\S*/gm;
    return reg.test(original) === false;
  };

  const handleShortUrlBtn = async () => {
    if (original.length === 0) {
      setErrorMessage(EMPTY_URL_FIELD);
      return;
    }

    if (checkOriginalIsInvalid()) {
      setErrorMessage(INVALID_URL_MISSNG_PARTS);
      return;
    }

    setLoadingLink(true);

    try {
      let { data } = await axios.post("/short-url", { original });
      setShorted(data.link.shorted);
      setErrorMessage("");
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log(err.response);
        setErrorMessage(INVALID_URL);
      }
    }

    setLoadingLink(false);
  };

  const inputCSSClass = () => {
    let css = "input is-large is-info";

    if (errorMessage && errorMessage.length > 0) {
      return css + " is-danger";
    }

    if (shorted && shorted.length > 0) {
      return css + " is-success";
    }

    return css;
  };

  const displayLink = () => {
    if (loadingLink) return <Loading />;

    if (!errorMessage && shorted) return <ShortedLink shorted={shorted} />;

    return "";
  };

  return (
    <div>
      <div className="field has-addons">
        <div className="control has-icons-left has-icons-right is-expanded">
          <input
            type="text"
            className={inputCSSClass()}
            placeholder="URL para encurtar"
            value={original}
            onChange={handleUrlChange}
            disabled={loadingLink}
          />
          <span className="icon is-medium is-left">
            <i className="fa fa-pencil"></i>
          </span>
          {errorMessage && errorMessage.length > 0 ? (
            <p className="help is-danger">{errorMessage}</p>
          ) : (
            ""
          )}
        </div>
        <p className="control">
          <button
            className="button is-info is-large"
            onClick={handleShortUrlBtn}
            disabled={loadingLink}
          >
            Encurtar
          </button>
        </p>
      </div>

      {displayLink()}
    </div>
  );
}
