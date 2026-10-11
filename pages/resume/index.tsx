import type { NextPage } from 'next';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const Resume: NextPage = () => {
  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: 'pageview', page: '/resume', title: 'Resume' });
  }, []);

  return null;
};

export default Resume;
