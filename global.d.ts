declare module '*.css' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg' {
  const svg: React.FC<React.SVGProps<SVGSVGElement>>;
  export default svg;
}
