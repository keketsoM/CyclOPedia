import logo from "./images/logo.png";
function Header() {
  return (
    <div className="pt-3" style={{ borderBottom: "1px solid black" }}>
      <img
        src={logo}
        style={{ height: "35px", verticalAlign: "top" }}
        alt="React Logo"
      />
      <span className="h2 pt-4 text-white-50">CyclOPedia</span>
    </div>
  );
}
export default Header;
