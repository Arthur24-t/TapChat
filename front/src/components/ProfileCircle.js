import "../css/ProfileCircle.css";

const togglePopupOptions = () => {
  document.getElementById("PopupOptions")?.classList.remove("invisible");
};

function ProfileCircle() {
  var name = localStorage.getItem("name");
  return (
    <div className="ProfileCircle" onClick={togglePopupOptions}>
      <h1 className="initiale">{name[0].toUpperCase()}</h1>
    </div>
  );
}

export default ProfileCircle;
