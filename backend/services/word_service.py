import requests
from config import Config

class WordService:
    """Service for fetching random 5-letter words."""

    @staticmethod
    def fetch_5_letter_word() -> str:
        """
        Fetch a random 5-letter word from the external API.

        Returns:
            A 5-letter word in uppercase

        Raises:
            Exception: If unable to fetch a valid word after multiple attempts
        """
        max_attempts = 5
        attempts = 0

        while attempts < max_attempts:
            try:
                response = requests.get(Config.WORD_API_URL, timeout=5)
                response.raise_for_status()

                word_data = response.json()
                if isinstance(word_data, list) and len(word_data) > 0:
                    word = str(word_data[0]).upper().strip()

                    # Validate word is exactly 5 letters and alphabetic
                    if len(word) == 5 and word.isalpha():
                        return word
                    else:
                        attempts += 1
                        continue
                else:
                    attempts += 1
                    continue

            except requests.RequestException as e:
                print(f"Error fetching word: {e}")
                attempts += 1
                continue

        # If API fails, fallback to a predefined list of 5-letter words
        fallback_words = [
            'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT',
            'AFTER', 'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT',
            'ALIKE', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'ANGEL', 'ANGER',
            'ANGLE', 'ANGRY', 'APART', 'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE',
            'ARRAY', 'ASIDE', 'ASSET', 'AVOID', 'AWARD', 'AWARE', 'BADLY', 'BAKER',
            'BASES', 'BASIC', 'BEACH', 'BEGAN', 'BEING', 'BELOW', 'BENCH', 'BILLY',
            'BIRTH', 'BLACK', 'BLAME', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST',
            'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRAVE', 'BREAD', 'BREAK', 'BREED',
            'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER',
            'CABLE', 'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS',
            'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD',
            'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK',
            'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST', 'COULD', 'COUNT',
            'COURT', 'COVER', 'CRAFT', 'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS',
            'CROWD', 'CROWN', 'CRUDE', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED',
            'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DELTA', 'DENSE', 'DEPOT', 'DEPTH',
            'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DRAWN', 'DREAM',
            'DRESS', 'DRIED', 'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER',
            'EARLY', 'EARTH', 'EIGHT', 'EITHER', 'ELECT', 'ELITE', 'EMPTY', 'ENEMY',
            'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT',
            'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FENCE', 'FIBER', 'FIELD',
            'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET',
            'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND',
            'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT', 'FULLY', 'FUNNY',
            'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND',
            'GRANT', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN',
            'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'GUILD', 'HABIT', 'HAPPY', 'HARRY',
            'HEART', 'HEAVY', 'HENCE', 'HENRY', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN',
            'IDEAL', 'IMAGE', 'IMPLY', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN',
            'JIMMY', 'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER',
            'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL',
            'LEMON', 'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS', 'LIVES', 'LOCAL',
            'LOGIC', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR',
            'MAKER', 'MARCH', 'MATCH', 'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT',
            'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR',
            'MOUNT', 'MOUSE', 'MOUTH', 'MOVED', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER',
            'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR',
            'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'OUTER', 'OWNED',
            'OWNER', 'PAINT', 'PANEL', 'PAPER', 'PARIS', 'PARTY', 'PEACE', 'PENNY',
            'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PIECE', 'PILOT', 'PITCH',
            'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'PLAZA', 'POINT', 'POUND',
            'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE',
            'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO',
            'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REALM', 'REFER',
            'RELAX', 'REPLY', 'RIDER', 'RIDGE', 'RIFLE', 'RIGHT', 'RIGID', 'RIVER',
            'ROCKY', 'ROGER', 'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL',
            'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SCREW', 'SENSE', 'SERVE', 'SEVEN',
            'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT',
            'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIGHT', 'SILLY',
            'SIMON', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLASH', 'SLEEP',
            'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SNAKE', 'SOLID',
            'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED',
            'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE',
            'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STICK', 'STILL', 'STOCK',
            'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY',
            'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUNNY', 'SUPER', 'SURGE', 'SWEET',
            'SWIFT', 'SWING', 'SWORD', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH',
            'TEETH', 'TEMPO', 'TENDS', 'TENTH', 'TEXAS', 'THANK', 'THEFT', 'THEIR',
            'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THOSE',
            'THREE', 'THREW', 'THROW', 'THUMB', 'TIGHT', 'TIMER', 'TITLE', 'TODAY',
            'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIL',
            'TRAIN', 'TRASH', 'TREAT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED',
            'TRIES', 'TROOP', 'TRUCK', 'TRULY', 'TRUST', 'TRUTH', 'TWICE', 'UNDER',
            'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE',
            'USUAL', 'VALID', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOCAL',
            'VOICE', 'VOTER', 'WAGON', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE',
            'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WIDOW', 'WIDTH', 'WOMAN',
            'WOMEN', 'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WOUND',
            'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOURS', 'YOUTH', 'ZEBRA'
        ]

        return random.choice(fallback_words)