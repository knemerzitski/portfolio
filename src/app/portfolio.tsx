import TextLink from "@/components/nav/TextLink";
import Image from "next/image";

import saunahouseConfiguratorImg from '@/assets/images/saunahouse-configurator.jpg';
import personnelRegistrationApplicationImg from '@/assets/images/personnel-registration-application.jpg';
import { IconNames } from "@/components/info/Icon";

export const name = 'Kevin Nemeržitksi';
export const title = 'Software Engineer';

export const metaTitle = name;
export const metaDescription = `${name} is a ${title.toLowerCase()} who loves problem-solving and spend his time around technology.`;

export const resumeUrl = '/resume.pdf';
export const resumeVersion = '1';
export const githubUrl = 'https://github.com/knemerzitski';
export const emailAddress = 'kevin@knemerzitski.com';

export const quickAboutMe = (
  <>
    Problem-solving and understanding how things work is my passion.
  </>
);

export const aboutMe = (
  <>
    <p>
      Hi I&apos;m Kevin. I graduated from University of Tartu, B.S.E., Computer Science.
    </p>

    <p>
      When i was a teenager, I was curious how multiplayer games work.
      I set up game servers to play and have fun with friends.
      I wanted to make changes to the code which eventually led me into learning programming.
    </p>

    <p>
      I love writing code and seeing it work.
      It motivating knowing that something I have worked on is being used.
    </p>

    <p>
      Outside of technology, I like to excerise and play tennis. And also, bunnies are adorable!
    </p>
  </>
);

interface Skill {
  readonly text: string,
  readonly icon?: IconNames
}
export const skills: Readonly<Skill[]> = [
  { text: 'Java', icon: 'java', },
  { text: 'Python', icon: 'python', },
  { text: 'C#', icon: 'csharp' },
  { text: 'PHP', icon: 'php', },
  { text: 'HTML',  icon: 'html', },
  { text: 'CSS', icon: 'css' },
  { text: 'Typescript', icon: 'ts' },
  { text: 'Vue', icon: 'vue' },
  { text: 'React', icon: 'react' },
  { text: 'SQL', icon: 'db'},
  { text: 'Docker', icon: 'docker', },
  { text: 'Git', icon: 'git', },
  { text: 'Terminal', icon: 'terminal', },
  { text: 'Blender', icon : 'blender', },
];

export const projects = [
  {
    title: "Saunahouse Configurator",
    subtitle: (
      <ul className="flex justify-between">
        <li>
          <TextLink className="flex items-center" href="https://design-saunahaus.de/konfigurator/">
            Visit Live
          </TextLink>
          <small className="absolute text-xs">(Source is not available)</small>
        </li>
        <li>
          <TextLink className="flex items-center" href="https://design-saunahaus.de/">
            SQUARE Saunahaus OÜ
          </TextLink>
        </li>
      </ul>
    ),
    desc: <>
      <p>
        Saunahouse Configrator accelerates client communication.
        Clients can easily request for a project offer of their dream saunahouse.
      </p>
      <p>
        I developed Saunahouse Configurator while working at SQUARE Saunahaus. It is a WordPress plugin.
        I chose Vue because I wanted to learn reactive web development and component based architecture.
      </p>
      <p>
        Requesting for an offer consists of three main steps:
      </p>
      <ol className="list-decimal list-inside">
        <li>Create and save a configuration of your saunahouse</li>
        <li>Fill in contact details</li>
        <li>Review and send your request</li>
      </ol>
    </>,
    carouselItems: [
      <Image key="mainPage" className="
        object-cover object-top w-full h-full rounded
      " src={saunahouseConfiguratorImg} alt="Saunahouse Configurator Main Page" />
    ],
    tags: [
      'Vue', 'Javascript', 'HTML', 'Sass', 'PHP',
      'WordPress', 'SQL', 'Webpack', 'REST API',
      'reCAPTCHA v3', 'Email'
    ]
  },
  {
    title: "Personnel Registration Application",
    subtitle: (
      <ul className="flex justify-between">
        <li className="flex flex-wrap gap-2">
          Source:
          <ul className="flex flex-wrap gap-3">
            <li>
              <TextLink href="https://github.com/knemerzitski/isikreg-javafx/">
                JavaFX
              </TextLink>
            </li>
            <li>
              <TextLink href="https://github.com/knemerzitski/isikreg-wpf/">
                WPF
              </TextLink>
            </li>
          </ul>
        </li>
        <li>
          <TextLink key="company" className="flex" href="https://mil.ee/en/">
            Estonian Defence Forces
          </TextLink>
        </li>
      </ul>
    ),
    desc: <>
      <p>
        The main goal of this application is to speed up initial registration of personnel.
        For example during the gathering of reserve army training exercises.
      </p>
      <p>
        I initially developed this application for Estonian Defence Forces during my conscript service.
        I have been updating it over the years due to changing requirements.
        It is built with JavaFX and later ported to WPF.
      </p>
      <p>
        Registration can be done manually by searching the table or by using an Estonian ID-card. It supports concurrent card readers.
        The application functions offline and registration can happen in multiple locations at the same time.
      </p>
    </>,
    carouselItems: [
      <Image key="mainPage" className="
        object-cover object-top w-full h-full rounded
      " src={personnelRegistrationApplicationImg} alt="Personnel Registration Application start" />
    ],
    tags: [
      'Java', 'C#', 'PC/SC', 'JavaFX', 'WPF', 'Excel'
    ]
  }
];