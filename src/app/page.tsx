import Card from '@/components/container/Card';
import SectionHeading from '@/components/container/SectionHeading';
import Tag from '@/components/info/Tag';

import Image from 'next/image';

import portfolioHeroImg from '@/assets/images/portfolio-hero.jpg'

import CallToActionButton from '@/components/nav/CallToAction';
import Section from '@/components/container/Section';
import Content from '@/components/container/Content';
import Icon from '@/components/info/Icon';
import ContactForm from '@/components/root/ContactForm';
import Anchor from '@/components/nav/Anchor';

import {
  name as portfolioName,
  title as portfolioTitle,
  quickAboutMe,
  aboutMe,
  projects,
  skills
} from '@/app/portfolio';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section id="home" className="
        relative
        h-screen min-h-[35rem] max-h-[75rem]
        mb-12 md:mb-0
      ">

        {/* HERO IMAGE */}
        <Image priority className="absolute object-cover w-full h-full" src={portfolioHeroImg} alt="Calm night forest mountain starry sky" />
        <div className="absolute bg-gradient-to-b from-transparent from-80% to-background w-full h-full"></div>

        <Content className="absolute left-0 right-0 w-full h-full flex justify-center items-center">

          <div>
            <hgroup>
              <h1 className="text-4xl xxs:text-5xl sm:text-7xl font-bold mb-3">{portfolioName}</h1>
              <h2 className="text-xl xxs:text-2xl sm:text-3xl font-medium mb-2">{portfolioTitle}</h2>
              <p className="max-w-xs sm:max-w-lg mb-8">{quickAboutMe}</p>
            </hgroup>
            <div className="flex justify-end">
              <CallToActionButton href="/#projects">Projects</CallToActionButton>
            </div>
          </div>

          {<div className="absolute bottom-0 mb-6">
            <Anchor href="/#about">
              <div className="p-2">
                <span className="sr-only">Arrow down to about me</span>
                <Icon type="arrowDown" className="w-auto h-5" />
              </div>
            </Anchor>
          </div>}

        </Content>

      </section>

      {/* ABOUT */}
      <Section id="about">
        <SectionHeading>About Me</SectionHeading>
        <Content>
          <Card className="max-w-3xl mx-auto">
            <div className="text-justify mb-14">
              {/* md:text-left */}
              {aboutMe}
            </div>
            <div className="w-full text-end">
              <CallToActionButton href="/#contact">Contact</CallToActionButton>
            </div>
          </Card>
        </Content>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <SectionHeading>Projects</SectionHeading>
        <Content>
          <ul className="flex flex-col gap-24">
            {projects.map((project, projectIndex) => (
              <li key={projectIndex}>
                <Card>
                  <div className="
                  flex flex-col md:flex-row mb-6 md:gap-5
                  ">
                    <h3 className="text-2xl mb-6 text-center block md:hidden">
                      {project.title}
                    </h3>

                    <div className="md:basis-1/2 max-h-[60vh] mb-3 md:mb-0">
                      <div className="h-full">
                        {project.hero}
                      </div>

                    </div>

                    <div className="md:basis-1/2">
                      <h3 className="text-2xl hidden md:block">
                        {project.title}
                      </h3>

                      <div className="mt-2">
                        {project.subtitle}
                      </div>

                      <div className="mt-8">
                        {project.shortDesc}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-end gap-8 sm:gap-4">
                    <ul className="flex flex-wrap gap-4">
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <Tag>{tag}</Tag>
                        </li>
                      ))}
                    </ul>
                    <CallToActionButton
                      className="whitespace-nowrap"
                      href="/projects/saunahouse-configurator">
                      Project Page
                    </CallToActionButton>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Content>
      </Section>

      {/* SKILLS */}
      <Section id="skills">
        <SectionHeading>Skills</SectionHeading>
        <Content>
          <Card className="max-w-3xl mx-auto">
            <ul className="flex justify-center flex-wrap gap-8 my-8">
              {skills.map(({ text, icon }) => (
                <li key={text}>
                  <div className={`
                    text-lg font-medium
                    p-4 rounded-lg
                    flex flex-col gap-2 items-center
                  `}>
                    {icon ?
                      <Icon type={icon} className="w-auto h-10 sm:h-14" />
                      :
                      <div className="h-14"></div>
                    }
                    <span>{text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Content>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <SectionHeading>Contact</SectionHeading>
        <Content>
          <ContactForm />
        </Content>
      </Section>
    </>
  )
}