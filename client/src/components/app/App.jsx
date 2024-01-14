import "./App.scss";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const App = (props) => {
  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="app__nav">
        <div className="app__nav__history">
          <div className="app__nav__history-icon">
            <IoChevronBackOutline onClick={() => navigate(-1)} />
          </div>
          <div className="app__nav__history-icon">
            <IoChevronForwardOutline onClick={() => navigate(1)} />
          </div>
        </div>
        <div className="app__nav__profile">
          <img
            crossOrigin="anonymous"
            src={data.img}
            alt=""
            className="app__nav__profile--img"
          />
        </div>
      </div>
      {/*<Home />*/}
      {/*<Artist />*/}
      {props.children}
    </div>
  );
};

export default App;
