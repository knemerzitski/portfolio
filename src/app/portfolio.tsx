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
      When I was a teenager, played a lot of multiplayer games.
      I got curious how they work so I set up game servers just for fun.
      I wanted to make changes which eventually led me into programming.
    </p>

    <p>
      I love writing code and seeing it work.
      It&apos;s motivating knowing that something I have worked on is being used.
    </p>

    <p>
      Outside of technology, I like to exercise and play tennis. Also, bunnies are adorable!
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
          <small className="absolute text-xs hidden xxs:block">(Source not available)</small>
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
      Specialized WordPress plugin that accelerates client communication.
      Easily request for a sauna project offer from predefined templates.
    </p>,
    desc: <>
      <p>
        Saunahouse Configurator is a Wordpress plugin that accelerates client communication.
      </p>
      <p>
        In essence it&apos;s a customized request form with predefined templates.
        Templates can be combined to create a dynamic form with similar content.
        There is also an admin panel to manage form templates, requests, email templates and settings.
      </p>
      <p>
        I chose to develop the app in Vue because I wanted to learn reactive web development and component based architecture.
        In WordPress environment it was a more flexible option compared to multiple pages communicating over GET requests.
      </p>
    </>,
    hero: (
      <Image key="mainPage" className={`
        object-cover object-top w-full h-full rounded
      `}
        sizes="(max-width: 768px) 100vw, 512px"
        src={imgShCnfMain} alt="Saunahouse Configurator main page" />
    ),
    tags: [
      'Vue', 'Javascript', 'HTML', 'Sass', 'PHP',
      'WordPress', 'SQL', 'Webpack', 'REST API',
      'reCAPTCHA v3', 'Email'
    ],
    categories: [
      {
        title: 'Screenshots',
        list: [
          <Image key="main" className="rounded" sizes="1024px" src={imgShCnfMain} alt="Saunahouse Configurator main page" />,
          <Image key="facade" className="rounded" sizes="1024px" src={imgShCnfFacade} alt="Saunahouse Configurator facade selection" />,
          <Image key="gallery" className="rounded" sizes="1024px" src={imgShCnfGallery} alt="Saunahouse Configurator gallery of selection" />,
          <Image key="overview" className="rounded" sizes="1024px" src={imgShCnfOverview} alt="Saunahouse Configurator saved overview" />
        ]
      }
    ],
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
      App that enables quick registration of personnel using multiple card readers.
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
        It was made with JavaFX and later ported to WPF.
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
    categories: [
      {
        title: 'Short Demo',
        list: [
          <iframe key="youtubeDemo" className={`
        aspect-video w-full mx-auto
      `}
            src="https://www.youtube-nocookie.com/embed/syDuKJNU7PU"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
          </iframe>,
        ]
      },
      {
        title: 'Screenshots',
        list: [
          <Image key="mainPage" className="rounded" sizes="1024px" src={imgIsikregCardRegister} alt="Personnel Registration Application smartcard registration successful" />,
          <Image key="cardRegister" className="rounded" sizes="1024px" src={imgIsikregInsertPerson} alt="Personnel Registration Application insert new person" />,
          <Image key="insertPerson" className="rounded" sizes=" 1024px" src={imgIsikregMain} alt="Personnel Registration Application initial view" />
        ]
      }
    ],
    tags: [
      'Java', 'C#', 'PC/SC', 'JavaFX', 'WPF', 'XAML', 'Excel'
    ]
  }
];