export interface YoutubeControllerType {
  playList: string[];
  volume: number;
  isPlaying: boolean;
}

export type UpdatePlaylistActionType =
  | { action: 'add'; songVid: string }
  | { action: 'remove'; songVid: string }
  | { action: 'insert'; songVid: string; index: number }
  | { action: 'change'; songVid: string; index: number }
  | { action: 'reset' };

export type UpdateVolumeActionType = { volume: number }

export type UpdatePlayingStateType = { action: 'start' | 'stop' | 'toggle' }