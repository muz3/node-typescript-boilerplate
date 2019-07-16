import 'react-map-gl';

declare module 'react-map-gl' {
  // According to https://github.com/uber/react-map-gl/pull/614
  // ViewState actually has width/height when triggered by
  // onViewportChange, so adding them to the types so we can still have
  // the correct typing
  export interface ViewState {
    width?: string | number;
    height?: string | number;
  }
}
