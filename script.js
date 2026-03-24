const games = [
  {
    title: "Каркассон",
    players: "2-5",
    playersTag: "3-4",
    time: "35",
    timeTag: "medium",
    type: "strategy",
    difficulty: 2,
    description: "Строим средневековый город, выкладывая тайлы и захватывая территории.",
  },
  {
    title: "Ticket to Ride (Билет на поезд)",
    players: "2-5",
    playersTag: "3-4",
    time: "40",
    timeTag: "medium",
    type: "family",
    difficulty: 2,
    description: "Прокладываем железнодорожные маршруты и соединяем города.",
  },
  {
    title: "Codenames (Кодовые имена)",
    players: "2-8",
    playersTag: "5+",
    time: "20",
    timeTag: "short",
    type: "party",
    difficulty: 1,
    description: "Объясняем слова ассоциациями и пытаемся не выбрать лишние.",
  },
  {
    title: "Dixit (Диксит)",
    players: "3-6",
    playersTag: "3-4",
    time: "30",
    timeTag: "short",
    type: "party",
    difficulty: 1,
    description: "Придумываем ассоциации к красивым иллюстрациям и угадываем чужие.",
  },
  {
    title: "Gloomhaven",
    players: "1-4",
    playersTag: "2",
    time: "120",
    timeTag: "long",
    type: "coop",
    difficulty: 3,
    description: "Эпическая кооперативная кампания в фэнтези-мире с тактическими боями.",
  },
  {
    title: "Пандемия",
    players: "2-4",
    playersTag: "3-4",
    time: "45",
    timeTag: "medium",
    type: "coop",
    difficulty: 2,
    description: "Командой учёных пытаемся остановить распространение опасных болезней.",
  },
  {
    title: "Азул",
    players: "2-4",
    playersTag: "2",
    time: "30",
    timeTag: "short",
    type: "family",
    difficulty: 1,
    description: "Выкладываем мозаики из плиток, собирая красивые комбинации.",
  },
  {
    title: "7 Wonders (7 Чудес)",
    players: "3-7",
    playersTag: "5+",
    time: "35",
    timeTag: "medium",
    type: "strategy",
    difficulty: 2,
    description: "Строим цивилизацию, разыгрывая карты и развивая науки, армию и торговлю.",
  },
  {
    title: "Splendor",
    players: "2-4",
    playersTag: "2",
    time: "30",
    timeTag: "short",
    type: "strategy",
    difficulty: 1,
    description: "Собираем кристаллы и покупаем карты, строя движок очков.",
  },
  {
    title: "Root",
    players: "2-4",
    playersTag: "3-4",
    time: "90",
    timeTag: "long",
    type: "strategy",
    difficulty: 3,
    description: "Асимметричная война звериных фракций в лесу с уникальными правилами.",
  },
];

function createDifficultyDots(level) {
  const container = document.createElement("div");
  container.className = "difficulty";
  for (let i = 1; i <= 3; i++) {
    const dot = document.createElement("span");
    if (i <= level) {
      dot.classList.add("active");
    }
    container.appendChild(dot);
  }
  return container;
}

function renderGames() {
  const grid = document.getElementById("gamesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const playersValue = document.getElementById("playersFilter")?.value || "all";
  const timeValue = document.getElementById("timeFilter")?.value || "all";
  const typeValue = document.getElementById("typeFilter")?.value || "all";

  const filtered = games.filter((game) => {
    const byPlayers = playersValue === "all" || game.playersTag === playersValue;
    const byTime = timeValue === "all" || game.timeTag === timeValue;
    const byType = typeValue === "all" || game.type === typeValue;
    return byPlayers && byTime && byType;
  });

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML =
      "<strong>Нет игр по выбранным параметрам.</strong><br/>Попробуй ослабить фильтры или выбрать другой тип игры.";
    grid.appendChild(empty);
    return;
  }

  filtered.forEach((game) => {
    const card = document.createElement("article");
    card.className = "card";

    const title = document.createElement("h3");
    title.textContent = game.title;

    const desc = document.createElement("p");
    desc.textContent = game.description;

    const badges = document.createElement("div");
    badges.className = "badge-row";

    const playersBadge = document.createElement("span");
    playersBadge.className = "badge badge--accent";
    playersBadge.textContent = `${game.players} игрока`;

    const timeBadge = document.createElement("span");
    timeBadge.className = "badge badge--soft";
    timeBadge.textContent = `${game.time} мин`;

    const typeBadge = document.createElement("span");
    typeBadge.className = "badge";
    const typeTextMap = {
      family: "Семейная",
      party: "Пати",
      strategy: "Стратегия",
      coop: "Кооператив",
    };
    typeBadge.textContent = typeTextMap[game.type] || "Игра";

    badges.appendChild(playersBadge);
    badges.appendChild(timeBadge);
    badges.appendChild(typeBadge);

    const meta = document.createElement("div");
    meta.className = "card__meta";

    const diffLabel = document.createElement("span");
    diffLabel.textContent = "Сложность:";

    const diff = createDifficultyDots(game.difficulty);

    meta.appendChild(diffLabel);
    meta.appendChild(diff);

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(badges);
    card.appendChild(meta);

    grid.appendChild(card);
  });
}

function setupFilters() {
  ["playersFilter", "timeFilter", "typeFilter"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", renderGames);
    }
  });
}

function setupYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
}

function setupThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("boardSiteTheme");
  const initialTheme = saved || (prefersDark ? "dark" : "light");

  if (initialTheme === "light") {
    document.body.classList.add("light");
    btn.textContent = "Тёмная тема";
  } else {
    document.body.classList.remove("light");
    btn.textContent = "Светлая тема";
  }

  btn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    localStorage.setItem("boardSiteTheme", isLight ? "light" : "dark");
    btn.textContent = isLight ? "Тёмная тема" : "Светлая тема";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupFilters();
  setupYear();
  setupThemeToggle();
  renderGames();
});

