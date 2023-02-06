import logoImg from "../img/LogoChat.png";
import "../css/Logo.css";

function Logo() {
  return (
    <div>
      <img className="Logo" src={logoImg} alt="logo" />
    </div>
  );
}

export default Logo;
