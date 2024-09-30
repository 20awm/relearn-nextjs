import Button from "@/components/Button";
import ButtonWithProps from "@/components/ButtonWithProps";
import Card from "@/components/CardWithChildren";
export default function Home() {
  return (
    <div class="p-4 font-poppins flex justify-center items-center min-h-screen">
      <h1 class>Welcome to Nextjs</h1>
      <Button />
      <ButtonWithProps
        buttonClassname={"bg-green-500 text-blue"}
        textButton={"Submit"}
      />
      <Card cardClassname={"p-4"}>
        <h2 className="text-xl font-bold my-3">Card Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          laoreet rutrum lectus, sed tincidunt erat euismod eget. Morbi
          malesuada lacinia bibendum. Praesent eleifend mauris eget est cursus,
          ac aliquam dolor pulvinar. In hac habitasse platea dictumst. Nunc id
          nunc eros.
        </p>
      </Card>
      <Card className={"p-2"}>
        <h2 className="text-xl font-bold my-3">Card Title 2</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          laoreet rutrum lectus, sed tincidunt erat euismod eget. Morbi
          malesuada lacinia bibendum. Praesent eleifend mauris eget est cursus,
          ac aliquam dolor pulvinar. In hac habitasse platea dictumst. Nunc id
          nunc eros.
        </p>
      </Card>
    </div>
  )
}
