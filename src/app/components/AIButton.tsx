'use client';
import { useState } from 'react';
import { Variants, motion } from 'framer-motion';
import classNames from 'classnames';

export const RANDOM = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

type Props = {
  label?: string;
  hueValue?: number;
  className?: string;
  isLoading?: boolean;
};

export default function AIButton({
  label = 'Ask AI',
  hueValue = 0,
  className,
  isLoading,
}: Props) {
  const [hover, setHover] = useState(false);

  return (
    <motion.button
      initial="initial"
      animate={hover ? 'animate' : 'initial'}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      type="submit"
      disabled={isLoading}
      className={classNames(
        'relative text-lg font-semibold flex items-center justify-center space-x-2 border-none px-3 py-2 cursor-pointer rounded-xl shrink-0 select-none',
        '[&>svg]:[inline-size:1.3rem] [&>svg]:overflow-visible',
        {
          'opacity-50 pointer-events-none cursor-wait': isLoading,
        },
        className,
      )}
      variants={buttonAnimation}
      style={{ filter: `hue-rotate(${hueValue}deg)` }}
    >
      <motion.div
        className={
          'absolute inset-0 overflow-hidden -z-[1] pt-[2px] rounded-xl highlight-container-mask'
        }
        variants={highlightContainerAnimation}
      >
        <motion.div
          className="absolute top-0 left-1/2 w-[200%] bg-[conic-gradient(from_0deg,_transparent_0_130deg,_white_360deg)] -translate-x-[50%] -translate-y-1/2 aspect-square rounded-xl -z-[1] highlight-mask"
          variants={highlightAnimation}
        ></motion.div>
      </motion.div>
      <motion.svg
        variants={svgAnimation}
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={pathAnimation}
          custom={1}
          d="M6.657 1.247C6.767 0.917 7.233 0.917 7.343 1.247L7.988 3.184C8.12997 3.6098 8.36917 3.99668 8.68664 4.31398C9.00411 4.63127 9.39112 4.87026 9.817 5.012L11.753 5.657C12.083 5.767 12.083 6.233 11.753 6.343L9.816 6.988C9.3902 7.12997 9.00332 7.36917 8.68602 7.68664C8.36873 8.00411 8.12974 8.39112 7.988 8.817L7.343 10.753C7.31929 10.8253 7.27335 10.8882 7.21176 10.9328C7.15016 10.9774 7.07605 11.0014 7 11.0014C6.92395 11.0014 6.84984 10.9774 6.78824 10.9328C6.72665 10.8882 6.68072 10.8253 6.657 10.753L6.012 8.816C5.87013 8.39031 5.63108 8.00349 5.31379 7.68621C4.99651 7.36892 4.60969 7.12987 4.184 6.988L2.247 6.343C2.17474 6.31928 2.11181 6.27335 2.0672 6.21176C2.02259 6.15016 1.99857 6.07605 1.99857 6C1.99857 5.92395 2.02259 5.84983 2.0672 5.78824C2.11181 5.72665 2.17474 5.68072 2.247 5.657L4.184 5.012C4.60969 4.87013 4.99651 4.63108 5.31379 4.31379C5.63108 3.99651 5.87013 3.60969 6.012 3.184L6.657 1.247Z"
        />
        <motion.path
          variants={pathAnimation}
          custom={2}
          d="M2.39415 8.03423C2.36334 8.05648 2.34032 8.08788 2.32838 8.12396L2.00596 9.09204C1.93505 9.30488 1.81554 9.49828 1.65691 9.65691C1.49828 9.81554 1.30488 9.93505 1.09204 10.006L0.123957 10.3284C0.0878781 10.3403 0.0564822 10.3633 0.0342297 10.3941C0.0119772 10.425 0 10.462 0 10.5C0 10.538 0.0119772 10.575 0.0342297 10.6059C0.0564822 10.6367 0.0878781 10.6597 0.123957 10.6716L1.09204 10.994C1.30488 11.0649 1.49828 11.1845 1.65691 11.3431C1.81554 11.5017 1.93505 11.6951 2.00596 11.908L2.32838 12.876C2.34032 12.9121 2.36334 12.9435 2.39415 12.9658C2.42496 12.988 2.46199 13 2.5 13C2.538 13 2.57504 12.988 2.60585 12.9658C2.63666 12.9435 2.65967 12.9121 2.67162 12.876L2.99404 11.908C3.06495 11.6951 3.18446 11.5017 3.34309 11.3431C3.50172 11.1845 3.69512 11.0649 3.90796 10.994L4.87604 10.6716C4.91212 10.6597 4.94352 10.6367 4.96577 10.6059C4.98802 10.575 5 10.538 5 10.5C5 10.462 4.98802 10.425 4.96577 10.3941C4.94352 10.3633 4.91212 10.3403 4.87604 10.3284L3.90796 10.006C3.47641 9.86183 3.13817 9.52359 2.99404 9.09204L2.67162 8.12396C2.65967 8.08788 2.63666 8.05648 2.60585 8.03423C2.57504 8.01198 2.538 8 2.5 8C2.46199 8 2.42496 8.01198 2.39415 8.03423Z"
        />
        <motion.path
          variants={pathAnimation}
          custom={3}
          d="M2.4365 0.0201631C2.41807 0.0332787 2.40418 0.0518105 2.39677 0.0731818L2.20383 0.654117C2.11749 0.913811 1.91404 1.11721 1.65428 1.20353L1.0732 1.39717C1.05182 1.40458 1.03329 1.41847 1.02017 1.4369C1.00705 1.45532 1 1.47738 1 1.5C1 1.52262 1.00705 1.54468 1.02017 1.5631C1.03329 1.58153 1.05182 1.59542 1.0732 1.60283L1.65353 1.79647C1.78154 1.83905 1.89786 1.91087 1.99326 2.00624C2.08865 2.10161 2.16049 2.2179 2.20308 2.34588L2.39677 2.92682C2.40418 2.94819 2.41807 2.96672 2.4365 2.97984C2.45494 2.99295 2.477 3 2.49962 3C2.52225 3 2.54431 2.99295 2.56275 2.97984C2.58118 2.96672 2.59507 2.94819 2.60248 2.92682L2.79617 2.34588C2.83876 2.2179 2.9106 2.10161 3.00599 2.00624C3.10139 1.91087 3.21771 1.83905 3.34572 1.79647L3.9268 1.60283C3.94818 1.59542 3.96671 1.58153 3.97983 1.5631C3.99295 1.54468 4 1.52262 4 1.5C4 1.47738 3.99295 1.45532 3.97983 1.4369C3.96671 1.41847 3.94818 1.40458 3.9268 1.39717L3.34572 1.20353C3.08596 1.11721 2.88251 0.913811 2.79617 0.654117L2.60248 0.0731818C2.59507 0.0518105 2.58118 0.0332787 2.56275 0.0201631C2.54431 0.00704757 2.52225 0 2.49962 0C2.477 0 2.45494 0.00704757 2.4365 0.0201631Z"
        />
      </motion.svg>
      <motion.span variants={labelAnimation}>{label}</motion.span>
    </motion.button>
  );
}

export const buttonAnimation: Variants = {
  initial: {
    background:
      'radial-gradient(70% 90% at 50% 100%, rgb(31, 30, 31) 0%, rgb(31, 30, 31) 100%)',
    boxShadow: '0 0 0rem 0rem rgba(66, 18, 161, 0)',
    transition: {
      ease: [0.33, 1, 0.68, 1],
      duration: 0.3,
    },
  },
  animate: {
    background:
      'radial-gradient(70% 100% at 50% 110%, #b37afd 0%, rgb(77, 19, 212) 100%)',
    boxShadow:
      '0 0 20rem rem rgba(65, 18, 161, 1), 0 2px 0 0 rgb(120, 54, 250) inset, 0 -2px 0 0 rgb(86, 4, 250) inset',
    transition: {
      type: 'spring',
      bounce: 0.25,
      duration: 0.5,
    },
  },
};

export const labelAnimation: Variants = {
  initial: {
    background:
      'linear-gradient(90deg, rgb(117, 117, 117) 0%, rgb(80, 78, 80) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: {
      ease: [0.33, 1, 0.68, 1],
      duration: 0.5,
    },
  },
  animate: {
    background:
      'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
    transition: {
      ease: [0.33, 1, 0.68, 1],
      duration: 1,
    },
  },
};

export const svgAnimation: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1,
    },
  },
};

export const pathAnimation: Variants = {
  initial: (i: number) => ({
    fill: 'rgb(255, 255, 255)',
    opacity: (3 - i + 1) / 4,
    transition: {
      duration: 0.6,
    },
  }),
  animate: (i: number) => ({
    opacity: [null, 0.5, 1, i === 1 ? 1 : (3 - i + 1) / 4],
    scale: [null, 0.5, 1.3, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 2.2,
    },
  }),
};

export const highlightContainerAnimation: Variants = {
  initial: {
    scaleY: 1,
    scaleX: 1,
    transition: {
      ease: 'linear',
      duration: 0.001,
    },
  },
  animate: {
    scaleY: [null, -1],
    scaleX: [null, -1],
    transition: {
      ease: 'linear',
      duration: 0.001,
      delay: 1.3,
      repeatDelay: 1.3,
      repeatType: 'reverse',
      repeat: Infinity,
    },
  },
};

export const highlightAnimation: Variants = {
  initial: {
    rotateZ: -65,
    transition: { ease: 'linear', duration: 0.001 },
  },
  animate: {
    rotateZ: [null, 65],
    transition: {
      ease: [0.5, 1, 0.89, 1],
      duration: 1.3,
      repeat: Infinity,
    },
  },
};
