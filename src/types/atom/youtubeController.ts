export interface YoutubeControllerType {
  playerInstance: YT.Player | null,
  playList: string[];
  currentDuration: number,
  currentPlayingIndex: number;
  volume: number;
  isPlaying: boolean;
  loopState: 'all' | 'once' | 'none';
}

export type UpdatePlayerInstanceType = { ref: YT.Player }

export type UpdatePlaylistActionType =
  | { action: 'add'; songVid: string }
  | { action: 'remove'; songVid: string }
  | { action: 'insert'; songVid: string; index: number }
  | { action: 'change'; songVid: string; index: number }
  | { action: 'reset' };

export type UpdatePlayingStateType = { action: 'start' | 'stop' | 'toggle' };

export type UpdateLoopStateType = {
  action: YoutubeControllerType['loopState'];
};

