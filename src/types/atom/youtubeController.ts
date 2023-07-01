export interface YoutubeControllerType {
  playList: string[];
  currentPlayingIndex: number;
  volume: number;
  isPlaying: boolean;
  loopState: 'all' | 'once' | 'none';
}

export type UpdatePlaylistActionType =
  | { action: 'add'; songVid: string }
  | { action: 'remove'; songVid: string }
  | { action: 'insert'; songVid: string; index: number }
  | { action: 'change'; songVid: string; index: number }
  | { action: 'reset' };

export type UpdateVolumeActionType = { volume: number };

export type UpdatePlayingStateType = { action: 'start' | 'stop' | 'toggle' };

export type UpdateLoopStateType = {
  action: YoutubeControllerType['loopState'];
};

export type UpdateCurrentPlayingType = { index: number };
