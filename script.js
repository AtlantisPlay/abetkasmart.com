const gameData = {
  princess: {
    image: "Assets/Images/Princess/sc03_shot02_keyframe.png",
    alt: "Princess Lily and her birthday world",
    status: "Live in stores",
    title: "Princess Birthday Games",
    text:
      "Help Princess Lily and her rainbow unicorn prepare for a special birthday through animated story chapters and independent learning games for ages 3-5.",
    learning:
      "No reading or voiceover is needed. The game guides children through visual context, original music, and beautiful songs. No scores, no pressure, and no stressful reward loops.",
    activities: [
      "Count candles, gifts, and balloons from 1 to 5",
      "Trace rainbows, numbers, and shapes with a fingertip",
      "Match colors, shapes, gifts, and sweet treats",
      "Sort, compare, and solve simple puzzles",
      "Decorate cupcakes, cakes, and party dresses",
      "Follow Lily's story across 9 animated chapters",
    ],
    links: {
      appStore: "https://apps.apple.com/il/app/princess-birthday-games-3-5/id6765734577",
      googlePlay: "https://play.google.com/store/apps/details?id=com.abetkasmart.princessgames&pcampaignid=web_share",
    },
  },
  christmas: {
    image: "Assets/Images/Christmass/Christmas%20Puzzle%20Games%20(Ages%203%E2%80%935).png",
    alt: "Christmas learning game world",
    status: "Live in stores",
    title: "Christmas Games",
    text:
      "A cozy holiday world inspired by nostalgic Christmas cards, with Santa, a baby reindeer, bear cubs, Christmas trees, stockings, gifts, warm lights, and gentle festive puzzles.",
    learning:
      "Children decorate trees, sort stockings, match festive objects, trace paths, and play gentle holiday learning games inside a warm winter world.",
    activities: [
      "Decorate Christmas trees and stockings",
      "Match festive objects and gifts",
      "Sort holiday shapes, colors, and treats",
      "Trace paths through cozy winter scenes",
    ],
    links: {
      appStore: "https://apps.apple.com/il/app/christmas-games-for-kids-3-5/id6756796485",
      googlePlay: "https://play.google.com/store/apps/details?id=com.abetkasmart.christmasgames",
    },
  },
  ocean: {
    image: "Assets/Images/Ocean/SC012%20Test.png",
    alt: "Magical ocean animals in a glowing reef world",
    status: "Coming soon",
    title: "Ocean Animals for Kids",
    text:
      "A magical ocean world filled with colorful reef creatures, quiet wonder, and gentle discovery. Children observe, notice, and play softly inside a world that belongs to the animals.",
    learning:
      "Children find hidden fish, match ocean pairs, sort babies to their mothers, trace paths, and watch gentle creature reactions. The feeling is simple: this is their home. Let them be.",
    activities: [
      "Find hidden reef animals",
      "Match ocean pairs and shapes",
      "Sort babies to their mothers",
      "Observe gentle creature reactions",
    ],
    links: false,
  },
  friends: {
    image: "Assets/Images/Friends/sc17_shot01_keyframe.png",
    alt: "Two snowy villages finally meet in a warm winter story",
    status: "Coming soon",
    title: "Little Friends Winter Story",
    text:
      "Across a snowy forest, two little villages live far apart. Penguins make ice cream. Forest animals bake cookies and jam. They send gifts, think about each other, and write letters across the snow.",
    learning:
      "A kind snowman clears the road between the villages and helps the friends finally meet. Children decorate treats, prepare gifts, write letters, trace snowy paths, and move the story toward friendship.",
    activities: [
      "Prepare ice cream, cookies, jam, and gifts",
      "Decorate letters and send them across the snow",
      "Trace snowy paths between two villages",
      "Help the friends finally meet",
    ],
    links: false,
  },
  monsters: {
    image: "Assets/Images/Monster%20Numbers/12345.png",
    alt: "Funny number monster characters from one to five",
    status: "Coming soon",
    title: "Monster Numbers",
    text:
      "A musical number-learning game where funny number monsters sing, play, and help children learn counting, tracing, and number recognition.",
    learning:
      "Children trace numbers, count objects, build dot patterns, tap in sequence, match number props, and meet a new number monster in each number block.",
    activities: [
      "Count with musical number monsters",
      "Trace numbers and simple shapes",
      "Match groups and number props",
      "Build early number confidence through songs",
    ],
    links: false,
  },
};

const gameCards = document.querySelectorAll(".game-card[data-game]");
const carousel = document.querySelector(".game-carousel");
const prevButton = document.querySelector(".carousel-button-prev");
const nextButton = document.querySelector(".carousel-button-next");
const detailImage = document.querySelector(".game-detail-image");
const detailStatus = document.querySelector(".game-detail-status");
const detailTitle = document.querySelector(".game-detail-title");
const detailText = document.querySelector(".game-detail-text");
const detailLearning = document.querySelector(".game-detail-learning");
const detailActions = document.querySelector(".game-detail-actions");
const detailLinks = document.querySelector(".game-detail-links");
const detailStoreLinks = detailLinks ? Array.from(detailLinks.querySelectorAll("a")) : [];

function setGame(gameKey, options = {}) {
  const game = gameData[gameKey];
  if (!game || !detailImage || !detailStatus || !detailTitle || !detailText || !detailLearning || !detailLinks) {
    return;
  }

  detailImage.src = game.image;
  detailImage.alt = game.alt;
  detailStatus.textContent = game.status;
  detailTitle.textContent = game.title;
  detailText.textContent = game.text;
  detailLearning.textContent = game.learning;
  if (detailActions) {
    detailActions.innerHTML = "";
    (game.activities || []).forEach((activity) => {
      const item = document.createElement("li");
      item.textContent = activity;
      detailActions.appendChild(item);
    });
    detailActions.hidden = !game.activities?.length;
  }
  const hasLinks = Boolean(game.links?.appStore || game.links?.googlePlay);
  detailLinks.hidden = !hasLinks;
  if (hasLinks) {
    const [appStoreLink, googlePlayLink] = detailStoreLinks;
    if (appStoreLink) {
      appStoreLink.href = game.links.appStore || "#";
      appStoreLink.hidden = !game.links.appStore;
      appStoreLink.target = "_blank";
      appStoreLink.rel = "noopener noreferrer";
    }
    if (googlePlayLink) {
      googlePlayLink.href = game.links.googlePlay || "#";
      googlePlayLink.hidden = !game.links.googlePlay;
      googlePlayLink.target = "_blank";
      googlePlayLink.rel = "noopener noreferrer";
    }
  }

  gameCards.forEach((card) => {
    const active = card.dataset.game === gameKey;
    card.classList.toggle("is-active", active);
    if (active) {
      card.setAttribute("aria-current", "true");
    } else {
      card.removeAttribute("aria-current");
    }
  });

  if (options.scroll && detailImage) {
    detailImage.closest(".game-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

gameCards.forEach((card) => {
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      return;
    }
    setGame(card.dataset.game, { scroll: true });
  });
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    setGame(card.dataset.game, { scroll: true });
  });
});

function scrollGames(direction) {
  if (!carousel) {
    return;
  }
  const amount = carousel.clientWidth * 0.82;
  carousel.scrollBy({ left: amount * direction, behavior: "smooth" });
}

prevButton?.addEventListener("click", () => scrollGames(-1));
nextButton?.addEventListener("click", () => scrollGames(1));
setGame("princess");
