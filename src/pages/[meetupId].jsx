import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name="description" content={props.meetup.description} />
      </Head>
      <MeetupDetail
        image={props.meetup.image}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // false = all paths are defined below, 
    // true/blocking = nextjs will try to generate a page if id is not in the paths below
    // true will generate empty page if url not found and fill it after (we have to handle it)
    // blocking user will not see anything till page is prerendered
    fallback: 'blocking', 
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
};

export const getStaticProps = async (context) => {
  // fetch data for a single meetup
  // get params from url
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetup: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
      // meetup: {
      //   id: meetupId,
      //   image:
      //     "https://www.pferde.de/magazin/wp-content/uploads/sites/5/2022/06/Tennessee-Walking-Horse.jpeg",
      //   title: "A First Meetup",
      //   address: "Some Street 5, 888393 Some City",
      //   description: "Some Description",
      // },
    },
    revalidate: 10,
  };
};

export default MeetupDetails;
