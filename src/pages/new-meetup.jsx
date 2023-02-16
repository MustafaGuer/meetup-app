import { useRouter } from "next/router";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.replace("/");
  };

  return (
    <>
      <Head>
        <title>New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
};

export default NewMeetup;
