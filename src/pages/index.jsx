import Head from "next/head";
import { MongoClient } from "mongodb"; // if MongoClient is just used in server side function, it won't be included in the client side bundle (nextjs will look after it)

import MeetupList from "@/components/meetups/MeetupList";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "Meetup 1",
//     image:
//       "https://www.pferde.de/magazin/wp-content/uploads/sites/5/2022/06/Tennessee-Walking-Horse.jpeg",
//     address: "Some Street, 883883 Some City",
//     description: "Some description",
//   },
//   {
//     id: "m2",
//     title: "Meetup 2",
//     image:
//       "https://www.zooroyal.de/magazin/wp-content/uploads/2019/02/Quarter-Horse_760x560.jpg",
//     address: "Some Street, 883883 Some City",
//     description: "Some description",
//   },
// ];

const Landing = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetups App</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//   fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  //   fetch data from an API

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
};

export default Landing;
