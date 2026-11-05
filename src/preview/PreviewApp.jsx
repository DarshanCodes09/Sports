import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const sports = [
  {
    id: "cricket",
    name: "Cricket",
    icon: "🏏",
    description:
      "Explore competitions, teams, countries, players, profiles and career statistics.",
    routes: [
      { label: "Competitions", path: "/leagues" },
      { label: "Countries", path: "/countries" },
      { label: "Players", path: "/players" },
    ],
  },
  {
    id: "football",
    name: "Football",
    icon: "⚽",
    description:
      "Test football countries, teams, leagues, players, profiles and standings.",
    routes: [
      { label: "Countries", path: "/football/countries" },
      { label: "Teams", path: "/football/teams/england" },
      { label: "Leagues", path: "/football/leagues" },
      { label: "Players", path: "/football/players" },
      { label: "Standings", path: "/football/standings" },
    ],
  },
  {
    id: "basketball",
    name: "Basketball",
    icon: "🏀",
    description:
      "Open basketball countries, teams, leagues, standings and player experiences.",
    routes: [
      { label: "Countries", path: "/basketball/countries" },
      { label: "Teams", path: "/basketball/teams/usa" },
      { label: "Leagues", path: "/basketball/leagues" },
      { label: "Standings", path: "/basketball/standings/12" },
      { label: "Players", path: "/basketball/players" },
    ],
  },
  {
    id: "volleyball",
    name: "Volleyball",
    icon: "🏐",
    description:
      "Test volleyball countries, teams, leagues, standings and game history.",
    routes: [
      { label: "Countries", path: "/volleyball/countries" },
      { label: "Teams", path: "/volleyball/teams/1" },
      { label: "Leagues", path: "/volleyball/leagues" },
      { label: "Standings", path: "/volleyball/standings/1" },
      { label: "Games", path: "/volleyball/games" },
    ],
  },
];

const defaultRoute = (sport) => sport.routes[0].path;

function readHash() {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const sportId = hash.get("sport");
  const sport = sports.find((item) => item.id === sportId);
  return sport ? { sportId, path: hash.get("path") || defaultRoute(sport) } : null;
}

function updateHash(sportId, path, replace = false) {
  const nextHash = `sport=${encodeURIComponent(sportId)}&path=${encodeURIComponent(path)}`;
  const method = replace ? "replaceState" : "pushState";
  window.history[method]({}, "", `${window.location.pathname}#${nextHash}`);
}

function PreviewApp() {
  const [selection, setSelection] = useState(readHash);
  const [frameLoading, setFrameLoading] = useState(false);
  const frameRef = useRef(null);

  const selectedSport = useMemo(
    () => sports.find((sport) => sport.id === selection?.sportId) || null,
    [selection],
  );

  const openSport = useCallback((sport, path = defaultRoute(sport)) => {
    updateHash(sport.id, path);
    setSelection({ sportId: sport.id, path });
    setFrameLoading(true);
  }, []);

  const returnToDashboard = useCallback(() => {
    window.history.pushState({}, "", window.location.pathname);
    setSelection(null);
  }, []);

  const navigateInFrame = useCallback((path) => {
    if (!selectedSport) return;
    updateHash(selectedSport.id, path);
    setSelection({ sportId: selectedSport.id, path });
    setFrameLoading(true);
  }, [selectedSport]);

  useEffect(() => {
    const handlePopState = () => setSelection(readHash());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!selection || !frameRef.current) return;
    setFrameLoading(true);
  }, [selection]);

  if (!selectedSport) {
    return (
      <main className="preview-shell">
        <header className="preview-header preview-container">
          <div className="preview-brand">
            <span className="preview-brand-mark">S</span>
            <span>STRIVORA</span>
          </div>
          <span className="preview-badge">PREVIEW MODE</span>
        </header>

        <section className="preview-hero preview-container">
          <p className="preview-eyebrow">Sports platform testing ground</p>
          <h1>Explore the complete STRIVORA experience.</h1>
          <p>
            Open any supported sport below to test the real website, routes,
            API-backed pages and detail navigation in an isolated preview.
          </p>
        </section>

        <section className="sport-grid preview-container" aria-label="Sports">
          {sports.map((sport) => (
            <article className={`sport-card sport-card-${sport.id}`} key={sport.id}>
              <div className="sport-card-top">
                <span className="sport-icon" aria-hidden="true">
                  {sport.icon}
                </span>
                <span className="sport-status">LIVE PREVIEW</span>
              </div>
              <h2>{sport.name}</h2>
              <p>{sport.description}</p>
              <ul>
                {sport.routes.map((route) => (
                  <li key={route.path}>{route.label}</li>
                ))}
              </ul>
              <button type="button" onClick={() => openSport(sport)}>
                Open {sport.name} preview <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </section>

        <footer className="preview-footer preview-container">
          <span>Real routes · Real services · Isolated preview</span>
          <span>Run the backend to load API data.</span>
        </footer>
      </main>
    );
  }

  return (
    <main className="preview-workspace">
      <header className="workspace-header">
        <button className="workspace-brand" type="button" onClick={returnToDashboard}>
          <span className="preview-brand-mark">S</span>
          <span>STRIVORA</span>
        </button>
        <div className="workspace-title">
          <span className="preview-badge">PREVIEW MODE</span>
          <strong>{selectedSport.name}</strong>
        </div>
        <button className="dashboard-button" type="button" onClick={returnToDashboard}>
          All sports
        </button>
      </header>

      <nav className="workspace-toolbar" aria-label={`${selectedSport.name} preview routes`}>
        <button
          type="button"
          className="toolbar-control"
          onClick={() => frameRef.current?.contentWindow?.history.back()}
          aria-label="Go back in preview"
        >
          ←
        </button>
        <button
          type="button"
          className="toolbar-control"
          onClick={() => frameRef.current?.contentWindow?.history.forward()}
          aria-label="Go forward in preview"
        >
          →
        </button>
        <button
          type="button"
          className="toolbar-control"
          onClick={() => frameRef.current?.contentWindow?.location.reload()}
          aria-label="Reload preview"
        >
          ↻
        </button>
        <div className="route-list">
          {selectedSport.routes.map((route) => (
            <button
              type="button"
              className={selection.path === route.path ? "route-button active" : "route-button"}
              key={route.path}
              onClick={() => navigateInFrame(route.path)}
            >
              {route.label}
            </button>
          ))}
        </div>
      </nav>

      <section className="frame-wrap" aria-label={`${selectedSport.name} website preview`}>
        {frameLoading && <div className="frame-loading">Loading STRIVORA…</div>}
        <iframe
          ref={frameRef}
          title={`${selectedSport.name} STRIVORA preview`}
          src={selection.path}
          onLoad={() => setFrameLoading(false)}
        />
      </section>
    </main>
  );
}

export default PreviewApp;
