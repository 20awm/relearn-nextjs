import Button from "@/components/atoms/Button";
// import Card from "@/components/molecules/CardWithChildren";
import { isMobileScreenAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";
import { getEvents } from "@/services/events";
import CardProduct from "@/components/molecules/CardProduct";

export default function Home({ events }) {
  const [isMobileScreen] = useAtom(isMobileScreenAtom);
  console.log("isMobileScreen (jotai): ", isMobileScreen);

  console.log("Event List: ", events);

  return (
    <div class="p-4 font-poppins flex justify-center items-center min-h-screen">
      {isMobileScreen ? (
        <h1 class>This is Mobile View</h1>
      ) : (
        <h1 class>This is Desktop View</h1>
      )}
      <Button />
      {events.map((item) => (
        <CardProduct key={item.id}>
          <CardProduct.Body title={item.title} desc={item.participant} />
          {item.location}
        </CardProduct>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const [eventResult] = await Promise.all([getEvents()]);

    return {
      props: {
        events: eventResult,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
