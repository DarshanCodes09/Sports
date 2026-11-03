// STRIVORA Sports Arena Question Datasets
// Comprehensive, verified real-world sports data

// ==========================================================================
// 1. SPORTS QUIZ DATA (40 Questions: Cricket, Football, Basketball, Volleyball)
// ==========================================================================
export const quizQuestions = [
  // ------------------------------------------------------------------------
  // CRICKET (10 Questions)
  // ------------------------------------------------------------------------
  {
    id: 1,
    sport: "Cricket",
    difficulty: "Easy",
    question: "How many players are on the field for one team during a standard cricket match?",
    options: ["9", "10", "11", "12"],
    answer: "11",
    explanation: "Each cricket team fields 11 players during a match."
  },
  {
    id: 2,
    sport: "Cricket",
    difficulty: "Easy",
    question: "Which country won the inaugural ICC Men's Cricket World Cup in 1975?",
    options: ["Australia", "West Indies", "England", "India"],
    answer: "West Indies",
    explanation: "West Indies won the first Men's Cricket World Cup in 1975 at Lord's."
  },
  {
    id: 3,
    sport: "Cricket",
    difficulty: "Easy",
    question: "How many legal balls are bowled in one standard over in international cricket?",
    options: ["4", "6", "8", "10"],
    answer: "6",
    explanation: "A standard over consists of 6 legal deliveries."
  },
  {
    id: 4,
    sport: "Cricket",
    difficulty: "Medium",
    question: "Who holds the record for scoring the highest individual score in Men's ODI cricket (264 runs)?",
    options: ["Rohit Sharma", "Martin Guptill", "Chris Gayle", "Virender Sehwag"],
    answer: "Rohit Sharma",
    explanation: "Rohit Sharma scored 264 runs off 173 balls against Sri Lanka in 2014 at Eden Gardens."
  },
  {
    id: 5,
    sport: "Cricket",
    difficulty: "Medium",
    question: "What is the maximum number of overs one bowler can bowl in an uninterrupted 50-over ODI match?",
    options: ["8 overs", "10 overs", "12 overs", "15 overs"],
    answer: "10 overs",
    explanation: "Under ICC rules, a bowler can bowl a maximum of one-fifth of the total overs (10 overs)."
  },
  {
    id: 6,
    sport: "Cricket",
    difficulty: "Medium",
    question: "Who is the only bowler to take 800 wickets in Men's Test cricket history?",
    options: ["Shane Warne", "Muttiah Muralitharan", "James Anderson", "Anil Kumble"],
    answer: "Muttiah Muralitharan",
    explanation: "Sri Lanka's Muttiah Muralitharan took 800 Test wickets in 133 Test matches."
  },
  {
    id: 7,
    sport: "Cricket",
    difficulty: "Medium",
    question: "Which iconic cricket stadium in London is traditionally called the 'Home of Cricket'?",
    options: ["The Oval", "Lord's", "Edgbaston", "Old Trafford"],
    answer: "Lord's",
    explanation: "Lord's Cricket Ground in London, founded in 1814, is known as the Home of Cricket."
  },
  {
    id: 8,
    sport: "Cricket",
    difficulty: "Hard",
    question: "Who was the first male batsman to score a double century (200 runs) in ODI cricket?",
    options: ["Sachin Tendulkar", "Virender Sehwag", "Rohit Sharma", "Chris Gayle"],
    answer: "Sachin Tendulkar",
    explanation: "Sachin Tendulkar scored 200 not out against South Africa in Gwalior on February 24, 2010."
  },
  {
    id: 9,
    sport: "Cricket",
    difficulty: "Hard",
    question: "What was Sir Donald Bradman's final career batting average in Test match cricket?",
    options: ["95.50", "98.84", "99.94", "101.20"],
    answer: "99.94",
    explanation: "Sir Don Bradman retired with an all-time record Test batting average of 99.94."
  },
  {
    id: 10,
    sport: "Cricket",
    difficulty: "Hard",
    question: "Which country won the inaugural ICC Men's T20 World Cup held in South Africa in 2007?",
    options: ["Pakistan", "India", "Australia", "Sri Lanka"],
    answer: "India",
    explanation: "India defeated Pakistan by 5 runs in the final in Johannesburg to win the 2007 T20 World Cup."
  },

  // ------------------------------------------------------------------------
  // FOOTBALL (10 Questions)
  // ------------------------------------------------------------------------
  {
    id: 11,
    sport: "Football",
    difficulty: "Easy",
    question: "How long is a standard professional football (soccer) match, excluding extra time?",
    options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
    answer: "90 minutes",
    explanation: "A standard association football match consists of two 45-minute halves."
  },
  {
    id: 12,
    sport: "Football",
    difficulty: "Easy",
    question: "How many players per team are on the pitch at kickoff in an official football match?",
    options: ["9", "10", "11", "12"],
    answer: "11",
    explanation: "Each team fields 11 players, including one designated goalkeeper."
  },
  {
    id: 13,
    sport: "Football",
    difficulty: "Easy",
    question: "Which country won the 2022 FIFA Men's World Cup held in Qatar?",
    options: ["France", "Argentina", "Brazil", "Croatia"],
    answer: "Argentina",
    explanation: "Argentina defeated France in the penalty shootout after a 3-3 draw to lift the 2022 World Cup."
  },
  {
    id: 14,
    sport: "Football",
    difficulty: "Medium",
    question: "Which nation has won the most FIFA Men's World Cup titles in history (5 titles)?",
    options: ["Germany", "Italy", "Brazil", "Argentina"],
    answer: "Brazil",
    explanation: "Brazil has won 5 FIFA World Cups (1958, 1962, 1970, 1994, and 2002)."
  },
  {
    id: 15,
    sport: "Football",
    difficulty: "Medium",
    question: "What is the official distance from the goal line to the penalty spot in football?",
    options: ["10 yards", "12 yards (11 meters)", "15 yards", "18 yards"],
    answer: "12 yards (11 meters)",
    explanation: "The penalty mark is located exactly 12 yards (11 meters) from the center of the goal line."
  },
  {
    id: 16,
    sport: "Football",
    difficulty: "Medium",
    question: "Which football club has won the most UEFA Champions League / European Cup titles?",
    options: ["AC Milan", "Bayern Munich", "Real Madrid", "Liverpool"],
    answer: "Real Madrid",
    explanation: "Real Madrid has won a record 15 UEFA Champions League/European Cup titles."
  },
  {
    id: 17,
    sport: "Football",
    difficulty: "Medium",
    question: "Who is the all-time leading goalscorer in men's international football history?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Pelé", "Ali Daei"],
    answer: "Cristiano Ronaldo",
    explanation: "Cristiano Ronaldo holds the men's international scoring record with over 130 goals for Portugal."
  },
  {
    id: 18,
    sport: "Football",
    difficulty: "Hard",
    question: "In which year and country was the first-ever FIFA Men's World Cup held?",
    options: ["1930 in Uruguay", "1934 in Italy", "1938 in France", "1950 in Brazil"],
    answer: "1930 in Uruguay",
    explanation: "The inaugural FIFA World Cup was hosted and won by Uruguay in 1930."
  },
  {
    id: 19,
    sport: "Football",
    difficulty: "Hard",
    question: "Who is the only football player in history to have won three FIFA World Cup trophies?",
    options: ["Diego Maradona", "Pelé", "Zinedine Zidane", "Ronaldo Nazário"],
    answer: "Pelé",
    explanation: "Pelé won the FIFA World Cup with Brazil in 1958, 1962, and 1970."
  },
  {
    id: 20,
    sport: "Football",
    difficulty: "Hard",
    question: "What card color was introduced by FIFA in 1970 for sending off a player for serious foul play?",
    options: ["Blue card", "Black card", "Red card", "Orange card"],
    answer: "Red card",
    explanation: "The yellow and red card system was devised by Ken Aston and introduced at the 1970 World Cup."
  },

  // ------------------------------------------------------------------------
  // BASKETBALL (10 Questions)
  // ------------------------------------------------------------------------
  {
    id: 21,
    sport: "Basketball",
    difficulty: "Easy",
    question: "How many points is a regular field goal worth if made from inside the 3-point line?",
    options: ["1 point", "2 points", "3 points", "4 points"],
    answer: "2 points",
    explanation: "Any basket scored inside the 3-point arc counts for 2 points."
  },
  {
    id: 22,
    sport: "Basketball",
    difficulty: "Easy",
    question: "How many players per team are on the court at one time in a basketball game?",
    options: ["4", "5", "6", "7"],
    answer: "5",
    explanation: "Each basketball team plays with 5 players on the court."
  },
  {
    id: 23,
    sport: "Basketball",
    difficulty: "Easy",
    question: "What is the official height of a regulation basketball rim above the floor?",
    options: ["9 feet", "10 feet (3.05 m)", "11 feet", "12 feet"],
    answer: "10 feet (3.05 m)",
    explanation: "Regulation basketball rims are set exactly 10 feet (3.05 meters) above the ground."
  },
  {
    id: 24,
    sport: "Basketball",
    difficulty: "Medium",
    question: "How many seconds does an NBA team have on the shot clock to attempt a field goal?",
    options: ["20 seconds", "24 seconds", "30 seconds", "35 seconds"],
    answer: "24 seconds",
    explanation: "The NBA uses a 24-second shot clock to ensure fast-paced offensive play."
  },
  {
    id: 25,
    sport: "Basketball",
    difficulty: "Medium",
    question: "Who holds the record for scoring the most points in a single NBA game (100 points)?",
    options: ["Kobe Bryant", "Michael Jordan", "Wilt Chamberlain", "LeBron James"],
    answer: "Wilt Chamberlain",
    explanation: "Wilt Chamberlain scored 100 points for the Philadelphia Warriors on March 2, 1962."
  },
  {
    id: 26,
    sport: "Basketball",
    difficulty: "Medium",
    question: "Who is the all-time leading regular-season points scorer in NBA history?",
    options: ["Michael Jordan", "Kobe Bryant", "LeBron James", "Karl Malone"],
    answer: "LeBron James",
    explanation: "LeBron James surpassed Kareem Abdul-Jabbar in February 2023 to become the NBA's all-time scoring leader."
  },
  {
    id: 27,
    sport: "Basketball",
    difficulty: "Medium",
    question: "How many personal fouls causes an NBA player to foul out of a game?",
    options: ["4 fouls", "5 fouls", "6 fouls", "7 fouls"],
    answer: "6 fouls",
    explanation: "In the NBA, a player is disqualified from the game after committing 6 personal fouls."
  },
  {
    id: 28,
    sport: "Basketball",
    difficulty: "Hard",
    question: "Who invented the game of basketball in December 1891 in Springfield, Massachusetts?",
    options: ["James Naismith", "Abner Doubleday", "Walter Camp", "William G. Morgan"],
    answer: "James Naismith",
    explanation: "Dr. James Naismith invented basketball in 1891 as an indoor winter sport."
  },
  {
    id: 29,
    sport: "Basketball",
    difficulty: "Hard",
    question: "Which player won the most NBA Championships as a player in history (11 titles)?",
    options: ["Michael Jordan", "Bill Russell", "Kareem Abdul-Jabbar", "Magic Johnson"],
    answer: "Bill Russell",
    explanation: "Bill Russell won 11 NBA Championships in 13 seasons with the Boston Celtics."
  },
  {
    id: 30,
    sport: "Basketball",
    difficulty: "Hard",
    question: "What original object was used as the goal when basketball was first invented?",
    options: ["Wooden apple crate", "Peach basket", "Metal bucket", "Wicker laundry basket"],
    answer: "Peach basket",
    explanation: "Dr. James Naismith nailed two peach baskets to the gymnasium balcony railings."
  },

  // ------------------------------------------------------------------------
  // VOLLEYBALL (10 Questions)
  // ------------------------------------------------------------------------
  {
    id: 31,
    sport: "Volleyball",
    difficulty: "Easy",
    question: "How many players are on the court for each team during an indoor volleyball match?",
    options: ["4", "5", "6", "7"],
    answer: "6",
    explanation: "A standard indoor volleyball team consists of 6 players on the court."
  },
  {
    id: 32,
    sport: "Volleyball",
    difficulty: "Easy",
    question: "What is the maximum number of consecutive team hits allowed before sending the ball over the net?",
    options: ["2 hits", "3 hits", "4 hits", "5 hits"],
    answer: "3 hits",
    explanation: "A team is allowed up to 3 touches (excluding a block contact) to return the ball."
  },
  {
    id: 33,
    sport: "Volleyball",
    difficulty: "Easy",
    question: "How many points are required to win sets 1 through 4 in indoor volleyball (with a 2-point lead)?",
    options: ["15 points", "21 points", "25 points", "30 points"],
    answer: "25 points",
    explanation: "The first 4 sets are played to 25 points, requiring at least a two-point advantage."
  },
  {
    id: 34,
    sport: "Volleyball",
    difficulty: "Medium",
    question: "What is the defensive specialist called who wears a contrasting colored jersey in volleyball?",
    options: ["Setter", "Libero", "Opposite Hitter", "Middle Blocker"],
    answer: "Libero",
    explanation: "The libero is a back-row defensive specialist who wears a contrasting jersey."
  },
  {
    id: 35,
    sport: "Volleyball",
    difficulty: "Medium",
    question: "How many points is the deciding fifth tiebreak set played to in indoor volleyball?",
    options: ["15 points", "21 points", "25 points", "11 points"],
    answer: "15 points",
    explanation: "The deciding fifth set is played to 15 points (with a 2-point lead required)."
  },
  {
    id: 36,
    sport: "Volleyball",
    difficulty: "Medium",
    question: "In which direction do players rotate on the court when winning back the serve?",
    options: ["Clockwise", "Counter-clockwise", "Diagonally", "No rotation"],
    answer: "Clockwise",
    explanation: "Players rotate one position clockwise each time they win the serve from the opposing team."
  },
  {
    id: 37,
    sport: "Volleyball",
    difficulty: "Medium",
    question: "Under standard FIVB rules, is the libero player permitted to complete an attack-hit above the net?",
    options: ["No, it is restricted", "Yes, at any time", "Only in the fifth set", "Yes, if behind the 3m line"],
    answer: "No, it is restricted",
    explanation: "Under official FIVB rules, a libero is not allowed to complete an attack-hit if the ball is entirely above the net."
  },
  {
    id: 38,
    sport: "Volleyball",
    difficulty: "Hard",
    question: "In which year and country was volleyball invented by William G. Morgan (originally named 'Mintonette')?",
    options: ["1895 in the United States", "1905 in Canada", "1920 in France", "1885 in England"],
    answer: "1895 in the United States",
    explanation: "William G. Morgan invented 'Mintonette' in 1895 in Holyoke, Massachusetts."
  },
  {
    id: 39,
    sport: "Volleyball",
    difficulty: "Hard",
    question: "In what Olympic Games did indoor volleyball make its official Olympic debut as a medal sport?",
    options: ["1960 Rome", "1964 Tokyo", "1968 Mexico City", "1972 Munich"],
    answer: "1964 Tokyo",
    explanation: "Indoor volleyball became an official Olympic sport at the 1964 Tokyo Summer Games."
  },
  {
    id: 40,
    sport: "Volleyball",
    difficulty: "Hard",
    question: "What are the official dimensions of a regulation indoor volleyball court?",
    options: ["18m × 9m", "20m × 10m", "16m × 8m", "22m × 11m"],
    answer: "18m × 9m",
    explanation: "A standard volleyball court is a rectangle measuring 18 meters long by 9 meters wide."
  }
];

// ==========================================================================
// 2. FLAG CHALLENGE DATA
// ==========================================================================
export const flagQuestions = [
  {
    id: 1,
    flag: "🇧🇷",
    hint: "5-time FIFA World Cup champions and home of Pelé and Neymar",
    options: ["Argentina", "Brazil", "Portugal", "Colombia"],
    answer: "Brazil"
  },
  {
    id: 2,
    flag: "🇯🇲",
    hint: "World powerhouse in sprint athletics and home of Usain Bolt",
    options: ["Jamaica", "Bahamas", "Cuba", "Barbados"],
    answer: "Jamaica"
  },
  {
    id: 3,
    flag: "🇳🇿",
    hint: "World-famous for their rugby team known as the 'All Blacks'",
    options: ["Australia", "New Zealand", "South Africa", "Fiji"],
    answer: "New Zealand"
  },
  {
    id: 4,
    flag: "🇯🇵",
    hint: "Hosted the 2020 Summer Olympics and excels in Judo and Baseball",
    options: ["South Korea", "China", "Japan", "Singapore"],
    answer: "Japan"
  },
  {
    id: 5,
    flag: "🇰🇪",
    hint: "World leaders in long-distance running and marathon champions",
    options: ["Kenya", "Ethiopia", "Uganda", "Nigeria"],
    answer: "Kenya"
  }
];

// ==========================================================================
// 3. GUESS THE PLAYER DATA
// ==========================================================================
export const playerQuestions = [
  {
    id: 1,
    sport: "Football",
    clues: [
      "Won 8 Ballon d'Or awards",
      "Captained Argentina to win the 2022 FIFA World Cup",
      "Scored over 670 goals for FC Barcelona"
    ],
    options: ["Cristiano Ronaldo", "Lionel Messi", "Neymar Jr", "Kylian Mbappé"],
    answer: "Lionel Messi",
    fact: "Lionel Messi has won the FIFA World Cup Golden Ball twice (2014 and 2022)."
  },
  {
    id: 2,
    sport: "Cricket",
    clues: [
      "Only player to score 100 international centuries",
      "Nicknamed the 'Master Blaster' or 'Little Master'",
      "Played international cricket for India for 24 years (1989-2013)"
    ],
    options: ["Virat Kohli", "Sachin Tendulkar", "Brian Lara", "Ricky Ponting"],
    answer: "Sachin Tendulkar",
    fact: "Sachin Tendulkar scored a total of 34,357 runs in international cricket."
  },
  {
    id: 3,
    sport: "Basketball",
    clues: [
      "Won 6 NBA Championships with the Chicago Bulls",
      "Wore the famous jersey number 23",
      "Named NBA Finals MVP in all 6 championship victories"
    ],
    options: ["LeBron James", "Kobe Bryant", "Michael Jordan", "Shaquille O'Neal"],
    answer: "Michael Jordan",
    fact: "Michael Jordan won 10 NBA scoring titles during his career."
  },
  {
    id: 4,
    sport: "Tennis",
    clues: [
      "Won 22 Grand Slam men's singles titles",
      "Known as the 'King of Clay' with 14 French Open titles",
      "Legendary left-handed tennis star from Spain"
    ],
    options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Carlos Alcaraz"],
    answer: "Rafael Nadal",
    fact: "Rafael Nadal won 112 matches and lost only 4 at Roland Garros."
  },
  {
    id: 5,
    sport: "Cricket",
    clues: [
      "Scored the fastest century in Men's ODI history (31 balls)",
      "Nicknamed 'Mr. 360' for playing shots in all directions",
      "Legendary batsman and former captain of South Africa"
    ],
    options: ["AB de Villiers", "Chris Gayle", "Brendon McCullum", "Jos Buttler"],
    answer: "AB de Villiers",
    fact: "AB de Villiers scored his 31-ball hundred against West Indies in 2015."
  }
];

// ==========================================================================
// 4. STATS CHALLENGE DATA
// ==========================================================================
export const statsQuestions = [
  {
    id: 1,
    question: "Who holds the record for the highest individual score in Men's ODI cricket with 264 runs?",
    options: ["Rohit Sharma", "Martin Guptill", "Virender Sehwag", "Chris Gayle"],
    answer: "Rohit Sharma",
    fact: "Rohit Sharma scored 264 runs off 173 balls against Sri Lanka in 2014."
  },
  {
    id: 2,
    question: "What is the record for the most goals scored in a single European league season by Lionel Messi?",
    options: ["40 goals", "50 goals", "58 goals", "45 goals"],
    answer: "50 goals",
    fact: "Messi scored 50 goals in 37 league games for Barcelona in the 2011-12 season."
  },
  {
    id: 3,
    question: "Who holds the record for the most Grand Slam men's singles titles in tennis history?",
    options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
    answer: "Novak Djokovic",
    fact: "Novak Djokovic holds the men's record with 24 Grand Slam singles titles."
  },
  {
    id: 4,
    question: "Which team holds the longest winning streak in NBA regular season history (33 consecutive games)?",
    options: ["Golden State Warriors", "Los Angeles Lakers", "Chicago Bulls", "Boston Celtics"],
    answer: "Los Angeles Lakers",
    fact: "The 1971-72 Los Angeles Lakers won 33 games in a row."
  },
  {
    id: 5,
    question: "What is the highest team total scored in an ICC Men's Cricket ODI World Cup match?",
    options: ["428/5 (South Africa)", "417/6 (Australia)", "413/5 (India)", "397/6 (England)"],
    answer: "428/5 (South Africa)",
    fact: "South Africa scored 428/5 against Sri Lanka at the 2023 World Cup in Delhi."
  }
];
