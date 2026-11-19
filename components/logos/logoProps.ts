export type LogoProps = {
  className?: string;
  /** For when className is not available, like in opengraph images */
  style?: React.CSSProperties;
  /** For when className is not available, like in opengraph images */
  fill?: string;
};

export type ProjectLogoCombinationProps = LogoProps & {
  /** Black Nebula logo and royal project logo */
  duotone?: boolean;
  slotProps?: {
    nebulaLogo?: LogoProps;
    projectLogo?: LogoProps;
  };
};
