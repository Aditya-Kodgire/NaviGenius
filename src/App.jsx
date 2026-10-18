import React, { useMemo, useState } from "react";

const transportData = [
  {
    id: "metro",
    icon: "🚇",
    name: "Metro",
    time: 35,
    price: 20,
    distance: "12.4 km",
    traffic: "Low",
    comfort: 78,
    description: "Fast and affordable public transport",
  },
  {
    id: "bus",
    icon: "🚌",
    name: "Bus",
    time: 52,
    price: 15,
    distance: "11.8 km",
    traffic: "Medium",
    comfort: 58,
    description: "Lowest-cost public transport option",
  },
  {
    id: "cab",
    icon: "🚕",
    name: "Cab",
    time: 28,
    price: 180,
    distance: "13.1 km",
    traffic: "High",
    comfort: 94,
    description: "Most comfortable direct journey",
  },
  {
    id: "bike",
    icon: "🏍️",
    name: "Bike",
    time: 31,
    price: 92,
    distance: "13.0 km",
    traffic: "Medium",
    comfort: 64,
    description: "Quick option for solo travel",
  },
  {
    id: "walking",
    icon: "🚶",
    name: "Walking",
    time: 148,
    price: 0,
    distance: "10.2 km",
    traffic: "None",
    comfort: 42,
    description: "Zero-cost and eco-friendly",
  },
  {
    id: "multimodal",
    icon: "🔄",
    name: "Walk → Metro → Walk",
    time: 38,
    price: 25,
    distance: "12.0 km",
    traffic: "Low",
    comfort: 82,
    description: "Balanced combination of walking and metro",
  },
];

const cabProviders = [
  {
    name: "Uber",
    price: 180,
    time: 28,
    rating: 4.7,
    icon: "🚘",
  },
  {
    name: "Ola",
    price: 165,
    time: 31,
    rating: 4.5,
    icon: "🚖",
  },
  {
    name: "Rapido",
    price: 195,
    time: 24,
    rating: 4.6,
    icon: "🏍️",
  },
];

function calculateScore(route, preferences) {
  const costScore = Math.max(0, 100 - route.price / 2);
  const timeScore = Math.max(0, 100 - route.time / 2);
  const comfortScore = route.comfort;

  const trafficScore =
    route.traffic === "Low"
      ? 100
      : route.traffic === "Medium"
      ? 65
      : route.traffic === "High"
      ? 35
      : 100;

  const totalWeight =
    preferences.cost + preferences.urgency + preferences.comfort;

  const score =
    (costScore * preferences.cost +
      timeScore * preferences.urgency +
      comfortScore * preferences.comfort +
      trafficScore * 20) /
    (totalWeight + 20);

  return Math.round(Math.min(100, Math.max(0, score)));
}

function DemoMap({
  source,
  destination,
  selectedRoute,
  showTraffic,
}) {
  return (
    <div className="map-container">
      <div className="map-grid">
        <div className="map-block block-1"></div>
        <div className="map-block block-2"></div>
        <div className="map-block block-3"></div>
        <div className="map-block block-4"></div>
        <div className="map-block block-5"></div>
        <div className="map-block block-6"></div>
        <div className="map-block block-7"></div>
        <div className="map-block block-8"></div>

        <div className="road road-1"></div>
        <div className="road road-2"></div>
        <div className="road road-3"></div>
        <div className="road road-4"></div>
        <div className="road road-5"></div>

        {showTraffic && (
          <>
            <div className="traffic-line traffic-1"></div>
            <div className="traffic-line traffic-2"></div>
            <div className="traffic-line traffic-3"></div>
          </>
        )}

        <div className={`route-line route-${selectedRoute}`}></div>

        <div className="map-pin source-pin">
          <span>A</span>
        </div>

        <div className="map-pin destination-pin">
          <span>B</span>
        </div>

        <div className="map-label source-label">
          <strong>Source</strong>
          <small>{source || "Your Location"}</small>
        </div>

        <div className="map-label destination-label">
          <strong>Destination</strong>
          <small>{destination || "Destination"}</small>
        </div>

        <div className="map-location-dot"></div>

        <div className="map-road-label road-label-1">
          University Road
        </div>

        <div className="map-road-label road-label-2">
          Main Street
        </div>

        <div className="map-road-label road-label-3">
          Station Road
        </div>
      </div>

      <div className="map-controls">
        <button>＋</button>
        <button>−</button>
      </div>

      <div className="map-status">
        <span className="status-dot"></span>
        Demo map • Live APIs not connected
      </div>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin();
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-logo">N</div>
          <span>NaviGenius</span>
        </div>

        <div className="login-content">
          <span className="eyebrow">SMART COMMUTING</span>

          <h1>
            Your journey.
            <br />
            <span>Smarter.</span>
          </h1>

          <p>
            Compare every way to travel, understand the cost and time,
            and let NaviGenius find the best route for you.
          </p>

          <div className="login-features">
            <div>
              <span>✓</span>
              Compare multiple transport modes
            </div>

            <div>
              <span>✓</span>
              AI-powered recommendations
            </div>

            <div>
              <span>✓</span>
              Real-time traffic insights
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome back</h2>
          <p className="login-subtitle">
            Sign in to plan your smarter commute.
          </p>

          <form onSubmit={handleSubmit}>
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button type="button" className="forgot">
                Forgot password?
              </button>
            </div>

            <button className="primary-button login-button">
              Sign in
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-button" onClick={onLogin}>
            <span className="google-icon">G</span>
            Continue with Google
          </button>

          <p className="signup-text">
            New to NaviGenius? <span>Create an account</span>
          </p>

          <div className="demo-note">
            <strong>Prototype Demo</strong>
            <br />
            Any email/password will work.
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [source, setSource] = useState("MIT-WPU, Pune");
  const [destination, setDestination] = useState(
    "Pune Railway Station"
  );
  const [travelTime, setTravelTime] = useState("09:30 AM");

  const [selectedRoute, setSelectedRoute] = useState("metro");
  const [showTraffic, setShowTraffic] = useState(true);
  const [searching, setSearching] = useState(false);

  const [connections, setConnections] = useState({
    uber: true,
    ola: true,
    rapido: false,
  });

  const [preferences, setPreferences] = useState({
    comfort: 40,
    urgency: 40,
    cost: 40,
  });

  const scoredRoutes = useMemo(() => {
    return transportData.map((route) => ({
      ...route,
      score: calculateScore(route, preferences),
    }));
  }, [preferences]);

  const recommendedRoute = useMemo(() => {
    return [...scoredRoutes].sort((a, b) => b.score - a.score)[0];
  }, [scoredRoutes]);

  const selected = scoredRoutes.find(
    (route) => route.id === selectedRoute
  );

  function searchRoutes() {
    setSearching(true);

    setTimeout(() => {
      setSearching(false);
    }, 1000);
  }

  function swapLocations() {
    const oldSource = source;
    setSource(destination);
    setDestination(oldSource);
  }

  function applyPreset(type) {
    if (type === "urgent") {
      setPreferences({
        comfort: 20,
        urgency: 80,
        cost: 20,
      });
    }

    if (type === "comfortable") {
      setPreferences({
        comfort: 80,
        urgency: 30,
        cost: 20,
      });
    }

    if (type === "budget") {
      setPreferences({
        comfort: 20,
        urgency: 20,
        cost: 80,
      });
    }
  }

  function toggleConnection(provider) {
    setConnections((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
  }

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-logo">N</div>

          <div>
            <div className="brand-name">NaviGenius</div>
            <div className="brand-tagline">
              Intelligent Mobility
            </div>
          </div>
        </div>

        <div className="topbar-right">
          <div className="demo-badge">
            <span></span>
            DEMO MODE
          </div>

          <div className="profile">
            <div className="avatar">A</div>
            <div>
              <strong>Traveler</strong>
              <small>Smart commuter</small>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard">
        <section className="hero">
          <div>
            <span className="eyebrow">AI TRAVEL ASSISTANT</span>
            <h1>Plan your perfect commute.</h1>
            <p>
              One search. Every travel option. One smart recommendation.
            </p>
          </div>

          <div className="hero-score">
            <span>Your commute score</span>
            <strong>{recommendedRoute.score}/100</strong>
          </div>
        </section>

        <section className="search-card">
          <div className="search-header">
            <div>
              <h2>Where are you going?</h2>
              <p>Enter your journey details to compare routes.</p>
            </div>

            <button
              className="swap-button"
              onClick={swapLocations}
              title="Swap locations"
            >
              ⇅
            </button>
          </div>

          <div className="search-grid">
            <div className="input-group">
              <label>
                <span className="input-dot source-dot"></span>
                From
              </label>

              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Enter source"
              />
            </div>

            <div className="input-group">
              <label>
                <span className="input-dot destination-dot"></span>
                To
              </label>

              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination"
              />
            </div>

            <div className="input-group time-input">
              <label>Travel time</label>

              <input
                type="time"
                value={travelTime}
                onChange={(e) => setTravelTime(e.target.value)}
              />
            </div>

            <button
              className="primary-button search-button"
              onClick={searchRoutes}
              disabled={searching}
            >
              {searching ? "Finding routes..." : "Find routes →"}
            </button>
          </div>
        </section>

        <div className="content-grid">
          <div className="main-column">
            <section className="section-heading">
              <div>
                <h2>Travel options</h2>
                <p>
                  Compare time, price, comfort and traffic across
                  transport modes.
                </p>
              </div>

              <button
                className={`traffic-button ${
                  showTraffic ? "active" : ""
                }`}
                onClick={() => setShowTraffic(!showTraffic)}
              >
                <span>●</span>
                {showTraffic ? "Traffic on" : "Traffic off"}
              </button>
            </section>

            <div className="route-layout">
              <div className="map-section">
                <DemoMap
                  source={source}
                  destination={destination}
                  selectedRoute={selectedRoute}
                  showTraffic={showTraffic}
                />
              </div>

              <div className="route-list">
                {scoredRoutes.map((route) => (
                  <button
                    key={route.id}
                    className={`route-card ${
                      selectedRoute === route.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <div className="route-icon">{route.icon}</div>

                    <div className="route-info">
                      <div className="route-title-row">
                        <strong>{route.name}</strong>

                        {route.id === recommendedRoute.id && (
                          <span className="best-badge">
                            BEST FOR YOU
                          </span>
                        )}
                      </div>

                      <span className="route-description">
                        {route.description}
                      </span>

                      <div className="route-meta">
                        <span>⏱ {route.time} min</span>
                        <span>₹{route.price}</span>
                        <span>{route.distance}</span>
                      </div>
                    </div>

                    <div className="route-score">
                      <strong>{route.score}</strong>
                      <span>/100</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="side-column">
            <section className="preference-card">
              <div className="card-heading">
                <div>
                  <h3>Your preferences</h3>
                  <p>Help AI personalize your route.</p>
                </div>

                <span className="ai-icon">✦</span>
              </div>

              <div className="preference-row">
                <div className="preference-label">
                  <span>💺</span>
                  <strong>Comfort</strong>
                  <span>{preferences.comfort}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={preferences.comfort}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      comfort: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="preference-row">
                <div className="preference-label">
                  <span>⚡</span>
                  <strong>Urgency</strong>
                  <span>{preferences.urgency}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={preferences.urgency}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      urgency: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="preference-row">
                <div className="preference-label">
                  <span>💰</span>
                  <strong>Low cost</strong>
                  <span>{preferences.cost}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={preferences.cost}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      cost: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="preset-title">Quick presets</div>

              <div className="preset-buttons">
                <button onClick={() => applyPreset("urgent")}>
                  ⚡ Urgent
                </button>

                <button
                  onClick={() => applyPreset("comfortable")}
                >
                  💺 Comfortable
                </button>

                <button onClick={() => applyPreset("budget")}>
                  💰 Budget
                </button>
              </div>
            </section>

            <section className="recommendation-card">
              <div className="recommendation-top">
                <span className="recommendation-icon">✦</span>

                <div>
                  <span>AI RECOMMENDATION</span>
                  <h3>{recommendedRoute.name}</h3>
                </div>
              </div>

              <p>
                Based on your preferences, <strong>{recommendedRoute.name}</strong>{" "}
                gives you the best balance of time, cost, comfort and
                traffic.
              </p>

              <div className="recommendation-stats">
                <div>
                  <strong>{recommendedRoute.time}</strong>
                  <span>minutes</span>
                </div>

                <div>
                  <strong>₹{recommendedRoute.price}</strong>
                  <span>estimated fare</span>
                </div>

                <div>
                  <strong>{recommendedRoute.score}</strong>
                  <span>match score</span>
                </div>
              </div>

              <button
                className="secondary-button"
                onClick={() =>
                  setSelectedRoute(recommendedRoute.id)
                }
              >
                Use this route
              </button>
            </section>

            <section className="cab-card">
              <div className="card-heading">
                <div>
                  <h3>Compare cab fares</h3>
                  <p>Demo provider comparison</p>
                </div>

                <span>🚕</span>
              </div>

              <div className="provider-list">
                {cabProviders.map((provider) => {
                  const providerKey =
                    provider.name.toLowerCase();

                  return (
                    <div
                      className={`provider-row ${
                        connections[providerKey]
                          ? ""
                          : "disabled"
                      }`}
                      key={provider.name}
                    >
                      <div className="provider-info">
                        <span className="provider-icon">
                          {provider.icon}
                        </span>

                        <div>
                          <strong>{provider.name}</strong>
                          <small>
                            ★ {provider.rating} • {provider.time} min
                          </small>
                        </div>
                      </div>

                      <div className="provider-price">
                        <strong>₹{provider.price}</strong>

                        <button
                          onClick={() =>
                            toggleConnection(providerKey)
                          }
                        >
                          {connections[providerKey]
                            ? "Connected"
                            : "Connect"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="api-note">
                Provider prices shown are simulated for the prototype.
              </div>
            </section>
          </aside>
        </div>

        <section className="journey-summary">
          <div>
            <span className="summary-icon">📍</span>

            <div>
              <span className="summary-label">
                YOUR SELECTED JOURNEY
              </span>

              <strong>
                {source} → {destination}
              </strong>
            </div>
          </div>

          <div className="summary-details">
            <div>
              <span>Mode</span>
              <strong>
                {selected?.icon} {selected?.name}
              </strong>
            </div>

            <div>
              <span>ETA</span>
              <strong>{selected?.time} min</strong>
            </div>

            <div>
              <span>Fare</span>
              <strong>₹{selected?.price}</strong>
            </div>

            <div>
              <span>Traffic</span>
              <strong>{selected?.traffic}</strong>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 NaviGenius</span>
        <span>Smart mobility prototype • SIH 2026</span>
      </footer>
    </div>
  );
}

export default App;