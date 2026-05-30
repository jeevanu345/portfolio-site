import type { NextPage } from 'next';
import { Anchor } from '../components/CustomHtml';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContext, useEffect, useState, memo } from 'react';
import { ProjectListContext } from '../context';
import { fetchProjectsStar } from '../helpers/helpers';
import { useRouter } from 'next/router';
import { Separator } from '@/components/ui/separator';
import ReactGA from 'react-ga4';
import dynamic from 'next/dynamic';

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
if (TRACKING_ID) ReactGA.initialize(TRACKING_ID);

// Memoized components for performance - defined first
const LoadingSpinner = memo(() => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
));
LoadingSpinner.displayName = 'LoadingSpinner';

// Dynamic imports for performance (client-side only)
const ProjectCard = dynamic(() => import('../components/ProjectCard'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const EmailBox = dynamic(() => import('../components/EmailBox'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const GitHubStats = dynamic(() => import('../components/GitHubStats'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const skillsData = {
  languages: ['C++', 'Python', 'C', 'Java', 'JavaScript', 'HTML/CSS'],
  frameworks: [
    'React.js',
    'Node.js',
    'Express.js',
    'Tailwind CSS',
    'MySQL',
    'MongoDB',
    'Jupyter Notebook',
    'Framer Motion',
  ],
  cloudDevOps: [
    'AWS (EC2, S3, IAM)',
    'Linux',
    'Docker',
    'Kubernetes',
    'DNS',
    'HTTP',
    'TCP/IP',
  ],
  dataScience: [
    'Pandas',
    'NumPy',
    'Scikit-learn',
    'Matplotlib',
    'Seaborn',
    'Machine Learning',
    'Feature Engineering',
  ],
};

const SkillCategory = memo(
  ({
    title,
    skills,
  }: {
    title: string;
    skills: string[];
  }) => (
    <div className="mb-4">
      <div className="text-sm font-medium text-primary mb-2">{title}</div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  )
);
SkillCategory.displayName = 'SkillCategory';

const Home: NextPage = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);
  const [top6Projects, setTop6Projects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const clientRouter = useRouter();

  useEffect(() => {
    setTop6Projects(
      projectList.sort((a, b) => b.priority - a.priority).slice(0, 6)
    );
  }, [projectList]);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/', title: 'Home' });

    fetchProjectsStar()
      .then((updatedProjectsListWithStars) => {
        setProjectList([...updatedProjectsListWithStars]);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [setProjectList]);

  const handleLinkClick = (action: string) => {
    ReactGA.event({
      category: 'Link.Click',
      action,
    });
  };

  return (
    <div className="relative my-10 sm:my-20">
      {/* Hero Section */}
      <div className="mt-10 sm:mt-20 flex">
        <div className="">
          <div className="text-4xl md:text-5xl font-medium">
            <div className="">Hey, I'm Jeevan U Gowda</div>
            <div className="mt-4">
              <span className="hidden sm:inline-block mr-4">I'm a </span>
              <span className="text-primary">Full-Stack Developer & AI/ML Enthusiast</span>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <GitHubStats username="jeevanu345" />
          </div>
          <div className="text-muted-foreground font-light space-y-1 mt-8">
            <p className="">
              I'm a developer based in{' '}
              <Anchor
                href="https://www.google.com/maps/place/Bengaluru+Karnataka"
                target={'_blank'}
                onClick={() => handleLinkClick('Bengaluru Location')}
              >
                Bengaluru, India
              </Anchor>
              , currently pursuing my Bachelor of Engineering in Information
              Science at B.M.S College of Engineering. I'm passionate about
              building{' '}
              <Anchor
                href="https://github.com/jeevanu345"
                onClick={() => handleLinkClick('GitHub Link')}
                target={'_blank'}
              >
                impactful projects
              </Anchor>
              {' '}that span full-stack development, AI/ML, distributed systems,
              and IoT.
            </p>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mt-20 sm:mt-32">
        <div className="flex justify-between mb-6 items-center">
          <div className="text-4xl sm:text-5xl font-medium">Education</div>
          <Button
            variant="outline"
            onClick={() => clientRouter.push('/resume')}
          >
            View Resume
          </Button>
        </div>
        <Separator className="my-4" />

        <div className="flex justify-between flex-col lg:flex-row">
          <div className="text-4xl xl:text-5xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-muted-foreground font-light">
            Aug '22 - Jun '26
          </div>
          <div className="flex flex-col justify-between sm:w-[500px]">
            <div className="text-muted-foreground font-light">
              B.E. in Information Science & Engineering
            </div>
            <div className="text-lg sm:text-xl">
              <Anchor
                href="https://www.google.com/search?q=bms+college+of+engineering+bengaluru"
                onClick={() => handleLinkClick('BMSCE Link')}
              >
                B.M.S College of Engineering, VTU
              </Anchor>
              {' '}— Bengaluru
            </div>
            <div className="text-light text-muted-foreground mt-2 space-y-1">
              <p>
                <span className="font-medium text-foreground">GPA:</span> 8.23/10.0
                {' | '}
                <span className="font-medium text-foreground">Expected Graduation:</span> July 2026
              </p>
              <p>
                <span className="font-medium text-foreground">Relevant Coursework:</span> Data Structures & Algorithms, OOPs, DBMS, Operating Systems, Networks, Software Engineering, Machine Learning
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* 12th & 10th Grade */}
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="text-4xl xl:text-5xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-muted-foreground font-light">
            School
          </div>
          <div className="flex flex-col justify-between sm:w-[500px]">
            <div className="text-light text-muted-foreground space-y-2">
              <p>
                <span className="font-medium text-foreground">12th Grade</span> (Karnataka State Board) — 90%{' '}
                <span className="text-muted-foreground">| Apr 2021 – Jun 2022</span>
              </p>
              <p>
                <span className="font-medium text-foreground">10th Grade</span> (CBSE Board) — 90%{' '}
                <span className="text-muted-foreground">| 2019 – 2020</span>
              </p>
            </div>
          </div>
        </div>
        <Separator className="my-4" />

        {/* Research Papers */}
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="text-4xl xl:text-5xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-muted-foreground font-light">
            Apr '25
          </div>
          <div className="flex flex-col justify-between sm:w-[500px]">
            <div className="text-muted-foreground font-light">Research Paper</div>
            <div className="text-lg sm:text-xl">
              TapCart: NFC-Based Payment Interface
            </div>
            <div className="text-light text-muted-foreground mt-2">
              Proposed secure NFC-based merchant payment architecture for contactless transactions without extra hardware.
            </div>
          </div>
        </div>
      </div>

      {/* Technical Skills Section */}
      <div className="mt-20 sm:mt-32">
        <div className="text-4xl sm:text-5xl font-medium mb-6">
          Technical Skills
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
          <SkillCategory title="Languages" skills={skillsData.languages} />
          <SkillCategory title="Frameworks & Tools" skills={skillsData.frameworks} />
          <SkillCategory title="Cloud / DevOps" skills={skillsData.cloudDevOps} />
          <SkillCategory title="Data Science & ML" skills={skillsData.dataScience} />
        </div>
      </div>

      {/* Projects Section */}
      <div className="mt-20 sm:mt-32">
        <div className="flex justify-between mb-10 items-center">
          <div className="text-4xl sm:text-5xl font-medium">Projects</div>
          <Button
            variant="outline"
            onClick={() => clientRouter.push('/projects')}
          >
            View all
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            top6Projects.map((project: any, i) => (
              <ProjectCard key={`${project.title}-${i}`} {...project} />
            ))
          )}
        </div>
      </div>

      {/* About Me Section */}
      <div className="mt-20 sm:mt-32">
        <div className="text-4xl sm:text-5xl font-medium mb-6">About Me</div>
        <Separator className="my-4" />
        <div className="text-muted-foreground font-light space-y-3 mt-4">
          <p>
            I'm a responsible, organized, and hardworking individual passionate about technology, innovation, and problem-solving. I enjoy working at the intersection of software engineering and emerging technologies.
          </p>
          <p>
            <span className="font-medium text-foreground">Soft Skills:</span> Communication, Critical Thinking, Analytical Problem Solving
          </p>
          <p>
            <span className="font-medium text-foreground">Languages:</span> English (Fluent), Hindi (Fluent), Kannada (Native)
          </p>
          <p>
            <span className="font-medium text-foreground">Extracurriculars:</span> Vocalist, Guitarist, Football
          </p>
        </div>

        <div
          onClick={() => {
            handleLinkClick('LinkedIn Link');
            window.open('https://www.linkedin.com/in/jeevanu345/', '_blank');
          }}
          className="text-muted-foreground underline hover:text-ring cursor-pointer mt-6"
        >
          Connect with me on LinkedIn
          {' ->'}
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-20 sm:mt-32">
        <div className="text-4xl sm:text-5xl font-medium">Contact Me</div>
        <div className="font-light text-muted-foreground mt-4 mb-10">
          I'm always open to new opportunities and collaborations. Feel free to
          reach out to me at{' '}
          <Anchor
            onClick={() => handleLinkClick('MailTo Link')}
            href="mailto:jeevanu345@gmail.com"
          >
            jeevanu345@gmail.com
          </Anchor>
          !
        </div>
        <EmailBox />
      </div>
    </div>
  );
};

export default memo(Home);
