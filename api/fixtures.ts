import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (err) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

 const collections = ['artists', 'albums', 'tracks', 'users', 'trackhistories'];

 for (const collectionName of collections) {
   await dropCollection(db, collectionName);
 }

  const [TaylorSwift, KendrickLamar] = await Artist.create(
    {
      name: 'Taylor Swift',
      image: 'images/fb8a4c4c-9b58-447f-9287-f3d24437545f.jpeg',
      info: 'Taylor Alison Swift — американская певица, автор песен и актриса, родилась 13 декабря 1989 года в Реддинге,' +
        ' Пенсильвания, США. Она начала профессиональную карьеру в музыке в подростковом возрасте',
    },
    {
      name: 'Kendrick Lamar',
      image: 'images/5981d988-9834-4cf5-aef7-0ef3c3d28b5d.jpeg',
      info: 'Kendrick Lamar Duckworth — американский рэпер и автор песен, родившийся 17 июня 1987 года в Комптоне, Калифорния, США.'
    },
  );

 const [red, y1989, Fearless] = await Album.create(
   {
     artist: TaylorSwift,
     name: 'Red',
     release: 2012,
     image: 'images/3b819271-3834-43e4-800b-788d46c150ba.jpeg'
   },
   {
     artist: TaylorSwift,
     name: '1989',
     release: 2014,
     image: 'images/354b897b-b0b0-482c-9cfe-831f623ffefa.jpeg'
   },
   {
     artist: TaylorSwift,
     name: 'Fearless',
     release: 2008,
     image: 'images/32dcb6f7-02cd-49e8-8ada-36351f777874.jpeg'
   },
 );

 await Track.create(
   {
     album: red,
     name: 'Red',
     duration: '3:43',
     number: 2,
   },
   {
     album: red,
     name: 'Treacherous',
     duration: '4:02',
     number: 4,
   },
   {
     album: red,
     name: 'State of Grace',
     duration: '4:55',
     number: 1,
   },
   {
     album: red,
     name: '22',
     duration: '3:52',
     number: 7,
   },
   {
     album: red,
     name: 'Starlight',
     duration: '3:40',
     number: 3,
   },
 );

  await Track.create(
    {
      album: y1989,
      name: 'Welcome to New York',
      duration: '3:32',
      number: 5,
    },
    {
      album: y1989,
      name: 'style',
      duration: '4:02',
      number: 2,
    },
    {
      album: y1989,
      name: 'Bad Blood',
      duration: '3:31',
      number: 1,
    },
    {
      album: y1989,
      name: 'Shake It Off',
      duration: '3:39',
      number: 3,
    },
    {
      album: y1989,
      name: 'Clean',
      duration: '4:31',
      number: 4,
    },
  );

  await Track.create(
    {
      album: Fearless,
      name: 'Fearless',
      duration: '4:02',
      number: 1,
    },
    {
      album: Fearless,
      name: 'Love Story',
      duration: '3:56',
      number: 9,
    },
    {
      album: Fearless,
      name: 'Change',
      duration: '4:40',
      number: 3,
    },
    {
      album: Fearless,
      name: 'Fifteen',
      duration: '4:54',
      number: 4,
    },
    {
      album: Fearless,
      name: 'White Horse',
      duration: '3:54',
      number: 2,
    },
    {
      album: Fearless,
      name: 'You Belong with Me',
      duration: '3:51',
      number: 7,
    },
  );

 const [goodKid, PimpButterfly] = await Album.create(
   {
     artist: KendrickLamar,
     name: 'good kid, m.A.A.d city',
     release: 2012,
     image: 'images/8a0a28df-d6cf-457c-89c9-48171b45e025.jpeg',
   },
   {
     artist: KendrickLamar,
     name: 'To Pimp a Butterfly',
     release: 2015,
     image: 'images/0295c272-6e8c-4b7b-a3ad-33c891f7861f.jpeg',
   },
 );

  await Track.create(
    {
      album: goodKid,
      name: 'goodKid',
      duration: '3:34',
      number: 1,
    },
    {
      album: goodKid,
      name: 'Sherane a.k.a Master Splinter\'s Daughter ',
      duration: '4:33',
      number: 6,
    },
    {
      album: goodKid,
      name: 'Bitch, Don’t Kill My Vibe ',
      duration: '5:10',
      number: 3,
    },
    {
      album: goodKid,
      name: 'Money Trees (feat. Jay Rock)',
      duration: '6:27',
      number: 4,
    },
    {
      album: goodKid,
      name: 'The Art of Peer Pressure ',
      duration: '5:25',
      number: 2,
    },
    {
      album: goodKid,
      name: 'Backseat Freestyle',
      duration: '3:32',
      number: 5,
    },
  );

  await Track.create(
    {
      album: PimpButterfly,
      name: 'For Free? (Interlude)',
      duration: '3:34',
      number: 2,
    },
    {
      album: PimpButterfly,
      name: 'Wesley\'s Theory (feat. George Clinton & Thundercat)',
      duration: '4:47',
      number: 1,
    },
    {
      album: PimpButterfly,
      name: 'Institutionalized (feat. Bilal, Anna Wise & Snoop Dogg)',
      duration: '4:31',
      number: 4,
    },
    {
      album: PimpButterfly,
      name: 'King Kunta',
      duration: '3:54',
      number: 3,
    },
    {
      album: PimpButterfly,
      name: 'These Walls (feat. Bilal, Anna Wise & Thundercat)',
      duration: '5:01',
      number: 5,
    },
    {
      album: PimpButterfly,
      name: 'Alright',
      duration: '3:39',
      number: 7,
    },
    {
      album: PimpButterfly,
      name: 'u',
      duration: '4:28',
      number: 7,
    },
  );

  await db.close();
};

void run();