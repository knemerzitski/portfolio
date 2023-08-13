import TextLink from "@/components/nav/TextLink";
import Image from "next/image";

import imgShCnfMain from '@/assets/images/shcnf/saunahouse-configurator-main.webp';
import imgShCnfFacade from '@/assets/images/shcnf/saunahouse-configurator-facade.webp';
import imgShCnfGallery from '@/assets/images/shcnf/saunahouse-configurator-gallery.webp';
import imgShCnfOverview from '@/assets/images/shcnf/saunahouse-configurator-saved-overview.webp';

import imgIsikregMain from '@/assets/images/isikreg/personnel-registration-app-main.webp';
import imgIsikregCardRegister from '@/assets/images/isikreg/personnel-registration-app-card-register.webp';
import imgIsikregInsertPerson from '@/assets/images/isikreg/personnel-registration-app-insert-person.webp';

import Icon, { IconNames } from "@/components/info/Icon";

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
      I wanted to make changes to the code which eventually led me into programming.
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
  { text: 'HTML', icon: 'html', },
  { text: 'CSS', icon: 'css' },
  { text: 'Typescript', icon: 'ts' },
  { text: 'Vue', icon: 'vue' },
  { text: 'React', icon: 'react' },
  { text: 'SQL', icon: 'db' },
  { text: 'Docker', icon: 'docker', },
  { text: 'Git', icon: 'git', },
  { text: 'Terminal', icon: 'terminal', },
  { text: 'Blender', icon: 'blender', },
];

export const projects = [
  {
    slug: 'saunahouse-configurator',
    title: "Saunahouse Configurator",
    subtitle: (
      <ul className="flex justify-between gap-2">
        <li>
          <TextLink className="flex items-center gap-1 leading-5" href="https://design-saunahaus.de/konfigurator/">
            <Icon type="eye" className="w-5 h-5 shrink-0" />
            Visit Live
          </TextLink>
          <small className="absolute text-xs hidden xxs:block">(Source is not available)</small>
        </li>
        <li>
          <TextLink className="flex items-center gap-1 leading-5" href="https://design-saunahaus.de/">
            <Icon type="building" className="w-5 h-5 shrink-0" />
            SQUARE Saunahaus OÜ
          </TextLink>
        </li>
      </ul>
    ),
    shortDesc: <p>
      This web app accelerates client communication.
      Clients can easily request for a project offer of their dream saunahouse.
    </p>,
    desc: <>
      <p>
        Saunahouse Configurator is a Wordpress plugin. In essence it&apos;s a customized request form.
        It has an admin panel to manage saunas, requests, email templates and settings.
      </p>
      <p>
        I chose to develop the app in Vue because I wanted to learn reactive web development and component based architecture.
      </p>
    </>,
    hero: (
      <Image key="mainPage" className={`
        object-cover object-top w-full h-full rounded
      `} src={imgShCnfMain} alt="Saunahouse Configurator main page" />
    ),
    imagesVideos: [
      <Image key="main" className="rounded" src={imgShCnfMain} alt="Saunahouse Configurator main page" />,
      <Image key="facade" className="rounded" src={imgShCnfFacade} alt="Saunahouse Configurator facade selection" />,
      <Image key="gallery" className="rounded" src={imgShCnfGallery} alt="Saunahouse Configurator gallery of selection" />,
      <Image key="overview" className="rounded" src={imgShCnfOverview} alt="Saunahouse Configurator saved overview" />
    ],
    tags: [
      'Vue', 'Javascript', 'HTML', 'Sass', 'PHP',
      'WordPress', 'SQL', 'Webpack', 'REST API',
      'reCAPTCHA v3', 'Email'
    ]
  },
  {
    slug: 'personnel-registration-app',
    title: "Personnel Registration Application",
    subtitle: (
      <ul className="flex justify-between gap-2">
        <li>
          <ul className="flex flex-wrap gap-4 xs:gap-3">
            <li>
              <TextLink className="flex items-center gap-1 leading-5" href="https://github.com/knemerzitski/isikreg-javafx/">
                <Icon type="github" className="w-auto h-5" />
                JavaFX
              </TextLink>
            </li>
            <li>
              <TextLink className="flex items-center gap-1 leading-5" href="https://github.com/knemerzitski/isikreg-wpf/">
                <Icon type="github" className="w-auto h-5" />
                WPF
              </TextLink>
            </li>
          </ul>
        </li>
        <li>
          <TextLink className="flex items-center gap-1" href="https://mil.ee/en/">
            <Icon type="building" className="w-5 h-5 shrink-0" />
            Estonian Defence Forces
          </TextLink>
        </li>
      </ul>
    ),
    shortDesc: <p>
      This app enables quick registration of personnel using multiple card readers.
      For example during the gathering of reserve army training exercises.
    </p>
    ,
    desc: <>
      <p>
        The main goal of this app is to speed up initial registration of personnel.
        For example during the gathering of reserve army training exercises.
      </p>
      <p>
        I initially developed it for Estonian Defence Forces during my conscript service.
        It is built with JavaFX and later ported to WPF.
      </p>
      <p>
        Registrations can be conducted manually by searching the table or by using an Estonian ID-card.
        Multiple card readers can be used to speed up the process.
      </p>
      <p>
        App is designed to function offline. Registrations can happen in multiple locations at the same time.
        Exported lists can be merged together afterwards.
      </p>
    </>,
    hero: (
      <iframe key="youtubeDemo" className={`
        aspect-video w-full mx-auto
      `}
        src="https://www.youtube-nocookie.com/embed/syDuKJNU7PU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
      </iframe>
    ),
    imagesVideos: [
      <iframe key="youtubeDemo" className={`
        aspect-video w-full mx-auto
      `}
        src="https://www.youtube-nocookie.com/embed/syDuKJNU7PU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
      </iframe>,
      <Image key="mainPage" className="rounded" src={imgIsikregCardRegister} alt="Personnel Registration Application smartcard registration successful" />,
      <Image key="cardRegister" className="rounded" src={imgIsikregInsertPerson} alt="Personnel Registration Application insert new person" />,
      <Image key="insertPerson" className="rounded" src={imgIsikregMain} alt="Personnel Registration Application initial view" />
    ],
    tags: [
      'Java', 'C#', 'PC/SC', 'JavaFX', 'WPF', 'XAML', 'Excel'
    ]
  }
];