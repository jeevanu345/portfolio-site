import { ProjectCardProps } from '../components/ProjectCard';
import projectsData from '../data/projects.json';

export const unixToDate = (unix: number): string => {
  const blogDate = new Date(unix * 1000);

  const blogDateDay = blogDate.getDate();
  const dayName = blogDate.toLocaleString('default', { weekday: 'long' });
  const monthName = blogDate.toLocaleString('default', { month: 'long' });
  const year = blogDate.getFullYear();

  return `${dayName}, ${monthName} ${blogDateDay} ${year}`;
};

export const fetchProjectsStar = async () => {
  const tempProjectList: ProjectCardProps[] = projectsData;
  const apiCallUrls = [];
  for (let i = 0; i < tempProjectList.length; i++) {
    const project = tempProjectList[i];
    const repoUrl =
      'https://api.github.com/repos/' +
      project.github_url.split('/').slice(-2).join('/');
    apiCallUrls.push('/api/fetchStars?repoUrl=' + repoUrl);
  }
  const res = await Promise.all(
    apiCallUrls.map(url => fetch(url).then(res => res.json()))
  );
  res.forEach((data, i) => {
    const html_url = data.html_url;
    const stars = data.stars;
    tempProjectList.map(project => {
      if (project.github_url == html_url) {
        project.stars = stars;
      }
      return project;
    });
  });
  return tempProjectList;
};

export const badgeImage: {
  [badge: string]: string;
} = {
  d3: 'https://img.shields.io/badge/d3-%23F9A03C.svg?style=flat-square&logo=d3.js&logoColor=white',
  javascript:
    'https://img.shields.io/badge/javascript-%23323330.svg?style=flat-square&logo=javascript&logoColor=%23F7DF1E',
  'chakra ui':
    'https://img.shields.io/badge/Chakra_UI-%233197C6.svg?style=flat-square&logo=chakra-ui&logoColor=white',
  react:
    'https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB',
  flask:
    'https://img.shields.io/badge/flask-%23000.svg?style=flat-square&logo=flask&logoColor=white',
  azure:
    'https://img.shields.io/badge/azure-%230072C6.svg?style=flat-square&logo=azure-devops&logoColor=white',
  postgre:
    'https://img.shields.io/badge/PostgreSQL-%23336791.svg?style=flat-square&logo=postgresql&logoColor=white',
  express:
    'https://img.shields.io/badge/Express.js-%23404d59.svg?style=flat-square',
  mongodb:
    'https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat-square&logo=mongodb&logoColor=white',
  docker:
    'https://img.shields.io/badge/docker-%230db7ed.svg?style=flat-square&logo=docker&logoColor=white',
  aws: 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat-square&logo=amazon-aws&logoColor=white',
  'next.js':
    'https://img.shields.io/badge/next.js-%23000000.svg?style=flat-square&logo=nextdotjs&logoColor=white',
  'tailwind css':
    'https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white',
  vercel:
    'https://img.shields.io/badge/vercel-%23000000.svg?style=flat-square&logo=vercel&logoColor=white',
  tensorflow:
    'https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=flat-square&logo=TensorFlow&logoColor=white',
  firebase:
    'https://img.shields.io/badge/firebase-%23039BE5.svg?style=flat-square&logo=firebase',
  scss: 'https://img.shields.io/badge/Sass-%23CC6699.svg?style=flat-square&logo=sass&logoColor=white',
  auth0:
    'https://img.shields.io/badge/auth0-%230B0D17.svg?style=flat-square&logo=auth0&logoColor=white',
  'chrome extension':
    'https://img.shields.io/badge/Chrome_Extensions-%23F1502F.svg?style=flat-square&logo=google-chrome&logoColor=white',
  flutter:
    'https://img.shields.io/badge/Flutter-%2302569B.svg?style=flat-square&logo=Flutter&logoColor=white',
  dart: 'https://img.shields.io/badge/Dart-%230175C2.svg?style=flat-square&logo=dart&logoColor=white',
  'firebase authentication':
    'https://img.shields.io/badge/firebase_auth-%23039BE5.svg?style=flat-square&logo=firebase&logoColor=white',
  firestore:
    'https://img.shields.io/badge/Cloud_Firestore-%234FC3F7.svg?style=flat-square&logo=firebase&logoColor=white',
  'react native':
    'https://img.shields.io/badge/React_Native-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB',
  expo: 'https://img.shields.io/badge/Expo-%23000020.svg?style=flat-square&logo=expo&logoColor=white',
  webpack:
    'https://img.shields.io/badge/Webpack-%238DD6F9.svg?style=flat-square&logo=webpack&logoColor=black',
  python:
    'https://img.shields.io/badge/Python-%2314354C.svg?style=flat-square&logo=python&logoColor=white',
  django:
    'https://img.shields.io/badge/Django-%23092E20.svg?style=flat-square&logo=django&logoColor=white',
  'codeforces api':
    'https://img.shields.io/badge/Codeforces-%23F34428.svg?style=flat-square&logo=Codeforces&logoColor=white',
  java: 'https://img.shields.io/badge/Java-%23ED8B00.svg?style=flat-square&logo=java&logoColor=white',
  opencv:
    'https://img.shields.io/badge/OpenCV-%23white.svg?style=flat-square&logo=OpenCV&logoColor=white',
  tkinter:
    'https://img.shields.io/badge/tkinter-%23white.svg?style=flat-square&logo=python&logoColor=white',
  'material ui':
    'https://img.shields.io/badge/Material--UI-0081CB?style=flat-square&material-ui&logoColor=white',
  typescript:
    'https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white',
  vscode:
    'https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white',
  markdown:
    'https://img.shields.io/badge/markdown-%23000000.svg?style=flat-square&logo=markdown&logoColor=white',
  css: 'https://img.shields.io/badge/CSS-239120?style=flat-square&logo=css3&logoColor=white',
  'vscode extension':
    'https://img.shields.io/badge/VS_Code_Extension-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white',

  // ─── Jeevan's project badges ─────────────────────────────────
  rust: 'https://img.shields.io/badge/Rust-%23000000.svg?style=flat-square&logo=rust&logoColor=white',
  grpc: 'https://img.shields.io/badge/gRPC-%23244c5a.svg?style=flat-square&logo=google&logoColor=white',
  redis:
    'https://img.shields.io/badge/Redis-%23DC382D.svg?style=flat-square&logo=redis&logoColor=white',
  kubernetes:
    'https://img.shields.io/badge/Kubernetes-%23326ce5.svg?style=flat-square&logo=kubernetes&logoColor=white',
  helm: 'https://img.shields.io/badge/Helm-%230F1689.svg?style=flat-square&logo=helm&logoColor=white',
  vllm: 'https://img.shields.io/badge/vLLM-%23000000.svg?style=flat-square&logo=python&logoColor=white',
  grpo: 'https://img.shields.io/badge/GRPO-%23FF6F00.svg?style=flat-square&logo=openai&logoColor=white',
  ray: 'https://img.shields.io/badge/Ray-%23028CF0.svg?style=flat-square&logo=ray&logoColor=white',
  terraform:
    'https://img.shields.io/badge/Terraform-%23844FBA.svg?style=flat-square&logo=terraform&logoColor=white',
  streamlit:
    'https://img.shields.io/badge/Streamlit-%23FF4B4B.svg?style=flat-square&logo=streamlit&logoColor=white',
  ollama:
    'https://img.shields.io/badge/Ollama-%23000000.svg?style=flat-square&logo=ollama&logoColor=white',
  'chroma db':
    'https://img.shields.io/badge/Chroma_DB-%23000.svg?style=flat-square&logo=chromadb&logoColor=white',
  langchain:
    'https://img.shields.io/badge/LangChain-%231C3C3C.svg?style=flat-square&logo=langchain&logoColor=white',
  faiss:
    'https://img.shields.io/badge/FAISS-%230066A7.svg?style=flat-square&logo=facebook&logoColor=white',
  vite: 'https://img.shields.io/badge/Vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white',
  supabase:
    'https://img.shields.io/badge/Supabase-%233ECF8E.svg?style=flat-square&logo=supabase&logoColor=white',
  netlify:
    'https://img.shields.io/badge/Netlify-%2300C7B7.svg?style=flat-square&logo=netlify&logoColor=white',
  nfc: 'https://img.shields.io/badge/NFC-%23000000.svg?style=flat-square&logo=nfc&logoColor=white',
  iot: 'https://img.shields.io/badge/IoT-%23007ACC.svg?style=flat-square&logo=azure-iot&logoColor=white',
  'openai api':
    'https://img.shields.io/badge/OpenAI-%23412991.svg?style=flat-square&logo=openai&logoColor=white',
  'spotify api':
    'https://img.shields.io/badge/Spotify-%231ED760.svg?style=flat-square&logo=spotify&logoColor=white',
  'youtube music api':
    'https://img.shields.io/badge/YouTube_Music-%23FF0000.svg?style=flat-square&logo=youtube-music&logoColor=white',
  'cloud apis':
    'https://img.shields.io/badge/Cloud_APIs-%234285F4.svg?style=flat-square&logo=google-cloud&logoColor=white',
  biopython:
    'https://img.shields.io/badge/Biopython-%23006272.svg?style=flat-square&logo=python&logoColor=white',
  chimerax:
    'https://img.shields.io/badge/ChimeraX-%23000000.svg?style=flat-square&logo=biopython&logoColor=white',
  matplotlib:
    'https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=flat-square&logo=python&logoColor=black',
  'express.js':
    'https://img.shields.io/badge/Express.js-%23404d59.svg?style=flat-square&logo=express&logoColor=white',
  'node.js':
    'https://img.shields.io/badge/Node.js-%23339933.svg?style=flat-square&logo=nodedotjs&logoColor=white',
};

export const fetchLikes = async () => {
  const res = await fetch('/api/fetchLikes');
  const data = await res.json();
  return data;
};

export const incrementLikesTo = async (increment: number) => {
  const res = await fetch(`/api/incrementLikes?increment=${increment}`);
  const data = await res.json();
  return { data, status: res.status };
};

export const formatNumber = (number: number) => {
  // return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;

  while (number >= 10000 && suffixIndex < suffixes.length - 1) {
    number /= 10000;
    suffixIndex++;
  }

  return number + suffixes[suffixIndex];
};

export const generateRandomId = () => {
  return (Math.random() * 1000).toString(16).slice(0, 4);
};
