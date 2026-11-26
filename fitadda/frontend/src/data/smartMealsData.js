// Regional Meal Catalog: curated Breakfast, Lunch, Dinner & Snack recipes by region
import { FITADDA_ASSETS } from "./assets";
const SMART_MEALS_DATABASE = [
  // ================= PAKISTAN 🇵🇰 =================
  {
    id: "sm-pk-b1",
    category: "Breakfast",
    regions: ["PK", "BD"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["eggs", "gluten", "dairy"],
    tags: ["anda", "egg", "paratha", "roti", "desi", "chai"],
    budget: "affordable",
    cookingStyle: "homemade",
    prepMinutes: 12,
    calories: 390,
    protein: 15,
    carbs: 42,
    fats: 16,
    image: FITADDA_ASSETS.foodAndaParatha,
    names: {
      en: "Anda Paratha & Light Dahi",
      ur: "انڈا پراٹھا اور تازہ دہی",
      roman: "Anda Paratha aur Taza Dahi"
    },
    descriptions: {
      en: "Whole-wheat light tawa paratha with spiced omelette and a cool spoonful of homemade yogurt.",
      ur: "ہلکے تیل میں پکا چکی آٹے کا پراٹھا، مصالحہ آملیٹ اور ٹھنڈا دہی۔",
      roman: "Kam tail mein bana chakki aate ka paratha, masala omelette aur thanda dahi."
    },
    serving: { en: "1 paratha + 1 egg + 1/2 cup dahi", ur: "1 پراٹھا + 1 انڈا + آدھا کپ دہی", roman: "1 paratha + 1 anda + 1/2 cup dahi" },
    ingredients: {
      en: ["Whole-wheat flour (chakki atta)", "1 egg with onion & coriander", "1/2 tsp oil/ghee", "Fresh dahi"],
      ur: ["چکی کا آٹا", "1 انڈا پیاز اور دھنیا کے ساتھ", "آدھا چمچ گھی یا تیل", "تازہ دہی"],
      roman: ["Chakki aata", "1 anda pyaaz aur dhaniya ke sath", "1/2 tsp ghee/oil", "Taza dahi"]
    },
    steps: {
      en: ["Cook thin whole-wheat paratha with minimal ghee.", "Whisk egg with chopped coriander and cook on tawa.", "Serve warm with fresh dahi."],
      ur: ["کم گھی میں پتلا پراٹھا سینکیں۔", "انڈے میں دھنیا ملا کر آملیٹ بنائیں۔", "تازہ دہی کے ساتھ پیش کریں۔"],
      roman: ["Kam ghee mein patla paratha sek lein.", "Ande mein dhaniya daal kar omelette pakayein.", "Taza dahi ke sath serve karein."]
    }
  },
  {
    id: "sm-pk-b2",
    category: "Breakfast",
    regions: ["PK", "IN"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["dairy"],
    tags: ["chana", "chickpeas", "dahi", "yogurt", "desi"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 8,
    calories: 320,
    protein: 15,
    carbs: 48,
    fats: 7,
    image: FITADDA_ASSETS.foodChanaDahi,
    names: {
      en: "Lahori Chana & Fresh Dahi Bowl",
      ur: "لاہوری چنا اور تازہ دہی",
      roman: "Chana aur Taza Dahi Bowl"
    },
    descriptions: {
      en: "Protein-rich boiled chickpeas tossed with cumin and lemon alongside creamy yogurt.",
      ur: "زیرہ اور لیموں ملے ابلے چنے اور تازہ دہی کا بھرپور ناشتہ۔",
      roman: "Zeera aur nimbu wale uble chane aur fresh dahi ka taqatwar nashta."
    },
    serving: { en: "1 bowl chana + 1/2 cup dahi", ur: "1 پیالہ چنا + آدھا کپ دہی", roman: "1 bowl chana + 1/2 cup dahi" },
    ingredients: {
      en: ["1 cup boiled chana", "Tomato, cucumber & onion", "Cumin & black pepper", "Fresh dahi"],
      ur: ["1 کپ ابلے چنے", "ٹماٹر، کھیرا اور پیاز", "زیرہ اور کالی مرچ", "تازہ دہی"],
      roman: ["1 cup uble chane", "Tamatar, kheera, pyaaz", "Zeera aur kali mirch", "Taza dahi"]
    },
    steps: {
      en: ["Warm chickpeas lightly with roasted cumin.", "Top with fresh diced veggies and cool dahi."],
      ur: ["چنوں کو بھنے زیرے کے ساتھ ہلکا گرم کریں۔", "اوپر سبزیاں اور دہی شامل کر کے نوش فرمائیں۔"],
      roman: ["Chanon ko zeere ke sath halka garam karein.", "Upar sabziyan aur dahi daal kar khayein."]
    }
  },
  {
    id: "sm-pk-l1",
    category: "Lunch",
    regions: ["PK", "IN", "BD"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["daal", "lentils", "rice", "chawal", "desi", "spicy"],
    budget: "affordable",
    cookingStyle: "homemade",
    prepMinutes: 20,
    calories: 450,
    protein: 17,
    carbs: 72,
    fats: 9,
    image: FITADDA_ASSETS.foodDaalChawal,
    names: {
      en: "Daal Chawal & Kachumber Salad",
      ur: "دال چاول اور کچومر سلاد",
      roman: "Daal Chawal aur Kachumber Salad"
    },
    descriptions: {
      en: "Homestyle yellow moong-masoor daal with garlic tadka, fluffy rice, and crisp lemon salad.",
      ur: "لہسن کے تڑکے والی مونگ مسور دال، ابلے چاول اور تازہ کچومر سلاد۔",
      roman: "Lehsan ke tadke wali moong-masoor daal, chawal aur nimbu wala kachumber salad."
    },
    serving: { en: "1 bowl daal + 3/4 cup rice + salad", ur: "1 پیالہ دال + چاول + سلاد", roman: "1 bowl daal + chawal + salad" },
    ingredients: {
      en: ["Yellow moong & masoor daal", "Steamed basmati rice", "Garlic, turmeric & cumin", "Cucumber, tomato & lemon"],
      ur: ["پیلی مونگ اور مسور دال", "باسمتی چاول", "لہسن، ہلدی اور زیرہ", "کھیرا، ٹماٹر اور لیموں"],
      roman: ["Moong masoor daal", "Basmati chawal", "Lehsan, haldi, zeera", "Kheera, tamatar, nimbu"]
    },
    steps: {
      en: ["Simmer lentils with turmeric until velvety.", "Finish with garlic-cumin tadka and serve over rice with fresh salad."],
      ur: ["دال کو ہلدی کے ساتھ نرم ہونے تک پکائیں۔", "لہسن زیرے کا تڑکا لگا کر چاول اور سلاد کے ساتھ پیش کریں۔"],
      roman: ["Daal ko haldi ke sath narm pakayein.", "Lehsan zeere ka tadka laga kar chawal aur salad ke sath serve karein."]
    }
  },
  {
    id: "sm-pk-l2",
    category: "Lunch",
    regions: ["PK"],
    isVegetarian: false,
    isHalalFriendly: true,
    allergens: ["gluten", "dairy"],
    tags: ["chicken", "karahi", "roti", "desi", "spicy"],
    budget: "moderate",
    cookingStyle: "homemade",
    prepMinutes: 25,
    calories: 510,
    protein: 34,
    carbs: 42,
    fats: 20,
    image: FITADDA_ASSETS.foodChickenKarahi,
    names: {
      en: "Light Home Chicken Karahi & Roti",
      ur: "ہلکی چکن کڑاہی اور روٹی",
      roman: "Home-Style Chicken Karahi aur Roti"
    },
    descriptions: {
      en: "Tender chicken simmered with fresh tomatoes, ginger juliennes, and whole-wheat phulka roti.",
      ur: "تازہ ٹماٹر اور ادرک میں پکی گھر کی چکن کڑاہی اور چکی کی روٹی۔",
      roman: "Taza tamatar aur adrak mein paki ghar ki chicken karahi aur chakki roti."
    },
    serving: { en: "1 bowl karahi + 1 whole-wheat roti", ur: "1 پیالہ کڑاہی + 1 روٹی", roman: "1 bowl karahi + 1 roti" },
    ingredients: {
      en: ["150g boneless chicken", "2 ripe tomatoes & ginger", "1 tbsp cooking oil", "1 whole-wheat roti"],
      ur: ["150 گرام چکن", "2 ٹماٹر اور ادرک", "1 چمچ تیل", "1 گندم کی روٹی"],
      roman: ["150g chicken", "2 tamatar aur adrak", "1 tbsp oil", "1 gehun ki roti"]
    },
    steps: {
      en: ["Cook chicken with crushed tomatoes, ginger, and black pepper.", "Garnish with green coriander and pair with warm roti."],
      ur: ["چکن کو ٹماٹر، ادرک اور کالی مرچ میں پکائیں۔", "ہرا دھنیا چھڑک کر گرم روٹی کے ساتھ پیش کریں۔"],
      roman: ["Chicken ko tamatar, adrak aur kali mirch mein pakayein.", "Hara dhaniya daal kar garam roti ke sath khayein."]
    }
  },
  {
    id: "sm-pk-l3",
    category: "Lunch",
    regions: ["PK", "IN"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["gluten"],
    tags: ["sabzi", "vegetables", "roti", "desi"],
    budget: "affordable",
    cookingStyle: "homemade",
    prepMinutes: 20,
    calories: 380,
    protein: 12,
    carbs: 58,
    fats: 10,
    image: FITADDA_ASSETS.foodSabziRoti,
    names: {
      en: "Seasonal Sabzi & Whole-Wheat Roti",
      ur: "موسمی سبزی اور چکی کی روٹی",
      roman: "Seasonal Sabzi aur Roti"
    },
    descriptions: {
      en: "Mixed seasonal vegetables gently sautéed with cumin and turmeric beside warm phulka rotis.",
      ur: "زیرے اور ہلدی میں پکی تازہ موسمی سبزی اور دو نرم پھلکا روٹیاں۔",
      roman: "Zeere aur haldi mein bani taza sabzi aur garam phulka roti."
    },
    serving: { en: "1.5 cups sabzi + 2 small rotis", ur: "سبزی + 2 چھوٹی روٹیاں", roman: "1.5 cups sabzi + 2 rotis" },
    ingredients: {
      en: ["Seasonal veggies (carrot, peas, zucchini)", "Onion, tomato & cumin", "2 small whole-wheat rotis"],
      ur: ["گاجر، مٹر یا توری", "پیاز، ٹماٹر اور زیرہ", "2 چھوٹی چکی کی روٹیاں"],
      roman: ["Gajar, matar ya sabzi", "Pyaaz, tamatar, zeera", "2 chhoti rotis"]
    },
    steps: {
      en: ["Sauté onions with cumin and cook mixed veggies till tender.", "Serve with warm rotis and lemon."],
      ur: ["پیاز اور زیرہ بھون کر سبزی پکائیں۔", "گرم روٹی اور لیموں کے ساتھ کھائیں۔"],
      roman: ["Pyaaz aur zeera bhoon kar sabzi pakayein.", "Garam roti ke sath serve karein."]
    }
  },
  {
    id: "sm-pk-d1",
    category: "Dinner",
    regions: ["PK", "IN"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["khichdi", "rice", "daal", "desi", "light"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 18,
    calories: 360,
    protein: 13,
    carbs: 62,
    fats: 6,
    image: FITADDA_ASSETS.foodKhichdi,
    names: {
      en: "Comfort Moong Daal Khichdi",
      ur: "ہلکی مونگ دال کھچڑی",
      roman: "Comfort Moong Daal Khichdi"
    },
    descriptions: {
      en: "Soothing, easy-to-digest rice and yellow lentil porridge gently spiced with cumin and turmeric.",
      ur: "ہلکی اور زود ہضم مونگ دال اور چاول کی کھچڑی زیرے اور ہلدی کے ساتھ۔",
      roman: "Halki phulki aur sukoon bhari moong daal khichdi zeere aur haldi ke sath."
    },
    serving: { en: "1 warm bowl (320g)", ur: "1 گرم پیالہ (320 گرام)", roman: "1 warm bowl (320g)" },
    ingredients: {
      en: ["1/2 cup rice + 1/3 cup moong daal", "Pinch of turmeric & cumin", "1/2 tsp ghee or olive oil"],
      ur: ["چاول اور پیلی مونگ دال", "چٹکی ہلدی اور زیرہ", "آدھا چمچ دیسی گھی یا تیل"],
      roman: ["Chawal aur peeli moong daal", "Haldi aur zeera", "1/2 tsp ghee ya oil"]
    },
    steps: {
      en: ["Simmer washed rice and moong daal with turmeric until soft.", "Finish with a light cumin drizzle."],
      ur: ["دال اور چاول کو ہلدی ڈال کر نرم گلا لیں۔", "اوپر ہلکا زیرہ شامل کر کے گرم کھائیں۔"],
      roman: ["Daal aur chawal ko haldi ke sath narm paka lein.", "Upar halka zeera daal kar khayein."]
    }
  },
  {
    id: "sm-pk-d2",
    category: "Dinner",
    regions: ["PK", "BD"],
    isVegetarian: false,
    isHalalFriendly: true,
    allergens: [],
    tags: ["chicken", "pulao", "rice", "curry", "desi"],
    budget: "moderate",
    cookingStyle: "homemade",
    prepMinutes: 25,
    calories: 470,
    protein: 28,
    carbs: 56,
    fats: 13,
    image: FITADDA_ASSETS.foodChickenPulao,
    names: {
      en: "Aromatic Yakhni Chicken Pulao",
      ur: "خوشبودار یخنی چکن پلاؤ",
      roman: "Yakhni Chicken Pulao"
    },
    descriptions: {
      en: "Fragrant basmati rice simmered in light chicken broth with whole spices and cucumber salad.",
      ur: "ہلکی یخنی اور کھڑے مصالحوں میں پکا چکن پلاؤ اور کھیرے کا سلاد۔",
      roman: "Halki yakhni aur khare masalon mein paka chicken pulao aur salad."
    },
    serving: { en: "1 plate pulao + salad", ur: "1 پلیٹ پلاؤ + سلاد", roman: "1 plate pulao + salad" },
    ingredients: {
      en: ["130g chicken pieces", "3/4 cup basmati rice", "Cardamom, cinnamon & cumin", "Cucumber & mint salad"],
      ur: ["130 گرام چکن", "باسمتی چاول", "الائچی، دارچینی اور زیرہ", "کھیرا اور پودینہ سلاد"],
      roman: ["130g chicken", "Basmati chawal", "Elaichi, darchini, zeera", "Kheera pudina salad"]
    },
    steps: {
      en: ["Simmer chicken gently with whole spices for quick broth.", "Cook rice in broth until fluffy and serve with salad."],
      ur: ["چکن کی مصالحے دار یخنی تیار کریں۔", "اسی یخنی میں چاول دم دیں اور سلاد کے ساتھ کھائیں۔"],
      roman: ["Chicken ki masaledar yakhni banayein.", "Isi yakhni mein chawal dum dein aur salad ke sath khayein."]
    }
  },
  {
    id: "sm-pk-s1",
    category: "Snacks",
    regions: ["PK", "IN"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["fruit", "chaat", "desi", "sweet"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 5,
    calories: 165,
    protein: 3,
    carbs: 38,
    fats: 1,
    image: FITADDA_ASSETS.foodFruitChaat,
    names: {
      en: "Fresh Desi Fruit Chaat",
      ur: "تازہ فروٹ چاٹ",
      roman: "Fresh Fruit Chaat"
    },
    descriptions: {
      en: "Seasonal apple, guava, banana, and pomegranate tossed with zesty lemon and chaat masala.",
      ur: "سیب، امرود، کیلا اور انار کی تازہ چاٹ لیموں اور چاٹ مصالحے کے ساتھ۔",
      roman: "Saib, amrood, kela aur anar ki taza chaat nimbu aur chaat masala ke sath."
    },
    serving: { en: "1 fresh bowl (200g)", ur: "1 پیالہ (200 گرام)", roman: "1 fresh bowl (200g)" },
    ingredients: {
      en: ["Apple, guava & banana", "Pomegranate seeds", "Lemon juice & chaat masala"],
      ur: ["سیب، امرود اور کیلا", "انار کے دانے", "لیموں اور چاٹ مصالحہ"],
      roman: ["Saib, amrood, kela", "Anar ke daane", "Nimbu aur chaat masala"]
    },
    steps: {
      en: ["Dice fresh fruits evenly.", "Toss with lemon juice and a pinch of chaat masala."],
      ur: ["تازہ پھل کاٹ لیں۔", "لیموں اور چاٹ مصالحہ ملا کر نوش فرمائیں۔"],
      roman: ["Taza phal kaat lein.", "Nimbu aur chaat masala mila kar khayein."]
    }
  },
  {
    id: "sm-pk-s2",
    category: "Snacks",
    regions: ["PK", "IN"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["chana", "roasted", "crunchy", "desi"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 2,
    calories: 140,
    protein: 8,
    carbs: 22,
    fats: 2,
    image: FITADDA_ASSETS.foodBhunaChana,
    names: {
      en: "Crunchy Roasted Bhuna Chana",
      ur: "کرارے بھنے چنے",
      roman: "Crunchy Bhuna Chana"
    },
    descriptions: {
      en: "Classic desi crunchy dry-roasted chickpeas rich in plant protein and fiber.",
      ur: "پروٹین اور فائبر سے بھرپور کرارے بھنے ہوئے چنے۔",
      roman: "Protein aur fiber se bharpoor karare bhune hue chane."
    },
    serving: { en: "1 small cup (35g)", ur: "1 چھوٹا کپ (35 گرام)", roman: "1 small cup (35g)" },
    ingredients: {
      en: ["Dry-roasted black chickpeas (bhuna chana)", "Pinch of black salt"],
      ur: ["بھنے ہوئے کالے چنے", "چٹکی کالا نمک"],
      roman: ["Bhune hue kaale chane", "Chutki kaala namak"]
    },
    steps: {
      en: ["Enjoy straight out of the jar with a cup of green tea or cardamom chai!"],
      ur: ["سبز چائے یا الائچی چائے کے ساتھ لطف اٹھائیں۔"],
      roman: ["Green tea ya elaichi chai ke sath maza lein!"]
    }
  },
  // ================= INDIA 🇮🇳 =================
  {
    id: "sm-in-b1",
    category: "Breakfast",
    regions: ["IN"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["nuts"],
    tags: ["poha", "peanuts", "desi", "south_asian"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 12,
    calories: 320,
    protein: 9,
    carbs: 54,
    fats: 8,
    image: FITADDA_ASSETS.foodPohaPeanuts,
    names: {
      en: "Kanda Batata Poha with Peanuts",
      ur: "پوہا مونگ پھلی کے ساتھ",
      roman: "Poha Peanuts ke Sath"
    },
    descriptions: {
      en: "Light flattened rice sautéed with mustard seeds, curry leaves, green peas, and roasted peanuts.",
      ur: "رائی، کڑی پتے، مٹر اور بھنی مونگ پھلی کے ساتھ ہلکا اور ذائقہ دار پوہا۔",
      roman: "Rai, kari patte, matar aur bhuni moongphali ke sath halka aur tasty poha."
    },
    serving: { en: "1 warm bowl (250g)", ur: "1 گرم پیالہ", roman: "1 warm bowl" },
    ingredients: {
      en: ["Flattened rice (poha)", "Onion, peas & turmeric", "Mustard seeds & curry leaves", "Roasted peanuts & lemon"],
      ur: ["پوہا", "پیاز، مٹر اور ہلدی", "رائی اور کڑی پتہ", "بھنی مونگ پھلی اور لیموں"],
      roman: ["Poha", "Pyaaz, matar, haldi", "Rai, kari patta", "Bhuni moongphali aur nimbu"]
    },
    steps: {
      en: ["Rinse poha gently and drain.", "Temper mustard seeds & curry leaves, toss veggies and poha, finish with lemon."],
      ur: ["پوہا دھو کر چھان لیں۔", "رائی اور کڑی پتے کے تڑکے میں پکا کر لیموں نچوڑیں۔"],
      roman: ["Poha dho kar chhan lein.", "Rai kari patte ke tadke mein mix karke nimbu dalen."]
    }
  },
  {
    id: "sm-in-b2",
    category: "Breakfast",
    regions: ["IN"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["idli", "dosa", "sambar", "south_indian", "fermented"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 15,
    calories: 310,
    protein: 11,
    carbs: 58,
    fats: 4,
    image: FITADDA_ASSETS.foodIdliSambar,
    names: {
      en: "Steamed Idli & Vegetable Sambar",
      ur: "بھاپ میں بنی اڈلی اور سبزیوں کا سانبر",
      roman: "Steamed Idli aur Veg Sambar"
    },
    descriptions: {
      en: "Soft fermented rice-lentil cakes paired with warm lentil-vegetable sambar—gut-friendly & light.",
      ur: "نرم اڈلیاں اور دال سبزیوں کا گرم سانبر جو ہاضمے کے لیے بہترین ہے۔",
      roman: "Naram steamed idli aur daal-sabzi wala garam sambar."
    },
    serving: { en: "3 idlis + 1 bowl sambar", ur: "3 اڈلیاں + 1 پیالہ سانبر", roman: "3 idlis + 1 bowl sambar" },
    ingredients: {
      en: ["Idli batter (fermented rice & urad dal)", "Toor dal & mixed veggies", "Sambar spices & curry leaves"],
      ur: ["اڈلی کا خمیر شدہ آمیزہ", "تور دال اور سبزیاں", "سانبر مصالحہ اور کڑی پتہ"],
      roman: ["Idli batter", "Toor dal aur sabziyan", "Sambar masala aur kari patta"]
    },
    steps: {
      en: ["Steam idli batter for 10 minutes until fluffy.", "Serve warm with steaming vegetable sambar."],
      ur: ["اڈلی کو 10 منٹ بھاپ میں پکائیں۔", "گرم سبزی سانبر کے ساتھ پیش کریں۔"],
      roman: ["Idli ko 10 minute steam karein.", "Garam sambar ke sath khayein."]
    }
  },
  {
    id: "sm-in-b3",
    category: "Breakfast",
    regions: ["IN", "PK"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["besan", "chilla", "gram_flour", "desi"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 12,
    calories: 300,
    protein: 14,
    carbs: 38,
    fats: 9,
    image: FITADDA_ASSETS.foodBesanChilla,
    names: {
      en: "Crispy Besan Chilla & Mint Dip",
      ur: "بیسن چیلا اور ہری چٹنی",
      roman: "Besan Chilla aur Hari Chutney"
    },
    descriptions: {
      en: "Savory chickpea-flour crepes loaded with chopped onions, tomatoes, and fresh coriander.",
      ur: "پیاز، ٹماٹر اور دھنیا کے ساتھ بیسن کے کرارے چیلے۔",
      roman: "Pyaaz, tamatar aur dhaniya wala crispy besan chilla."
    },
    serving: { en: "2 chillas + mint chutney", ur: "2 چیلے + ہری چٹنی", roman: "2 chillas + hari chutney" },
    ingredients: {
      en: ["1/2 cup besan (chickpea flour)", "Onion, tomato & cilantro", "Pinch of ajwain & turmeric"],
      ur: ["آدھا کپ بیسن", "پیاز، ٹماٹر اور دھنیا", "اجوائن اور ہلدی"],
      roman: ["1/2 cup besan", "Pyaaz, tamatar, dhaniya", "Ajwain aur haldi"]
    },
    steps: {
      en: ["Whisk besan with water and chopped veggies.", "Pour onto hot tawa and cook golden on both sides."],
      ur: ["بیسن میں پانی اور سبزیاں ملائیں۔", "گرم توے پر دونوں طرف سے سنہرا سینک لیں۔"],
      roman: ["Besan mein paani aur sabziyan mix karein.", "Tawe par dono taraf sunehra sek lein."]
    }
  },
  {
    id: "sm-in-l1",
    category: "Lunch",
    regions: ["IN"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["rajma", "kidney_beans", "rice", "chawal", "desi"],
    budget: "affordable",
    cookingStyle: "homemade",
    prepMinutes: 25,
    calories: 470,
    protein: 19,
    carbs: 76,
    fats: 8,
    image: FITADDA_ASSETS.foodRajmaChawal,
    names: {
      en: "Homestyle Rajma Chawal Bowl",
      ur: "راجما چاول",
      roman: "Homestyle Rajma Chawal"
    },
    descriptions: {
      en: "Hearty red kidney beans simmered in spiced tomato-ginger gravy over steamed rice.",
      ur: "ٹماٹر اور ادرک کے مصالحے میں پکا راجما اور ابلے چاول۔",
      roman: "Tamatar adrak ki gravy mein paka rajma aur garam chawal."
    },
    serving: { en: "1 bowl rajma + 3/4 cup rice", ur: "1 پیالہ راجما + چاول", roman: "1 bowl rajma + chawal" },
    ingredients: {
      en: ["1 cup boiled red rajma", "Tomato, onion & ginger", "Steamed basmati rice"],
      ur: ["1 کپ ابلا راجما", "ٹماٹر، پیاز اور ادرک", "باسمتی چاول"],
      roman: ["1 cup ubla rajma", "Tamatar, pyaaz, adrak", "Basmati chawal"]
    },
    steps: {
      en: ["Simmer boiled kidney beans in tomato masala for 12 minutes.", "Serve warm over fluffy rice."],
      ur: ["ابلے راجما کو مصالحے میں 12 منٹ پکائیں۔", "گرم چاولوں کے ساتھ پیش کریں۔"],
      roman: ["Uble rajma ko masale mein 12 minute pakayein.", "Garam chawal ke sath khayein."]
    }
  },
  {
    id: "sm-in-d1",
    category: "Dinner",
    regions: ["IN", "PK"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["dairy", "gluten"],
    tags: ["paneer", "curry", "roti", "desi"],
    budget: "moderate",
    cookingStyle: "homemade",
    prepMinutes: 22,
    calories: 460,
    protein: 22,
    carbs: 44,
    fats: 20,
    image: FITADDA_ASSETS.foodPaneerCurryRoti,
    names: {
      en: "Home-Style Paneer Curry & Roti",
      ur: "گھر کا پنیر سالن اور روٹی",
      roman: "Paneer Curry aur Roti"
    },
    descriptions: {
      en: "Soft cottage cheese cubes in light tomato-cashew-free herb gravy with whole-wheat roti.",
      ur: "ہلکے مصالحے میں بنا پنیر کا سالن اور گندم کی روٹی۔",
      roman: "Halke masale mein bana paneer salan aur chakki roti."
    },
    serving: { en: "1 bowl paneer curry + 1 roti", ur: "1 پیالہ پنیر سالن + 1 روٹی", roman: "1 bowl paneer + 1 roti" },
    ingredients: {
      en: ["120g fresh paneer cubes", "Tomato, ginger & kasuri methi", "1 whole-wheat roti"],
      ur: ["120 گرام تازہ پنیر", "ٹماٹر، ادرک اور قصوری میتھی", "1 گندم کی روٹی"],
      roman: ["120g taza paneer", "Tamatar, adrak, kasuri methi", "1 gehun ki roti"]
    },
    steps: {
      en: ["Simmer spiced tomato puree gently.", "Fold in paneer cubes and serve with warm roti."],
      ur: ["ٹماٹر کی گریوی ہلکی آنچ پر پکائیں۔", "پنیر کے ٹکڑے ڈال کر گرم روٹی کے ساتھ پیش کریں۔"],
      roman: ["Tamatar ki gravy pakayein.", "Paneer daal kar garam roti ke sath serve karein."]
    }
  },
  {
    id: "sm-in-s1",
    category: "Snacks",
    regions: ["IN"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["dhokla", "steamed", "makhana", "desi"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 10,
    calories: 170,
    protein: 7,
    carbs: 28,
    fats: 3,
    image: FITADDA_ASSETS.foodKhamanDhokla,
    names: {
      en: "Steamed Khaman Dhokla",
      ur: "بھاپ میں بنا نرم ڈھوکلا",
      roman: "Steamed Khaman Dhokla"
    },
    descriptions: {
      en: "Fluffy, airy steamed chickpea cakes tempered with mustard seeds and fresh green chilies.",
      ur: "ہلکا پھلکا بھاپ میں پکا ڈھوکلا رائی اور کڑی پتے کے تڑکے کے ساتھ۔",
      roman: "Halka phulka steamed dhokla rai aur kari patte ke tadke ke sath."
    },
    serving: { en: "4 light squares", ur: "4 ٹکڑے", roman: "4 pieces" },
    ingredients: {
      en: ["Gram flour (besan)", "Lemon juice & turmeric", "Mustard seeds & curry leaves"],
      ur: ["بیسن", "لیموں اور ہلدی", "رائی اور کڑی پتہ"],
      roman: ["Besan", "Nimbu aur haldi", "Rai aur kari patta"]
    },
    steps: {
      en: ["Steam besan batter for 12 minutes.", "Top with warm mustard seed tempering and coriander."],
      ur: ["آمیزے کو 12 منٹ بھاپ میں پکائیں۔", "اوپر رائی کا تڑکا اور دھنیا ڈالیں۔"],
      roman: ["Batter ko 12 minute steam karein.", "Upar rai ka tadka lagayein."]
    }
  },
  {
    id: "sm-in-s2",
    category: "Snacks",
    regions: ["IN", "PK"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["dairy"],
    tags: ["makhana", "fox_nuts", "desi"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 6,
    calories: 135,
    protein: 4,
    carbs: 20,
    fats: 4,
    image: FITADDA_ASSETS.foodMakhanaAlmonds,
    names: {
      en: "Roasted Masala Makhana",
      ur: "بھنے مصالحہ مکھانے",
      roman: "Roasted Masala Makhana"
    },
    descriptions: {
      en: "Crisp dry-roasted lotus seeds lightly dusted with turmeric, black pepper, and pink salt.",
      ur: "ہلکے گھی اور کالی مرچ میں بھنے کرارے پھول مکھانے۔",
      roman: "Crispy bhune hue phool makhane kali mirch aur pink salt ke sath."
    },
    serving: { en: "1 bowl (30g)", ur: "1 پیالہ (30 گرام)", roman: "1 bowl (30g)" },
    ingredients: {
      en: ["Lotus seeds (makhana)", "1/2 tsp ghee", "Black pepper & pink salt"],
      ur: ["پھول مکھانے", "آدھا چمچ گھی", "کالی مرچ اور نمک"],
      roman: ["Phool makhane", "1/2 tsp ghee", "Kali mirch aur namak"]
    },
    steps: {
      en: ["Toast makhana on low flame until crunchy.", "Season with black pepper and pink salt."],
      ur: ["ہلکی آنچ پر کرارے ہونے تک بھونیں۔", "کالی مرچ اور نمک چھڑک کر کھائیں۔"],
      roman: ["Halki aanch par crunchy hone tak bhoonein.", "Kali mirch aur namak dalen."]
    }
  },
  // ================= UNITED KINGDOM 🇬🇧 =================
  {
    id: "sm-gb-b1",
    category: "Breakfast",
    regions: ["GB", "US", "CA", "AU", "INTL"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["dairy"],
    tags: ["porridge", "oatmeal", "oats", "berries"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 8,
    calories: 320,
    protein: 11,
    carbs: 54,
    fats: 6,
    image: FITADDA_ASSETS.mealBreakfast,
    names: {
      en: "Warm Berry Porridge Bowl",
      ur: "گرم اوٹس دلیہ اور بیریز",
      roman: "Warm Berry Porridge"
    },
    descriptions: {
      en: "Creamy British-style rolled oat porridge topped with warm berries and a swirl of honey.",
      ur: "تازہ بیریز اور شہد کے ساتھ گرم اور ملائم اوٹس کا دلیہ۔",
      roman: "Berries aur shahad ke sath creamy oats porridge."
    },
    serving: { en: "1 warm bowl (300g)", ur: "1 گرم پیالہ", roman: "1 warm bowl" },
    ingredients: {
      en: ["50g rolled oats", "Milk or oat milk", "Mixed berries & honey"],
      ur: ["50 گرام اوٹس", "دودھ یا اوٹ ملک", "تازہ بیریز اور شہد"],
      roman: ["50g rolled oats", "Doodh ya oat milk", "Berries aur shahad"]
    },
    steps: {
      en: ["Simmer oats with milk for 5 minutes until velvety.", "Top with berries and a drizzle of honey."],
      ur: ["اوٹس کو دودھ میں 5 منٹ پکائیں۔", "اوپر بیریز اور شہد ڈال کر کھائیں۔"],
      roman: ["Oats ko doodh mein 5 minute pakayein.", "Upar berries aur honey dalen."]
    }
  },
  {
    id: "sm-gb-b2",
    category: "Breakfast",
    regions: ["GB", "US", "CA", "AU", "AE", "INTL"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["eggs", "gluten"],
    tags: ["eggs", "scrambled", "toast", "bread"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 8,
    calories: 330,
    protein: 17,
    carbs: 30,
    fats: 14,
    image: FITADDA_ASSETS.foodScrambledEggsToast,
    names: {
      en: "Scrambled Eggs on Wholegrain Toast",
      ur: "اسکرمبلڈ انڈے اور ہول گرین ٹوسٹ",
      roman: "Scrambled Eggs aur Wholegrain Toast"
    },
    descriptions: {
      en: "Fluffy soft-scrambled eggs served over crisp seeded wholegrain toast with grilled tomatoes.",
      ur: "نرم اسکرمبلڈ انڈے کرکرے ملٹی گرین ٹوسٹ اور ٹماٹر کے ساتھ۔",
      roman: "Soft scrambled eggs crisp wholegrain toast aur tamatar ke sath."
    },
    serving: { en: "2 eggs + 2 wholegrain slices", ur: "2 انڈے + 2 ٹوسٹ", roman: "2 eggs + 2 toast slices" },
    ingredients: {
      en: ["2 free-range eggs", "2 slices wholegrain toast", "Cherry tomatoes & black pepper"],
      ur: ["2 انڈے", "2 ملٹی گرین بریڈ سلائس", "ٹماٹر اور کالی مرچ"],
      roman: ["2 ande", "2 wholegrain bread slices", "Tamatar aur kali mirch"]
    },
    steps: {
      en: ["Toast wholegrain bread until crisp.", "Scramble eggs gently on low heat and serve with tomatoes."],
      ur: ["بریڈ کو ہلکا ٹوسٹ کریں۔", "انڈوں کو ہلکی آنچ پر پکا کر ٹماٹر کے ساتھ پیش کریں۔"],
      roman: ["Bread toast karein.", "Andon ko halki aanch par scramble karke serve karein."]
    }
  },
  {
    id: "sm-gb-l1",
    category: "Lunch",
    regions: ["GB", "US", "CA", "AU"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["potato", "jacket_potato", "beans", "soup"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 15,
    calories: 410,
    protein: 15,
    carbs: 74,
    fats: 5,
    image: FITADDA_ASSETS.foodJacketPotato,
    names: {
      en: "Baked Jacket Potato & Savoury Beans",
      ur: "بیکڈ جیکٹ آلو اور بینز",
      roman: "Jacket Potato & Beans"
    },
    descriptions: {
      en: "Crispy-skinned fluffy baked potato topped with warm tomato baked beans and crisp side salad.",
      ur: "اوون میں پکا آلو، ٹماٹر ساس میں بینز اور تازہ سلاد۔",
      roman: "Crispy baked jacket potato warm beans aur fresh salad ke sath."
    },
    serving: { en: "1 large potato + 1/2 cup beans", ur: "1 بڑا آلو + بینز", roman: "1 potato + beans" },
    ingredients: {
      en: ["1 large baking potato", "1/2 cup low-sugar baked beans", "Side green salad"],
      ur: ["1 بڑا آلو", "آدھا کپ بینز", "سبز سلاد"],
      roman: ["1 bada aloo", "1/2 cup baked beans", "Green salad"]
    },
    steps: {
      en: ["Bake potato until fluffy inside.", "Split open and spoon warm baked beans on top with fresh salad."],
      ur: ["آلو کو نرم ہونے تک بیک کریں۔", "درمیان سے کھول کر گرم بینز ڈالیں۔"],
      roman: ["Aloo bake karein.", "Beech se khol kar garam beans dalen."]
    }
  },
  {
    id: "sm-gb-l2",
    category: "Lunch",
    regions: ["GB", "US", "CA", "AU", "DE", "FR", "INTL"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["gluten"],
    tags: ["soup", "vegetable", "bread", "warm"],
    budget: "affordable",
    cookingStyle: "homemade",
    prepMinutes: 20,
    calories: 310,
    protein: 10,
    carbs: 50,
    fats: 7,
    image: FITADDA_ASSETS.foodLentilVegSoup,
    names: {
      en: "Hearty Vegetable Soup & Wholegrain Roll",
      ur: "سبزیوں کا گرم سوپ اور بریڈ رول",
      roman: "Hearty Vegetable Soup & Roll"
    },
    descriptions: {
      en: "Cozy carrots, celery, lentils, and thyme simmered into a comforting bowl with crusty bread.",
      ur: "گاجر، مٹر اور دال کا گرم سوپ تازہ بریڈ رول کے ساتھ۔",
      roman: "Gajar aur sabziyon ka garam soup fresh wholegrain roll ke sath."
    },
    serving: { en: "1 large bowl + 1 roll", ur: "1 بڑا پیالہ + 1 رول", roman: "1 bowl + 1 roll" },
    ingredients: {
      en: ["Carrot, celery, leek & red lentils", "Vegetable stock & thyme", "1 wholegrain bread roll"],
      ur: ["گاجر، مٹر اور مسور دال", "سبزی یخنی اور جڑی بوٹیاں", "1 گندم کا رول"],
      roman: ["Gajar, matar, masoor daal", "Veg stock aur herbs", "1 wholegrain roll"]
    },
    steps: {
      en: ["Simmer chopped veggies and lentils in stock for 15 minutes.", "Serve steaming hot with a wholegrain roll."],
      ur: ["سبزیوں اور دال کو 15 منٹ ابالیں۔", "گرم بریڈ رول کے ساتھ پئیں۔"],
      roman: ["Sabzi aur daal ko 15 minute pakayein.", "Garam bread roll ke sath serve karein."]
    }
  },
  {
    id: "sm-gb-d1",
    category: "Dinner",
    regions: ["GB", "US", "CA", "AU", "INTL"],
    isVegetarian: false,
    isHalalFriendly: true,
    allergens: ["seafood"],
    tags: ["fish", "salmon", "potatoes", "vegetables"],
    budget: "moderate",
    cookingStyle: "homemade",
    prepMinutes: 22,
    calories: 450,
    protein: 34,
    carbs: 34,
    fats: 19,
    image: FITADDA_ASSETS.mealDinner,
    names: {
      en: "Herb Baked Fish, Baby Potatoes & Greens",
      ur: "ہرب بیکڈ مچھلی، آلو اور سبزیاں",
      roman: "Baked Fish, Potatoes & Greens"
    },
    descriptions: {
      en: "Flaky lemon-herb baked fish fillet served alongside golden baby potatoes and tender green beans.",
      ur: "لیموں اور جڑی بوٹیوں میں بیک کی ہوئی مچھلی، بھنے آلو اور ہری سبزیاں۔",
      roman: "Nimbu aur herbs wali baked fish, baby potatoes aur green veggies."
    },
    serving: { en: "1 fillet + potatoes + greens", ur: "1 فلے + آلو + سبزیاں", roman: "1 fillet + potatoes + greens" },
    ingredients: {
      en: ["140g salmon or cod fillet", "Baby potatoes & broccoli", "Olive oil, lemon & parsley"],
      ur: ["140 گرام مچھلی کا فلے", "چھوٹے آلو اور بروکلی", "زیتون کا تیل اور لیموں"],
      roman: ["140g fish fillet", "Baby potatoes aur broccoli", "Olive oil aur nimbu"]
    },
    steps: {
      en: ["Roast halved baby potatoes for 12 minutes, add seasoned fish & greens for 12 more minutes."],
      ur: ["آلو اور مچھلی کو زیتون کے تیل میں بیک کریں۔"],
      roman: ["Aloo aur fish ko olive oil aur lemon ke sath bake karein."]
    }
  },
  {
    id: "sm-gb-d2",
    category: "Dinner",
    regions: ["GB", "US", "CA", "AU"],
    isVegetarian: false,
    isHalalFriendly: true,
    allergens: [],
    tags: ["chicken", "roast", "potatoes", "vegetables"],
    budget: "moderate",
    cookingStyle: "homemade",
    prepMinutes: 25,
    calories: 470,
    protein: 36,
    carbs: 38,
    fats: 16,
    image: FITADDA_ASSETS.foodRoastChickenPotatoes,
    names: {
      en: "Roast Chicken, Veggies & Baked Potatoes",
      ur: "روسٹ چکن، سبزیاں اور بیکڈ آلو",
      roman: "Roast Chicken & Baked Potatoes"
    },
    descriptions: {
      en: "Juicy rosemary roast chicken breast with crispy oven-baked potato wedges and roasted carrots.",
      ur: "اوون میں روسٹ چکن، گاجر اور کرکرے آلو۔",
      roman: "Juicy roast chicken, gajar aur oven-baked potatoes."
    },
    serving: { en: "150g chicken + 1 cup veggies + potato", ur: "چکن + سبزیاں + آلو", roman: "150g chicken + veggies + potato" },
    ingredients: {
      en: ["150g chicken breast", "Carrots & green peas", "1 medium baking potato"],
      ur: ["150 گرام چکن", "گاجر اور مٹر", "1 درمیانہ آلو"],
      roman: ["150g chicken", "Gajar aur matar", "1 potato"]
    },
    steps: {
      en: ["Season chicken and potato wedges with olive oil & herbs, roast until golden."],
      ur: ["چکن اور آلو پر مصالحہ لگا کر اوون میں روسٹ کریں۔"],
      roman: ["Chicken aur aloo par herbs laga kar roast karein."]
    }
  },
  // ================= UNITED STATES 🇺🇸 =================
  {
    id: "sm-us-l1",
    category: "Lunch",
    regions: ["US", "CA", "GB", "AU", "INTL"],
    isVegetarian: false,
    isHalalFriendly: true,
    allergens: ["gluten"],
    tags: ["chicken", "sandwich", "bread", "quick"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 10,
    calories: 420,
    protein: 30,
    carbs: 44,
    fats: 13,
    image: FITADDA_ASSETS.foodChickenSandwich,
    names: {
      en: "Grilled Chicken & Crisp Greens Sandwich",
      ur: "گرلڈ چکن سینڈوچ",
      roman: "Grilled Chicken Sandwich"
    },
    descriptions: {
      en: "Seasoned grilled chicken breast layered with lettuce, tomato, and avocado on wholegrain bread.",
      ur: "ملٹی گرین بریڈ میں گرلڈ چکن، سلاد پتہ اور ٹماٹر کا تازہ سینڈوچ۔",
      roman: "Wholegrain bread mein grilled chicken, salad patta aur tamatar ka sandwich."
    },
    serving: { en: "1 full sandwich", ur: "1 مکمل سینڈوچ", roman: "1 sandwich" },
    ingredients: {
      en: ["120g grilled chicken", "2 slices wholegrain bread", "Lettuce, tomato & mustard"],
      ur: ["120 گرام گرلڈ چکن", "2 ہول گرین بریڈ", "سلاد پتہ اور ٹماٹر"],
      roman: ["120g grilled chicken", "2 wholegrain slices", "Salad aur tamatar"]
    },
    steps: {
      en: ["Toast bread lightly and layer warm sliced chicken with crisp veggies."],
      ur: ["بریڈ ہلکا ٹوسٹ کر کے چکن اور سبزیاں رکھیں۔"],
      roman: ["Bread toast karke chicken aur sabziyan layer karein."]
    }
  },
  {
    id: "sm-us-l2",
    category: "Lunch",
    regions: ["US", "CA", "AU", "INTL"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["gluten"],
    tags: ["wrap", "vegetables", "hummus", "quick"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 8,
    calories: 360,
    protein: 13,
    carbs: 52,
    fats: 11,
    image: FITADDA_ASSETS.foodHummusWrap,
    names: {
      en: "Mediterranean Hummus & Veggie Wrap",
      ur: "ہمس اور سبزیوں کا ریپ",
      roman: "Hummus & Veggie Wrap"
    },
    descriptions: {
      en: "Soft whole-wheat tortilla rolled with creamy hummus, roasted peppers, cucumber, and spinach.",
      ur: "نرم روٹی میں ہمس، کھیرا، شملہ مرچ اور پالک کا مزیدار ریپ۔",
      roman: "Soft wrap mein hummus, kheera, shimla mirch aur palak."
    },
    serving: { en: "1 large wrap", ur: "1 ریپ", roman: "1 wrap" },
    ingredients: {
      en: ["1 whole-wheat wrap", "3 tbsp hummus", "Cucumber, bell pepper & spinach"],
      ur: ["1 ہول ویٹ ریپ", "3 چمچ ہمس", "کھیرا، شملہ مرچ اور پالک"],
      roman: ["1 whole-wheat wrap", "3 tbsp hummus", "Kheera, shimla mirch, palak"]
    },
    steps: {
      en: ["Spread hummus on tortilla, add crisp veggies, roll tightly and slice in half."],
      ur: ["روٹی پر ہمس لگا کر سبزیاں رکھیں اور رول کر لیں۔"],
      roman: ["Wrap par hummus laga kar sabziyan rakhein aur roll karein."]
    }
  },
  {
    id: "sm-us-d1",
    category: "Dinner",
    regions: ["US", "CA", "AU", "INTL"],
    isVegetarian: false,
    isHalalFriendly: true,
    allergens: [],
    tags: ["chicken", "rice", "bowl", "vegetables"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 18,
    calories: 480,
    protein: 35,
    carbs: 54,
    fats: 13,
    image: FITADDA_ASSETS.mealLunch,
    names: {
      en: "Grilled Chicken & Harvest Rice Bowl",
      ur: "گرلڈ چکن اور رائس باؤل",
      roman: "Grilled Chicken Rice Bowl"
    },
    descriptions: {
      en: "Warm jasmine or brown rice topped with herb-grilled chicken, sweet corn, and steamed broccoli.",
      ur: "ابلے چاولوں کے ساتھ گرلڈ چکن، مکئی اور ہری سبزیاں۔",
      roman: "Chawal ke sath herb grilled chicken, corn aur broccoli bowl."
    },
    serving: { en: "1 hearty bowl", ur: "1 بھرپور پیالہ", roman: "1 hearty bowl" },
    ingredients: {
      en: ["130g grilled chicken", "3/4 cup cooked rice", "Broccoli & sweet corn"],
      ur: ["130 گرام گرلڈ چکن", "ابلے چاول", "بروکلی اور مکئی"],
      roman: ["130g grilled chicken", "Uble chawal", "Broccoli aur corn"]
    },
    steps: {
      en: ["Grill seasoned chicken and arrange over warm rice and steamed greens."],
      ur: ["چکن کو گرل کر کے گرم چاول اور سبزیوں پر سجائیں۔"],
      roman: ["Chicken grill karke chawal aur sabziyon par rakhein."]
    }
  },
  {
    id: "sm-us-s1",
    category: "Snacks",
    regions: ["US", "GB", "CA", "AU", "INTL"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["dairy", "nuts"],
    tags: ["yogurt", "nuts", "fruit", "parfait"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 4,
    calories: 190,
    protein: 12,
    carbs: 18,
    fats: 8,
    image: FITADDA_ASSETS.foodYogurtBerriesNuts,
    names: {
      en: "Greek Yogurt, Fresh Fruit & Nuts",
      ur: "دہی، تازہ پھل اور میوہ جات",
      roman: "Yogurt, Fresh Fruit & Nuts"
    },
    descriptions: {
      en: "Cool protein-rich yogurt layered with sliced berries and a handful of crunchy almonds.",
      ur: "ٹھنڈا دہی تازہ پھلوں اور باداموں کے ساتھ۔",
      roman: "Thanda yogurt fresh phal aur badamon ke sath."
    },
    serving: { en: "1 small cup (180g)", ur: "1 کپ", roman: "1 cup" },
    ingredients: {
      en: ["3/4 cup plain yogurt", "Sliced berries or apple", "6 almonds or walnuts"],
      ur: ["سادہ دہی", "کٹا سیب یا بیریز", "6 بادام یا اخروٹ"],
      roman: ["Plain dahi/yogurt", "Saib ya berries", "6 badam ya akhrot"]
    },
    steps: {
      en: ["Spoon yogurt into a cup and top with fruit and chopped nuts."],
      ur: ["دہی میں پھل اور بادام شامل کر کے کھائیں۔"],
      roman: ["Yogurt mein phal aur nuts daal kar khayein."]
    }
  },
  {
    id: "sm-us-b1",
    category: "Breakfast",
    regions: ["US", "CA", "AU", "GB", "INTL"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["dairy", "nuts"],
    tags: ["yogurt", "berries", "parfait", "almonds", "quick"],
    budget: "moderate",
    cookingStyle: "quick",
    prepMinutes: 5,
    calories: 310,
    protein: 16,
    carbs: 36,
    fats: 11,
    image: FITADDA_ASSETS.foodYogurtBerriesNuts,
    names: {
      en: "Berry Greek Yogurt & Almond Breakfast Bowl",
      ur: "بیری یونانی دہی اور بادام کا ناشتہ باؤل",
      roman: "Berry Yogurt & Almond Breakfast Bowl"
    },
    descriptions: {
      en: "Creamy strained Greek yogurt layered with fresh berries, honey drizzle, and toasted almonds.",
      ur: "گاڑھے یونانی دہی میں تازہ بیریز، شہد اور بھنے ہوئے بادام کا ہلکا ناشتہ۔",
      roman: "Creamy yogurt mein fresh berries, shahad aur toasted badam."
    },
    serving: { en: "1 chilled bowl (280g)", ur: "1 ٹھنڈا پیالہ (280 گرام)", roman: "1 chilled bowl (280g)" },
    ingredients: {
      en: ["1 cup plain Greek yogurt", "Mixed fresh berries & banana", "1 tbsp sliced almonds & honey"],
      ur: ["1 کپ سادہ یونانی دہی", "تازہ بیریز اور کیلا", "کٹی ہوئی بادام اور شہد"],
      roman: ["1 cup Greek yogurt", "Fresh berries aur kela", "Sliced almonds aur shahad"]
    },
    steps: {
      en: ["Spoon yogurt into a chilled bowl.", "Top with sliced berries, almonds, and a light drizzle of honey."],
      ur: ["پیالے میں دہی نکالیں۔", "اوپر بیریز، بادام اور ہلکا شہد ڈالیں۔"],
      roman: ["Bowl mein yogurt nikalen.", "Upar berries, badam aur thora shahad dalen."]
    }
  },
  {
    id: "sm-us-l3",
    category: "Lunch",
    regions: ["US", "CA", "AU", "GB", "INTL"],
    isVegetarian: false,
    isHalalFriendly: true,
    allergens: [],
    tags: ["chicken", "grain_bowl", "quinoa", "vegetables", "salad"],
    budget: "moderate",
    cookingStyle: "homemade",
    prepMinutes: 18,
    calories: 465,
    protein: 34,
    carbs: 48,
    fats: 14,
    image: FITADDA_ASSETS.mealLunch,
    names: {
      en: "Grilled Chicken & Quinoa Grain Bowl",
      ur: "گرلڈ چکن اور کوئنوا گرین باؤل",
      roman: "Grilled Chicken & Quinoa Grain Bowl"
    },
    descriptions: {
      en: "Seasoned herb-grilled chicken served over fluffy quinoa, greens, cherry tomatoes, and olive lemon dressing.",
      ur: "گرلڈ چکن، کوئنوا، ہری سبزیاں، ٹماٹر اور زیتون لیموں کی ڈریسنگ کے ساتھ متوازن باؤل۔",
      roman: "Grilled chicken, quinoa, fresh greens aur lemon olive dressing wala bowl."
    },
    serving: { en: "1 hearty bowl (360g)", ur: "1 بھرپور پیالہ (360 گرام)", roman: "1 hearty bowl (360g)" },
    ingredients: {
      en: ["130g grilled chicken breast", "1/2 cup cooked quinoa", "Baby greens, corn & cherry tomatoes", "Olive oil & lemon juice"],
      ur: ["130 گرام گرلڈ چکن", "ابلا کوئنوا", "ہری سبزیاں، مکئی اور ٹماٹر", "زیتون کا تیل اور لیموں"],
      roman: ["130g grilled chicken", "Ubla quinoa", "Greens, corn aur tamatar", "Olive oil aur nimbu"]
    },
    steps: {
      en: ["Arrange warm quinoa and crisp greens in a bowl.", "Top with sliced grilled chicken and drizzle olive-lemon dressing."],
      ur: ["پیالے میں کوئنوا اور سبزیاں رکھیں۔", "اوپر گرلڈ چکن اور لیموں زیتون کی ڈریسنگ ڈالیں۔"],
      roman: ["Bowl mein quinoa aur sabzi lagayein.", "Grilled chicken aur lemon dressing dalen."]
    }
  },
  {
    id: "sm-us-d2",
    category: "Dinner",
    regions: ["US", "CA", "AU", "GB", "INTL"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["chickpea", "sweet_potato", "quinoa", "bowl", "roasted"],
    budget: "affordable",
    cookingStyle: "homemade",
    prepMinutes: 20,
    calories: 430,
    protein: 17,
    carbs: 64,
    fats: 11,
    image: FITADDA_ASSETS.foodChickpeaRiceBowl,
    names: {
      en: "Roasted Sweet Potato & Chickpea Harvest Bowl",
      ur: "بھنی شکر قندی اور چنے کا ہارویسٹ باؤل",
      roman: "Roasted Sweet Potato & Chickpea Dinner Bowl"
    },
    descriptions: {
      en: "Warm herb-roasted chickpeas and sweet potato cubes over brown rice with crisp greens and lemon vinaigrette.",
      ur: "ہربز میں بھنی شکر قندی، چنے اور براؤن چاول لیموں کی ہلکی ڈریسنگ کے ساتھ۔",
      roman: "Herb-roasted sweet potato aur chane brown rice aur fresh greens ke sath."
    },
    serving: { en: "1 warm bowl (350g)", ur: "1 گرم پیالہ (350 گرام)", roman: "1 warm bowl (350g)" },
    ingredients: {
      en: ["1/2 cup roasted chickpeas", "1 cup roasted sweet potato & broccoli", "1/2 cup warm brown rice", "Olive oil, garlic & lemon"],
      ur: ["بھنے سفید چنے", "شکر قندی اور بروکلی", "ابلا براؤن رائس", "زیتون کا تیل، لہسن اور لیموں"],
      roman: ["Roasted chickpeas", "Shakarkandi aur broccoli", "Brown rice", "Olive oil, lehsan aur nimbu"]
    },
    steps: {
      en: ["Roast diced sweet potato and chickpeas with olive oil and herbs.", "Serve warm over rice and tender greens with lemon juice."],
      ur: ["شکر قندی اور چنے کو زیتون کے تیل میں ہلکا بھون لیں۔", "چاولوں اور سبزیوں کے ساتھ گرم پیش کریں۔"],
      roman: ["Shakarkandi aur chane olive oil mein roast karein.", "Rice aur greens ke sath garam serve karein."]
    }
  },
  // ================= UNITED ARAB EMIRATES 🇦🇪 & GULF =================
  {
    id: "sm-ae-b1",
    category: "Breakfast",
    regions: ["AE", "SA", "QA", "KW", "OM", "BH"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["eggs", "gluten"],
    tags: ["balaleet", "eggs", "vermicelli", "saffron", "gulf"],
    budget: "affordable",
    cookingStyle: "homemade",
    prepMinutes: 15,
    calories: 380,
    protein: 14,
    carbs: 54,
    fats: 12,
    image: FITADDA_ASSETS.foodBalaleetOmelette,
    names: {
      en: "Emirati Balaleet & Spiced Omelette",
      ur: "اماراتی بلالیط اور آملیٹ",
      roman: "Emirati Balaleet & Omelette"
    },
    descriptions: {
      en: "Fragrant saffron-cardamom vermicelli topped with a thin golden savoury omelette—a beloved Gulf classic.",
      ur: "زعفران اور الائچی والی سویاں سنہری آملیٹ کے ساتھ — خلیجی روایتی ناشتہ۔",
      roman: "Zafran aur elaichi wali seviyan sunehre omelette ke sath."
    },
    serving: { en: "1 plate balaleet + 1 egg", ur: "1 پلیٹ بلالیط + 1 انڈا", roman: "1 plate balaleet + 1 anda" },
    ingredients: {
      en: ["Vermicelli (seviyan)", "Cardamom & saffron pinch", "1 whisked egg", "1 tsp olive oil or ghee"],
      ur: ["سویاں", "الائچی اور زعفران", "1 انڈا", "زیتون کا تیل یا گھی"],
      roman: ["Seviyan", "Elaichi aur zafran", "1 anda", "Olive oil ya ghee"]
    },
    steps: {
      en: ["Simmer vermicelli with cardamom and a touch of honey or sugar.", "Top with a thin warm omelette."],
      ur: ["سویوں کو الائچی اور زعفران کے ساتھ پکائیں۔", "اوپر پتلا آملیٹ رکھ کر گرم پیش کریں۔"],
      roman: ["Seviyon ko elaichi aur zafran mein pakayein.", "Upar patla omelette rakh kar serve karein."]
    }
  },
  {
    id: "sm-ae-l1",
    category: "Lunch",
    regions: ["AE", "SA", "QA", "KW", "OM", "BH"],
    isVegetarian: false,
    isHalalFriendly: true,
    allergens: [],
    tags: ["machboos", "chicken", "rice", "salad", "gulf"],
    budget: "moderate",
    cookingStyle: "homemade",
    prepMinutes: 25,
    calories: 500,
    protein: 32,
    carbs: 58,
    fats: 14,
    image: FITADDA_ASSETS.foodChickenMachboos,
    names: {
      en: "Chicken Machboos & Fresh Salad",
      ur: "چکن مجبوس اور تازہ سلاد",
      roman: "Chicken Machboos aur Fresh Salad"
    },
    descriptions: {
      en: "Spiced Emirati basmati rice cooked with dried lime (loomi), tender chicken, and crisp tomato-cucumber salad.",
      ur: "خشک لیموں (لومی) اور عربی مصالحوں میں پکا چکن مجبوس اور تازہ سلاد۔",
      roman: "Loomi aur Arab masalon mein paka chicken machboos aur taza salad."
    },
    serving: { en: "1 plate machboos + side salad", ur: "1 پلیٹ مجبوس + سلاد", roman: "1 plate machboos + salad" },
    ingredients: {
      en: ["140g chicken", "3/4 cup basmati rice", "Dried lime (loomi) & baharat spice", "Cucumber-tomato salad"],
      ur: ["140 گرام چکن", "باسمتی چاول", "لومی اور عربی مصالحہ", "کھیرا ٹماٹر سلاد"],
      roman: ["140g chicken", "Basmati chawal", "Loomi aur baharat", "Kheera tamatar salad"]
    },
    steps: {
      en: ["Simmer chicken with baharat spices and loomi.", "Cook basmati rice in the fragrant broth and pair with salad."],
      ur: ["چکن کو عربی مصالحوں میں پکائیں۔", "اسی یخنی میں چاول دم دے کر سلاد کے ساتھ پیش کریں۔"],
      roman: ["Chicken ko baharat mein pakayein.", "Yakhni mein chawal pakayein aur salad ke sath khayein."]
    }
  },
  {
    id: "sm-ae-d1",
    category: "Dinner",
    regions: ["AE", "SA", "QA", "KW", "OM", "BH", "EG", "TR", "INTL"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["lentil", "soup", "shorbat", "daal", "light"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 18,
    calories: 300,
    protein: 15,
    carbs: 48,
    fats: 5,
    image: FITADDA_ASSETS.foodLentilVegSoup,
    names: {
      en: "Warm Spiced Lentil Soup (Shorbat Adas)",
      ur: "گرم مسور دال سوپ (شوربۃ عدس)",
      roman: "Shorbat Adas (Lentil Soup)"
    },
    descriptions: {
      en: "Velvety red lentil soup gently seasoned with cumin, garlic, and a bright squeeze of fresh lemon.",
      ur: "زیرہ، لہسن اور تازہ لیموں کے ساتھ مسور دال کا ملائم عربی سوپ۔",
      roman: "Zeera, lehsan aur nimbu wala creamy red lentil soup."
    },
    serving: { en: "1 warm bowl + lemon wedge", ur: "1 پیالہ سوپ + لیموں", roman: "1 bowl soup + nimbu" },
    ingredients: {
      en: ["3/4 cup red masoor lentils", "Carrot, onion & garlic", "Cumin & lemon juice"],
      ur: ["مسور کی دال", "گاجر، پیاز اور لہسن", "زیرہ اور لیموں کا رس"],
      roman: ["Masoor daal", "Gajar, pyaaz, lehsan", "Zeera aur nimbu"]
    },
    steps: {
      en: ["Simmer red lentils with carrot and cumin for 15 minutes.", "Blend smoothly and serve with lemon."],
      ur: ["دال اور گاجر کو زیرے کے ساتھ 15 منٹ ابالیں۔", "بلینڈ کر کے لیموں نچوڑیں۔"],
      roman: ["Daal aur gajar ko 15 minute pakayein.", "Blend karke nimbu dalen."]
    }
  },
  {
    id: "sm-ae-s1",
    category: "Snacks",
    regions: ["AE", "SA", "QA", "KW", "OM", "BH", "EG", "PK"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: ["dairy"],
    tags: ["dates", "khajoor", "yogurt", "sweet"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 3,
    calories: 160,
    protein: 6,
    carbs: 30,
    fats: 2,
    image: FITADDA_ASSETS.foodDatesYogurt,
    names: {
      en: "Medjool Dates & Cool Yogurt Cup",
      ur: "کھجور اور ٹھنڈا دہی",
      roman: "Dates aur Thanda Dahi"
    },
    descriptions: {
      en: "Naturally sweet plump dates paired with creamy plain yogurt for steady afternoon energy.",
      ur: "قدرتی توانائی سے بھرپور میٹھی کھجوریں اور ٹھنڈا دہی۔",
      roman: "Natural energy ke liye meethi khajoor aur thanda dahi."
    },
    serving: { en: "3 dates + 1/2 cup yogurt", ur: "3 کھجوریں + آدھا کپ دہی", roman: "3 khajoor + 1/2 cup dahi" },
    ingredients: {
      en: ["3 soft Medjool dates", "1/2 cup plain yogurt or laban"],
      ur: ["3 نرم کھجوریں", "آدھا کپ سادہ دہی یا لبن"],
      roman: ["3 narm khajoor", "1/2 cup dahi ya laban"]
    },
    steps: {
      en: ["Serve dates alongside chilled yogurt and a pinch of cinnamon."],
      ur: ["ٹھنڈے دہی اور دارچینی کے ساتھ کھجوریں نوش فرمائیں۔"],
      roman: ["Thande dahi aur darchini ke sath khajoor khayein."]
    }
  },
  // ================= SAFE ALLERGY-FRIENDLY & INTL OPTIONS =================
  {
    id: "sm-intl-b1",
    category: "Breakfast",
    regions: ["INTL", "PK", "IN", "GB", "US", "AE"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["banana", "oats", "fruit", "gluten_free", "dairy_free"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 6,
    calories: 295,
    protein: 7,
    carbs: 58,
    fats: 4,
    image: FITADDA_ASSETS.mealBreakfast,
    names: {
      en: "Warm Chia, Banana & Rice-Oat Porridge",
      ur: "کیلا، چیا سیڈز اور گلوٹین فری دلیہ",
      roman: "Banana & Chia Warm Porridge"
    },
    descriptions: {
      en: "Naturally dairy-free, nut-free, egg-free comforting bowl sweetened with ripe banana and cinnamon.",
      ur: "دودھ، انڈے اور خشک میوہ جات سے پاک کیلے اور دارچینی کا ہلکا دلیہ۔",
      roman: "Bina doodh, ande aur nuts ke pakke kele aur darchini wala porridge."
    },
    serving: { en: "1 warm bowl", ur: "1 گرم پیالہ", roman: "1 warm bowl" },
    ingredients: {
      en: ["Certified GF oats or rice flakes", "1 ripe mashed banana", "1 tbsp chia seeds & cinnamon"],
      ur: ["چاول کے فلیکس یا گلوٹین فری اوٹس", "1 پکا ہوا کیلا", "چیا سیڈز اور دارچینی"],
      roman: ["GF oats ya poha", "1 paka kela", "Chia seeds aur darchini"]
    },
    steps: {
      en: ["Simmer flakes with water and mashed banana for 5 minutes.", "Sprinkle chia seeds and cinnamon."],
      ur: ["پانی اور کیلے کے ساتھ 5 منٹ پکائیں۔", "اوپر چیا سیڈز اور دارچینی چھڑکیں۔"],
      roman: ["Paani aur kele ke sath 5 minute pakayein.", "Upar chia seeds aur darchini dalen."]
    }
  },
  {
    id: "sm-intl-l1",
    category: "Lunch",
    regions: ["INTL", "JP", "KR", "CN", "MY", "ID", "SG"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["quinoa", "rice", "chickpea", "bowl", "salad"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 15,
    calories: 430,
    protein: 16,
    carbs: 66,
    fats: 11,
    image: FITADDA_ASSETS.foodChickpeaRiceBowl,
    names: {
      en: "Rainbow Chickpea & Herbed Rice Bowl",
      ur: "رنگ برنگا چنا اور چاول باؤل",
      roman: "Rainbow Chickpea & Rice Bowl"
    },
    descriptions: {
      en: "Wholesome steamed rice, warm spiced chickpeas, roasted sweet potato, and lemon olive dressing.",
      ur: "ابلے چاول، چنے، شکر قندی اور زیتون لیموں کی ڈریسنگ کے ساتھ مکمل کھانا۔",
      roman: "Uble chawal, chane, shakarkandi aur nimbu olive dressing bowl."
    },
    serving: { en: "1 colorful bowl", ur: "1 رنگین پیالہ", roman: "1 colorful bowl" },
    ingredients: {
      en: ["3/4 cup steamed rice", "1/2 cup spiced chickpeas", "Roasted sweet potato & cucumber", "Olive oil & lemon"],
      ur: ["ابلے چاول", "ابلا چنا", "شکر قندی اور کھیرا", "زیتون کا تیل اور لیموں"],
      roman: ["Uble chawal", "Chane", "Shakarkandi aur kheera", "Olive oil aur nimbu"]
    },
    steps: {
      en: ["Layer warm rice, chickpeas, and veggies in a bowl.", "Drizzle olive oil and lemon juice."],
      ur: ["پیالے میں چاول، چنے اور سبزیاں سجائیں۔", "اوپر زیتون کا تیل اور لیموں ڈالیں۔"],
      roman: ["Bowl mein chawal, chane aur sabzi lagayein.", "Olive oil aur nimbu dalen."]
    }
  },
  {
    id: "sm-intl-d1",
    category: "Dinner",
    regions: ["INTL", "TR", "ES", "IT", "FR", "DE"],
    isVegetarian: false,
    isHalalFriendly: true,
    allergens: [],
    tags: ["chicken", "vegetables", "potatoes", "herb"],
    budget: "moderate",
    cookingStyle: "homemade",
    prepMinutes: 22,
    calories: 440,
    protein: 34,
    carbs: 36,
    fats: 15,
    image: FITADDA_ASSETS.foodRoastChickenPotatoes,
    names: {
      en: "Garlic Herb Chicken & Roasted Vegetables",
      ur: "لہسن ہرب چکن اور بھنی سبزیاں",
      roman: "Garlic Herb Chicken & Roasted Veggies"
    },
    descriptions: {
      en: "Naturally dairy-free and gluten-free pan-seared chicken breast with zucchini, carrots, and potatoes.",
      ur: "دودھ اور گلوٹین سے پاک لہسن مصالحے والا گرلڈ چکن اور بھنی سبزیاں۔",
      roman: "Bina dairy aur gluten ke garlic herb chicken aur roasted sabziyan."
    },
    serving: { en: "140g chicken + 1.5 cups veggies", ur: "140 گرام چکن + سبزیاں", roman: "140g chicken + veggies" },
    ingredients: {
      en: ["140g chicken breast", "Zucchini, carrots & baby potatoes", "Olive oil, garlic & oregano"],
      ur: ["140 گرام چکن", "توری، گاجر اور آلو", "زیتون کا تیل اور لہسن"],
      roman: ["140g chicken", "Zucchini, gajar, aloo", "Olive oil aur lehsan"]
    },
    steps: {
      en: ["Sauté garlic chicken until golden and juicy.", "Serve with roasted veggies."],
      ur: ["لہسن اور تیل میں چکن سنہرا پکائیں۔", "بھنی سبزیوں کے ساتھ کھائیں۔"],
      roman: ["Lehsan aur oil mein chicken pakayein.", "Roasted sabzi ke sath serve karein."]
    }
  },
  {
    id: "sm-intl-s1",
    category: "Snacks",
    regions: ["INTL", "PK", "IN", "GB", "US", "AE"],
    isVegetarian: true,
    isHalalFriendly: true,
    allergens: [],
    tags: ["fruit", "apple", "seeds", "universal"],
    budget: "affordable",
    cookingStyle: "quick",
    prepMinutes: 3,
    calories: 145,
    protein: 3,
    carbs: 28,
    fats: 3,
    image: FITADDA_ASSETS.foodApplePumpkinSeeds,
    names: {
      en: "Crisp Apple Slices & Roasted Pumpkin Seeds",
      ur: "تازہ سیب اور کدو کے بھنے بیج",
      roman: "Crisp Apple & Pumpkin Seeds"
    },
    descriptions: {
      en: "Allergy-safe fresh seasonal fruit paired with crunchy mineral-rich pumpkin seeds.",
      ur: "ہر قسم کی الرجی سے محفوظ تازہ سیب اور کدو کے کرارے بیج۔",
      roman: "Allergy-safe taza saib aur kaddu ke bhune beej."
    },
    serving: { en: "1 medium apple + 1 tbsp seeds", ur: "1 سیب + 1 چمچ بیج", roman: "1 apple + 1 tbsp seeds" },
    ingredients: {
      en: ["1 crisp apple or pear", "1 tbsp roasted pumpkin seeds", "Pinch of cinnamon"],
      ur: ["1 تازہ سیب", "1 چمچ کدو کے بیج", "چٹکی دارچینی"],
      roman: ["1 taza saib", "1 tbsp pumpkin seeds", "Chutki darchini"]
    },
    steps: {
      en: ["Slice apple, sprinkle cinnamon, and enjoy with pumpkin seeds."],
      ur: ["سیب کاٹ کر دارچینی چھڑکیں اور بیجوں کے ساتھ کھائیں۔"],
      roman: ["Saib kaat kar darchini aur seeds ke sath khayein."]
    }
  }
];
export {
  SMART_MEALS_DATABASE
};
