import MeetupList from "@/components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "Meetup 1",
    image:
      "https://www.pferde.de/magazin/wp-content/uploads/sites/5/2022/06/Tennessee-Walking-Horse.jpeg",
    address: "Some Street, 883883 Some City",
    description: "Some description",
  },
  {
    id: "m2",
    title: "Meetup 2",
    image:
      "https://www.zooroyal.de/magazin/wp-content/uploads/2019/02/Quarter-Horse_760x560.jpg",
    address: "Some Street, 883883 Some City",
    description: "Some description",
  },
];

const Landing = () => {
  return <MeetupList meetups={DUMMY_MEETUPS} />;
};

export default Landing;
