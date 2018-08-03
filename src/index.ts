const noPromise = [
  "pauseVoice",
  "stopVoice",
  "clearStorage",
  "hideToast",
  "hideLoading",
  "showNavigationBarLoading",
  "hideNavigationBarLoading",
  "navigateTo",
  "redirecTo",
  "stopPullDownRefresh",
  "setNavigationBarTitle",
  "setStorage"
];

/**
 * 忽略返回值的方法
 */
const hasUselessReturn = ["request", "showModal"];

export interface IUserInfoResponse extends wx.UserInfoResponse {
  iv: string;
  encryptedData: string;
}

export interface ISystemInfo extends wx.SystemInfo {
  // 系统版本
  system: string;
  // 平台
  platform?: string;
}

export interface IToastOptions {
  icon: "success" | "loading" | "none";
  /**
   * 提示的内容
   */
  title: string;
  /**
   * 自定义图标的本地路径，image 的优先级高于 icon
   */
  image?: string;
  /**
   * 提示的延迟时间，单位毫秒，默认：1500
   */
  duration?: number;
  /**
   * 是否显示透明蒙层，防止触摸穿透，默认：false
   */
  mask?: boolean;
}

interface BackgroundAudioManager {
  /** 当前音频的长度（单位：s），只有在当前有合法的 src 时返回 */
  readonly duration: number;
  /** 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回 */
  readonly currentTime: number;
  /** 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放 */
  readonly paused: boolean;
  /** 音频的数据源，默认为空字符串，当设置了新的 src 时，会自动开始播放 ，目前支持的格式有 m4a, aac, mp3, wav */
  src: string;
  /** 音频开始播放的位置（单位：s） */
  startTime: number;
  /** 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。 是 */
  buffered: number;
  /** 音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。 */
  title: string;
  /** 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值 */
  epname: string;
  /** 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值 */
  singer: string;
  /** 封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。 */
  coverImgUrl: string;
  /** 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值 */
  webUrl: string;
  /** 播放 */
  play(): void;
  /** 暂停 */
  pause(): void;
  /** 停止 */
  stop(): void;
  /** 跳转到指定位置，单位 s */
  seek(position: number): void;
  /** 背景音频进入可以播放状态，但不保证后面可以流畅播放 */
  onCanplay(callback?: () => void): void;
  /** 背景音频播放事件 */
  onPlay(callback?: () => void): void;
  /** 背景音频暂停事件 */
  onPause(callback?: () => void): void;
  /** 背景音频停止事件 */
  onStop(callback?: () => void): void;
  /** 背景音频自然播放结束事件 */
  onEnded(callback?: () => void): void;
  /** 背景音频播放进度更新事件 */
  onTimeUpdate(callback?: () => void): void;
  /** 用户在系统音乐播放面板点击上一曲事件（iOS only） */
  onPrev(callback?: () => void): void;
  /** 用户在系统音乐播放面板点击下一曲事件（iOS only） */
  onNext(callback?: () => void): void;
  /** 背景音频播放错误事件 */
  onError(callback?: (e) => void): void;
  /** 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发 */
  onWaiting(callback?: () => void): void;
}

interface GetUserInfoOptions {
  // 是否带上登录态信息
  withCredentials?: boolean;
  // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en
  lang?: string;
  // 超时时间，单位 ms
  timeout?: number;
}

interface IMpApis {
  /**
   * wx.request发起的是https请求。一个微信小程序，同时只能有5个网络请求连接。
   */
  request(options: wx.RequestOptions): Promise<wx.DataResponse>;

  uploadFile(options: wx.UploadFileOptions): Promise<wx.UploadTask>;

  chooseImage(options: wx.ChooseImageOptions): wx.TempFilesData;

  createAnimation(options: wx.CreateAnimationOptions): wx.Animation;

  getUserInfo(options?: GetUserInfoOptions): Promise<IUserInfoResponse>;

  login(option?: wx.LoginOptions): Promise<wx.LoginResponse>;

  createInnerAudioContext(): wx.InnerAudioContext;

  navigateTo(options: wx.NavigateToOptions): void;

  redirectTo(options: wx.RedirectToOptions): void;

  navigateBack(option?: wx.NavigateBackOptions): void;

  stopPullDownRefresh(options?: wx.BaseOptions): void;

  setNavigationBarTitle(option: wx.SetNavigationBarTitleOptions): Promise<void>;

  setStorage(options: wx.SetStorageOptions): void;

  getStorage(options: Partial<wx.GetStorageOptions>): Promise<wx.DataResponse>;

  getSystemInfo(): Promise<ISystemInfo>;

  requestPayment(
    options: wx.RequestPaymentOptions
  ): Promise<{ errMsg: string }>;

  showModal(
    options: wx.ModalOptions
  ): Promise<{
    /**
     * 为 true 时，表示用户点击了确定按钮
     */
    confirm: boolean;
    /**
     * 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
     */
    cancel: boolean;
  }>;

  showToast(options: IToastOptions): Promise<void>;

  hideToast(): void;

  playBackgroundAudio(options: wx.PlayBackgroundAudioOptions): Promise<void>;

  getBackgroundAudioManager(): BackgroundAudioManager;

  startPullDownRefresh();
  stopPullDownRefresh();

  showActionSheet(
    options: wx.ActionSheetOptions
  ): Promise<{
    /**
     * 用户点击的按钮，从上到下的顺序，从0开始
     */
    tapIndex: number;
  }>;

  switchTab(options: wx.SwitchTabOptions): Promise<void>;

  reLaunch(options: wx.ReLaunchOptions): void;

  showLoading(options: wx.LoadingOptions): Promise<any>;

  hideLoading(): Promise<void>;

  createVideoContext(id: string): wx.VideoContext;

  createSelectorQuery(): wx.SelectorQuery;

  createIntersectionObserver(): any;

  pageScrollTo(options: wx.PageScrollToOptions): void;
}

let box = {};
try {
  box = tt;
} catch (e) {}
try {
  box = wx;
} catch (e) {}

const apis = Object.keys(box).reduce((api, functionName) => {
  if (
    functionName.slice(0, 2) === "on" ||
    functionName.indexOf("Sync") > -1 ||
    functionName.indexOf("create") > -1 ||
    noPromise.indexOf(functionName) > -1
  ) {
    api[functionName] = box[functionName];
  } else {
    api[functionName] = (options = {} as any) =>
      new Promise((resolve, reject) => {
        if (!options.success) {
          options.success = data => {
            resolve(data);
          };
        }
        if (!options.fail) {
          options.fail = data => {
            reject(data);
          };
        }
        if (!options.complete) {
          options.complete = data => {
            resolve(data);
          };
        }
        const ret = box[functionName](options);

        /**
         * 有的promise方法会返回一些没用的值
         */
        if (ret && hasUselessReturn.indexOf(functionName) === -1) {
          resolve(ret);
        }
      });
  }
  return api;
}, {}) as IMpApis;

export default apis;
