import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import LeafLogo from "../components/LeafLogo";
import { LayoutDashboard, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
  const navigate = useNavigate();
  const { me, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/auth");
  }

  return (
    <div className="dash">
      <aside className="sidebar">
        <div className="sideBrand">
          <div className="sideIcon">
            <LeafLogo size={34} strokeWidth={3} />
          </div>
          <div>
            <div className="sideTitle">Eco-Volunteer</div>
            <div className="sideSub">Match</div>
          </div>
        </div>

        <nav className="nav">
          <NavLink
            to="/app"
            end
            className={({ isActive }) => (isActive ? "navItem navActive" : "navItem")}
          >
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </NavLink>
        </nav>

        <div className="profileSection">
          <NavLink to="/app/profile" className="profileCard">
            <div className="avatar">🙂</div>
            <div className="profileText">
              <div className="profileName">{me?.name || "User"}</div>
              <div className="profilePoints">{me?.points ?? 0} points</div>
            </div>
            <div className="profileArrow">
              <ChevronRight size={18} />
            </div>
          </NavLink>
          <button type="button" className="logoutLink" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      {/* All /app pages render here */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
