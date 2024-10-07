import Button from "@/components/atoms/Button";
import Card from "@/components/molecules/CardWithChildren";
import { isMobileScreenAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";

export default function Home() {
  const [isMobileScreen] = useAtom(isMobileScreenAtom);
  console.log("isMobileScreen (jotai): ", isMobileScreen);

  return (
    <div class="p-4 font-poppins flex justify-center items-center min-h-screen">
      <h1 class>Welcome to Nextjs</h1>
      <Button />
      {isMobileScreen && (
        <>
          <Card cardClassname={"p-4"}>
            <h2 className="text-xl font-bold my-3">Card Title</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              laoreet rutrum lectus, sed tincidunt erat euismod eget. Morbi
              malesuada lacinia bibendum. Praesent eleifend mauris eget est
              cursus, ac aliquam dolor pulvinar. In hac habitasse platea
              dictumst. Nunc id nunc eros.
            </p>
          </Card>
          <Card className={"p-2"}>
            <h2 className="text-xl font-bold my-3">Card Title 2</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              laoreet rutrum lectus, sed tincidunt erat euismod eget. Morbi
              malesuada lacinia bibendum. Praesent eleifend mauris eget est
              cursus, ac aliquam dolor pulvinar. In hac habitasse platea
              dictumst. Nunc id nunc eros.
            </p>
          </Card>
        </>
      )}
      {/* {isLargeScreen && (
        <>
          <h1 className="text-xl font-bold">THIS IS FOR LARGE SCREEN</h1>
        </>
      )} */}
    </div>
  );
}
