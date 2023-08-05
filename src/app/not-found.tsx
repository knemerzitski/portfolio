import TextLink from "@/components/nav/TextLink";
import Content from "@/components/container/Content";

export default function NotFound() {
  return (
    <Content className="h-screen min-h-[50rem] max-h-[75rem] w-full flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">404 Not Found</h1>
        <p className="font-medium">
          View <TextLink href="/">home page</TextLink>
        </p>
      </div>
    </Content>
  );
}