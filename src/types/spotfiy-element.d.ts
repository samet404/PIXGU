declare namespace JSX {
  interface IntrinsicElements {
    'spotify-audio': React.DetailedHTMLProps<
      React.AudioHTMLAttributes<HTMLAudioElement>,
      HTMLAudioElement
    >
  }
}
