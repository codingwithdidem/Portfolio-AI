import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import React, { FC } from 'react';
import SocialLink from './SocialLink';

const socials = [
  {
    label: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/DidemKkkaraasl1',
  },
  {
    label: 'Youtube',
    icon: Youtube,
    href: 'https://www.youtube.com/@codingwithdidem',
  },
  {
    label: 'Github',
    icon: Github,
    href: 'https://www.github.com/codingwithdidem',
  },
  {
    label: 'Linkedin',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/didem-k%C3%BCc%C3%BCkkaraaslan-2a2a23140/',
  },
];

type FooterProps = {
  children?: React.ReactNode;
};

const Footer: FC<FooterProps> = (props) => {
  return (
    <footer className="flex items-center justify-between max-w-3xl mx-auto px-4 w-full h-20 mt-auto">
      <span className="text-sm text-slate-500">
        ©{new Date().getFullYear()} Didem Küçükkaraaslan.
      </span>
      <div className="flex items-center space-x-4">
        {socials.map((social) => (
          <SocialLink
            key={social.label}
            icon={social.icon}
            href={social.href}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
