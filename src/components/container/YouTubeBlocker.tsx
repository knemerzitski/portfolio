import { ReactNode } from "react";
import IntersectionSuspense from "@/components/container/IntersectionSuspense";
import ContentBlocker from "@/components/container/ContentBlocker";
import TextLink from "@/components/nav/TextLink";

export default function YouTubeBlocker({
  videoHash,
  linkText = 'Youtube Video Link',
  fallback,
}
  : {
    videoHash: string,
    linkText: string,
    fallback?: ReactNode
  }) {
  return (
    <ContentBlocker cookieKey="media" enableText="Enable Video" className="aspect-video w-full mx-auto"
      header={(
        <TextLink href={`https://youtu.be/${videoHash}`}>{linkText}</TextLink>
      )} fallback={fallback ?? (<div className="bg-black w-full h-full"></div>)}>

      <IntersectionSuspense className="aspect-video w-full mx-auto" rootMargin="200px"
        fallback={fallback}>
        <iframe className='aspect-video w-full mx-auto'
          loading="lazy"
          src={`https://www.youtube-nocookie.com/embed/${videoHash}`}
          title="YouTube video player"
          allow="accelerometer; encrypted-media; gyroscope; web-share" allowFullScreen>
        </iframe>
      </IntersectionSuspense>

    </ContentBlocker>
  );
}