
import { projects } from '@/app/portfolio';
import Card from '@/components/container/Card';
import Content from '@/components/container/Content';
import Section from '@/components/container/Section';
import Tag from '@/components/info/Tag';
import { notFound } from 'next/navigation';


export async function generateStaticParams() {
  return projects.map(project => project.slug);
}


export default function ProjectPage({
  params
}: {
  params: { slug: string }
}) {
  const project = projects.find(project => project.slug === params.slug);
  if (!project) {
    return notFound();
  }

  return (
    <>
      <Section>
        <Content>
          <Card>
            <h1 className="text-2xl xs:text-3xl sm:text-5xl">{project.title}</h1>

            <div className="mt-2 max-w-xl">
              {project.subtitle}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="grow basis-4/6">
                <h2 className="text-lg font-medium">Overview</h2>
                <div>
                  {project.desc}
                </div>
              </div>
              <div className="basis-2/6">
                <h2 className="text-lg font-medium">Technologies</h2>
                <ul className="flex flex-wrap gap-4 mt-4">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {project.categories.map((category, index) => (
              <div key={index}>
                <h2 className="mt-12 text-lg font-medium">{category.title}</h2>
                <ul className="mt-4 flex flex-col gap-10">
                  {category.list.map((item) => (
                    <li key={item.key}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>
        </Content>
      </Section>
    </>
  );
}