import { useState, useEffect } from 'react'
import './App.css'

// Hub definitions
const HUBS = {
  DOWNTOWN: { name: 'Downtown', color: '#667eea', emoji: '🏙️' },
  NORTH_YORK: { name: 'North York', color: '#f093fb', emoji: '🌆' },
  ETOBICOKE: { name: 'Etobicoke', color: '#4facfe', emoji: '🌊' },
  INDEPENDENT: { name: 'Independent', color: '#43e97b', emoji: '✨' }
};

// Must-see "Hot Now" events
const HOT_EVENTS = [
  "100% [City]",
  "Tower of Babel",
  "People's Dancefloor",
  "we see you",
  "The Eye of Wisdom",
  "Undersight",
  "The Bentway - A Lake Story"
];

// Categorize event by location
const getHub = (lat, lng) => {
  // North York (north of Eglinton)
  if (lat > 43.70) return HUBS.NORTH_YORK;
  // Etobicoke (west of Humber)
  if (lng < -79.50) return HUBS.ETOBICOKE;
  // Downtown core
  if (lat > 43.63 && lat < 43.70 && lng > -79.42 && lng < -79.36) return HUBS.DOWNTOWN;
  // Independent
  return HUBS.INDEPENDENT;
};

// All 91 Nuit Blanche events
const events = [
  {name: "Theatre Passe Muraille - Nuit Blanche Rest Stop", artist: "Various", lat: 43.6534, lng: -79.4011, description: "A rest stop for contemplation and stillness"},
  {name: "What Brings You In - The Violins", artist: "Leslie Ting Productions", lat: 43.6528, lng: -79.3991, description: "Musical performance exploring community connection"},
  {name: "It's Ok*, In Transit", artist: "Winta Hagos, Said Yassin", lat: 43.6525, lng: -79.3985, description: "Community arts celebrating resilience"},
  {name: "the sound of lions in Chinatown (west gate)", artist: "Annie Wong, Hannia Cheng", lat: 43.6531, lng: -79.3978, description: "Preserving Chinatown's cultural heritage"},
  {name: "Letters to Your Ex", artist: "WhyWithCai", lat: 43.6540, lng: -79.3965, description: "Interactive installation about relationships"},
  {name: "MOVES", artist: "Tara Rose Morris", lat: 43.6520, lng: -79.3952, description: "Dance and movement piece"},
  {name: "The Poetry Dispensary", artist: "Marc Nair", lat: 43.6515, lng: -79.3945, description: "Get a custom poem on demand"},
  {name: "Tower of Babel", artist: "Shellie Zhang", lat: 43.6508, lng: -79.3938, description: "Multilingual karaoke video installation"},
  {name: "Pontianak.exe", artist: "Caroline McKenzie", lat: 43.6502, lng: -79.3932, description: "Digital horror folklore exploration"},
  {name: "401 Richmond - Built For Art", artist: "Various Artists", lat: 43.6485, lng: -79.3918, description: "Multi-floor artist studios open"},
  {name: "the sound of lions in Chinatown (east gate)", artist: "Annie Wong, Hannia Cheng", lat: 43.6535, lng: -79.3960, description: "Chinatown cultural preservation project"},
  {name: "Museum of Toronto - The 52: Stories of Women Who Transformed Toronto", artist: "Museum of Toronto, elonstudio", lat: 43.6498, lng: -79.3928, description: "Celebrating influential Toronto women"},
  {name: "Wildseed Centre for Art & Activism - The Meeting Point", artist: "Racquel Rowe, Ehiko Odeh, Ayat Salih", lat: 43.6475, lng: -79.3912, description: "Gathering space for community connection"},
  {name: "People's Dancefloor", artist: "Various Artists", lat: 43.6512, lng: -79.3935, description: "12-hour retro video dance party"},
  {name: "Dead Ringer", artist: "Dave Dyment", lat: 43.6505, lng: -79.3925, description: "Sound and bell installation"},
  {name: "The City", artist: "Jason van Horne", lat: 43.6495, lng: -79.3915, description: "Urban exploration through art"},
  {name: "we see you", artist: "Zahra Ebrahim, Keisha St. Louis-McBurnie, Eunice Wong, Aranya Khurana", lat: 43.6488, lng: -79.4025, description: "Talking park furniture installation in Trinity Bellwoods"},
  {name: "Home, Sweet Home", artist: "Anupa Khemadasa", lat: 43.6482, lng: -79.4018, description: "Housing crisis awareness installation"},
  {name: "Where There Is No Room for Fiction", artist: "Tong Lam", lat: 43.6478, lng: -79.4012, description: "Documentary photography exhibition"},
  {name: "Sacred Tags", artist: "Quinn Hopkins, NOODIN STUDIO", lat: 43.6472, lng: -79.4005, description: "Indigenous graffiti and language art"},
  {name: "Crafting Connections: Didukh as a Cultural Conversation", artist: "Oksana Hawrylak, Marta Iwanek", lat: 43.6468, lng: -79.3998, description: "Ukrainian cultural traditions"},
  {name: "FOR THE YOUTH", artist: "Alexis Nanibush-Pamajewong", lat: 43.6462, lng: -79.3992, description: "Youth powwow performance"},
  {name: "Youngplace - Nuit Blanche at Youngplace", artist: "Various Artists", lat: 43.6458, lng: -79.3985, description: "Multi-artist exhibition space"},
  {name: "Dark Landscapes", artist: "Moira Clark", lat: 43.6452, lng: -79.3978, description: "Photography exploring darkness"},
  {name: "Koffler Arts - Intergalactic Planetary", artist: "Tracey Snelling", lat: 43.6522, lng: -79.3958, description: "Miniature city installation"},
  {name: "Ryde: Wellbeing Challenge - Find Your Match", artist: "Experiential Activation", lat: 43.6518, lng: -79.3948, description: "Interactive wellbeing experience"},
  {name: "Community Canvas", artist: "Experiential Activation", lat: 43.6512, lng: -79.3942, description: "Collaborative art creation"},
  {name: "Signals of the City: Crossing Paths", artist: "Afaf Naseem", lat: 43.6392, lng: -79.4028, description: "Neon traffic light symbols at The Bentway"},
  {name: "Ephemeral Presence", artist: "Jordan Shaw", lat: 43.6388, lng: -79.4022, description: "Temporary installation exploring presence"},
  {name: "A Place I Call Home", artist: "Faisal Anwar", lat: 43.6382, lng: -79.4015, description: "Immigration and belonging stories"},
  {name: "The Eye of Wisdom", artist: "Ellen Pau", lat: 43.6528, lng: -79.3835, description: "Light-based Heart Sutra at City Hall"},
  {name: "Arts in Hong Kong", artist: "Experiential Activation", lat: 43.6522, lng: -79.3828, description: "Hong Kong cultural showcase"},
  {name: "The Bentway - Declaration of the Understory", artist: "Tania Willard", lat: 43.6395, lng: -79.4032, description: "Indigenous perspectives on urban space"},
  {name: "The Bentway - la sombra que te cobija", artist: "Edra Soto", lat: 43.6398, lng: -79.4038, description: "The shadow that shelters you"},
  {name: "PROTECT THE SACRED VOICE", artist: "Demian DinéYazhi'", lat: 43.6402, lng: -79.4045, description: "Indigenous sovereignty and voice"},
  {name: "The Bentway - Seeing Celsius", artist: "LeuWebb Projects", lat: 43.6405, lng: -79.4052, description: "Thermal-imaging viewfinders"},
  {name: "Take the Weather With You", artist: "Rhonda Weppler / Trevor Mahovsky", lat: 43.6408, lng: -79.4058, description: "Weather-based installation"},
  {name: "One Day...", artist: "Rojin Shafiei", lat: 43.6412, lng: -79.4065, description: "Future-focused art piece"},
  {name: "Rejection - in the context of Sringaram", artist: "Neeraja Ramani, Robert Kingsbury", lat: 43.6415, lng: -79.4072, description: "Classical dance exploration"},
  {name: "My words, Your words", artist: "Hye Eun Park", lat: 43.6418, lng: -79.4078, description: "Language and translation piece"},
  {name: "Diatomic States", artist: "Dylan Alsop, Elle Morris, James Jordan", lat: 43.6515, lng: -79.3795, description: "Interactive microscopic lake life at Design Exchange"},
  {name: "Dissolving Boundaries", artist: "OOOPStudio", lat: 43.6535, lng: -79.3885, description: "Climate action installation at OCAD"},
  {name: "Disappearing Acts", artist: "Nina Jeffares-Levitt", lat: 43.6538, lng: -79.3892, description: "Ephemeral performance art"},
  {name: "WISHING WELL: ALPHABET SOUP", artist: "xLq, Elizabeth Staples, Stella Conway", lat: 43.6542, lng: -79.3898, description: "Interactive wishing well"},
  {name: "The Bentway - A Lake Story", artist: "Melissa McGill", lat: 43.6422, lng: -79.4085, description: "Projection on Canada Malting Silos"},
  {name: "Poetry in Fragmentation", artist: "Franziska Barczyk", lat: 43.6425, lng: -79.4092, description: "Visual poetry installation"},
  {name: "Knitting Echoes", artist: "Ailin Dong, Xinzhou Zhang", lat: 43.6428, lng: -79.4098, description: "Textile and sound piece"},
  {name: "The Shadow Within", artist: "Kalpit Patel", lat: 43.6432, lng: -79.4105, description: "Shadow exploration"},
  {name: "Systems of Expression: From Pixels to Bottle Caps", artist: "Julia Shure, The Flying Bushman", lat: 43.6328, lng: -79.4168, description: "Mixed media at CNE"},
  {name: "Secret Handshake", artist: "AWYAH, Shaughn Martel, Trevor Janega", lat: 43.6545, lng: -79.3598, description: "Interactive social connection"},
  {name: "In Motion", artist: "Evangeline Y Brooks, Pegah Peivandi", lat: 43.6548, lng: -79.3605, description: "Dance and movement"},
  {name: "Daniels Spectrum - A Place We Call Home", artist: "Various Artists", lat: 43.6638, lng: -79.3592, description: "Community celebration"},
  {name: "Wychwood Barns - Echoes and BAM!", artist: "Lynn Jackson, Andrew Dickson", lat: 43.6812, lng: -79.4285, description: "Arts market and installations"},
  {name: "IN VIEW: Danforth Translated Storefront Series", artist: "Various Artists", lat: 43.6858, lng: -79.3125, description: "East Danforth storefront art"},
  {name: "Adhar - Space", artist: "Saretta Khan", lat: 43.6862, lng: -79.3118, description: "Textile experience"},
  {name: "O'notsta'kéha (Shake the Bush)", artist: "DJ Kookum", lat: 43.6865, lng: -79.3112, description: "Indigenous music performance"},
  {name: "Opening of the Mouth", artist: "Yasmeen Nematt Alla", lat: 43.6868, lng: -79.3105, description: "Performance art"},
  {name: "Japanese Canadian Cultural Centre - The Shape of Loss", artist: "Louise Noguchi", lat: 43.7245, lng: -79.3452, description: "Exploring loss and memory"},
  {name: "Aga Khan Museum - Voices of the City", artist: "Various Artists", lat: 43.7258, lng: -79.3328, description: "Multicultural performances"},
  {name: "Aga Khan Museum - Circle of Sound", artist: "Justin Gray", lat: 43.7262, lng: -79.3322, description: "Immersive musical journey"},
  {name: "Mabelle Arts - Signal", artist: "Chico Togni, Mercy Verdugo", lat: 43.6582, lng: -79.5425, description: "Communication through art"},
  {name: "The Places We Carry", artist: "Alize Zorlutuna", lat: 43.6545, lng: -79.3905, description: "Migration and memory"},
  {name: "5 Years at Home", artist: "Laurence Philomène", lat: 43.6548, lng: -79.3912, description: "Photographic exploration"},
  {name: "My Name is 張麟發 Tommy Lan Phat Truong 2.0", artist: "Tommy Truong", lat: 43.6552, lng: -79.3918, description: "Identity and naming"},
  {name: "Place Setting", artist: "Stephanie Avery", lat: 43.6555, lng: -79.3925, description: "Table and belonging"},
  {name: "¿Habla Español?", artist: "Alina Ponce", lat: 43.6558, lng: -79.3932, description: "Language and communication"},
  {name: "River Piece (Etobicoke)", artist: "asinnajaq", lat: 43.6285, lng: -79.5685, description: "Humber River installation"},
  {name: "Assembly Hall - Echoes of Identity", artist: "Daria Beer", lat: 43.6425, lng: -79.5328, description: "Personal identity exploration"},
  {name: "See Me From a Distance: Travesti Billboards", artist: "Sy Gomes, Roberta Kaya", lat: 43.7258, lng: -79.6085, description: "Travesti identity at Humber"},
  {name: "The Good Stuff", artist: "Crossroads Theatre", lat: 43.6565, lng: -79.3948, description: "Theatre performance"},
  {name: "Woven Words", artist: "Niloo Inalouei", lat: 43.6568, lng: -79.3955, description: "Textile storytelling"},
  {name: "YesterHere", artist: "Liam Sawyers", lat: 43.6535, lng: -79.3825, description: "Toronto's shifting identity through archival footage"},
  {name: "Domus Nexus", artist: "Humber Galleries Fellowship", lat: 43.7242, lng: -79.6098, description: "Collaborative installation"},
  {name: "Flora, Luna-Corona", artist: "Eric Chengyang", lat: 43.6572, lng: -79.3962, description: "Chinese cultural motifs"},
  {name: "Lucid Flow", artist: "Ivan Rys", lat: 43.6575, lng: -79.3968, description: "Water and light"},
  {name: "Function", artist: "Noor Khan", lat: 43.6578, lng: -79.3975, description: "Functional art piece"},
  {name: "Undersight", artist: "Cassils", lat: 43.6582, lng: -79.3982, description: "Morse code censorship projection"},
  {name: "The Loom of Lost Words", artist: "Maryam Zaraimajin", lat: 43.6585, lng: -79.3988, description: "Language and memory"},
  {name: "Meridian Arts Centre - Nuit Blanche at the MAC!", artist: "Various Artists", lat: 43.7485, lng: -79.4152, description: "Multiple installations"},
  {name: "S'imbriquer", artist: "Philippe Dépelteau", lat: 43.6588, lng: -79.3995, description: "Interlocking forms"},
  {name: "100% [City]", artist: "Rimini Protokoll", lat: 43.7488, lng: -79.4158, description: "100 Torontonians represent the city"},
  {name: "DOUBLE TAKE", artist: "Nancy Tam with Daniel O'Shea", lat: 43.6592, lng: -79.4002, description: "Dual perspectives"},
  {name: "The World in a City - FIFA World Cup 26", artist: "Experiential Activation", lat: 43.6425, lng: -79.3818, description: "Soccer celebration"},
  {name: "We Change Each Other", artist: "Shilpa Gupta", lat: 43.6485, lng: -79.3725, description: "Relational art piece"},
  {name: "The Nuit Blanche Remote Access Hub", artist: "Tangled Art + Disability", lat: 43.7492, lng: -79.4165, description: "Accessible viewing hub with livestream"},
  {name: "Future Perfect", artist: "Action Hero & Mia & Eric", lat: 43.6595, lng: -79.4008, description: "Future visions"},
  {name: "The Dream Weave", artist: "Blessyl Buan", lat: 43.6598, lng: -79.4015, description: "Dream exploration"},
  {name: "Northbound: Songs of Sovereignty", artist: "Muse & Museums", lat: 43.7495, lng: -79.4172, description: "Indigenous sovereignty"},
  {name: "Lamination 1.0", artist: "Studio Rat", lat: 43.6602, lng: -79.4022, description: "Layered media"},
  {name: "Mind the map(ping)", artist: "Stéphanie Léonard, Yen Linh Thai", lat: 43.6605, lng: -79.4028, description: "Opening parade"},
  {name: "Knot Knowings", artist: "We: The Diaspora", lat: 43.6608, lng: -79.4035, description: "Diaspora experiences"}
];

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterHub, setFilterHub] = useState('all');
  const [showHotOnly, setShowHotOnly] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
             Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user location
  const getUserLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      // Show all events even without location
      const eventsWithData = events.map(event => ({
        ...event,
        hub: getHub(event.lat, event.lng),
        isHot: HOT_EVENTS.includes(event.name)
      }));
      setSortedEvents(eventsWithData);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);

        // Calculate distances and sort
        const eventsWithDistance = events.map(event => ({
          ...event,
          distance: calculateDistance(location.lat, location.lng, event.lat, event.lng),
          hub: getHub(event.lat, event.lng),
          isHot: HOT_EVENTS.includes(event.name)
        }));

        eventsWithDistance.sort((a, b) => a.distance - b.distance);
        setSortedEvents(eventsWithDistance);
        setLoading(false);
      },
      (error) => {
        setError('Location disabled. Showing all events.');
        // Show all events even without location
        const eventsWithData = events.map(event => ({
          ...event,
          hub: getHub(event.lat, event.lng),
          isHot: HOT_EVENTS.includes(event.name)
        }));
        setSortedEvents(eventsWithData);
        setLoading(false);
        console.error(error);
      }
    );
  };

  // Auto-locate on mount
  useEffect(() => {
    getUserLocation();
  }, []);

  const openDirections = (event) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${event.lat},${event.lng}`;
    window.open(url, '_blank');
  };

  const openMapView = () => {
    const markers = filteredEvents.map(e => `${e.lat},${e.lng}`).join('|');
    const url = `https://www.google.com/maps/search/?api=1&query=${filteredEvents[0]?.lat},${filteredEvents[0]?.lng}`;
    window.open(url, '_blank');
  };

  // Filter events based on search, hub, and hot status
  const filteredEvents = sortedEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesHub = filterHub === 'all' || event.hub?.name === filterHub;
    const matchesHot = !showHotOnly || event.isHot;
    return matchesSearch && matchesHub && matchesHot;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>🎨 Nuit Blanche Navigator</h1>
        <p className="subtitle">Oct 4-5, 2025 • 7pm-7am</p>
      </header>

      <div className="controls">
        <button
          onClick={getUserLocation}
          disabled={loading}
          className="locate-btn"
        >
          {loading ? '📍 Finding you...' : '📍 Refresh Location'}
        </button>
        {userLocation && (
          <div className="location-info">
            ✓ Found {filteredEvents.length} events nearby
          </div>
        )}

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search events, artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {/* Filters */}
        <div className="filters">
          <select
            value={filterHub}
            onChange={(e) => setFilterHub(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Hubs</option>
            <option value="Downtown">🏙️ Downtown</option>
            <option value="North York">🌆 North York</option>
            <option value="Etobicoke">🌊 Etobicoke</option>
            <option value="Independent">✨ Independent</option>
          </select>

          <button
            onClick={() => setShowHotOnly(!showHotOnly)}
            className={`hot-filter ${showHotOnly ? 'active' : ''}`}
          >
            🔥 Hot Now
          </button>

          <button
            onClick={openMapView}
            className="map-btn"
            disabled={filteredEvents.length === 0}
          >
            🗺️ Map
          </button>
        </div>
      </div>

      {error && (
        <div className="error">
          ⚠️ {error}
        </div>
      )}

      <div className="events-list">
        {filteredEvents.map((event, index) => (
          <div key={index} className={`event-card ${event.isHot ? 'hot-event' : ''}`} style={{ borderLeftColor: event.hub?.color }}>
            {event.isHot && <div className="hot-badge">🔥 HOT NOW</div>}
            <div className="event-header">
              <div className="event-title-row">
                <h3 className="event-name">{event.name}</h3>
                <span className="hub-badge" style={{ backgroundColor: event.hub?.color }}>
                  {event.hub?.emoji} {event.hub?.name}
                </span>
              </div>
              {event.distance && (
                <span className="event-distance">
                  {event.distance < 1
                    ? `${(event.distance * 1000).toFixed(0)}m`
                    : `${event.distance.toFixed(1)}km`}
                </span>
              )}
            </div>

            <p className="event-artist">👤 {event.artist}</p>

            {selectedEvent === index && (
              <div className="event-details">
                <p className="event-description">{event.description}</p>
                <p className="event-coords">
                  📍 {event.lat.toFixed(4)}, {event.lng.toFixed(4)}
                </p>
              </div>
            )}

            <div className="event-actions">
              <button
                onClick={() => openDirections(event)}
                className="directions-btn"
              >
                🗺️ Get Directions
              </button>
              <button
                onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                className="details-btn"
              >
                {selectedEvent === index ? '▲ Hide' : '▼ Details'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && !loading && (
        <div className="empty-state">
          <p>No events found. Try adjusting your filters.</p>
        </div>
      )}

      {sortedEvents.length === 0 && !loading && !error && (
        <div className="empty-state">
          <p>Tap "Refresh Location" to find events near you</p>
        </div>
      )}
    </div>
  );
}

export default App;
