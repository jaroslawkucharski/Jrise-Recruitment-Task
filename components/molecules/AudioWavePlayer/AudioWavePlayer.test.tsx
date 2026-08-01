import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { messages } from "@/i18n/messages";
import { AppIntlProvider } from "@/i18n/translations";
import { renderWithIntl, t } from "@/utils/renderWithIntl";
import { AudioWavePlayer, type AudioWavePlayerProps } from "./AudioWavePlayer";

type WaveSurferHandler = (value?: number) => void;

type MockWaveSurferInstance = {
  destroy: ReturnType<typeof vi.fn>;
  on: ReturnType<typeof vi.fn>;
  playPause: ReturnType<typeof vi.fn>;
  emit: (eventName: string, value?: number) => void;
};

const createMock = vi.fn();
const getPropertyValueMock = vi.fn();
const originalUserAgent = window.navigator.userAgent;

vi.mock("wavesurfer.js", () => ({
  default: {
    create: createMock,
  },
}));

function setUserAgent(value: string) {
  Object.defineProperty(window.navigator, "userAgent", {
    configurable: true,
    value,
  });
}

function createWaveSurferInstance(): MockWaveSurferInstance {
  const handlers = new Map<string, WaveSurferHandler>();

  return {
    destroy: vi.fn(),
    on: vi.fn((eventName: string, handler: WaveSurferHandler) => {
      handlers.set(eventName, handler);
    }),
    playPause: vi.fn().mockResolvedValue(undefined),
    emit: (eventName: string, value?: number) => {
      handlers.get(eventName)?.(value);
    },
  };
}

function renderAudioPlayer(props: Partial<AudioWavePlayerProps> = {}) {
  return renderWithIntl(
    <AudioWavePlayer
      label={t("before_after_label_before")}
      src="/before.wav"
      {...props}
    />,
  );
}

describe("AudioWavePlayer", () => {
  beforeEach(() => {
    createMock.mockReset();
    getPropertyValueMock.mockReset();

    vi.spyOn(window, "getComputedStyle").mockReturnValue({
      getPropertyValue: getPropertyValueMock.mockImplementation(
        (propertyName: string) => {
          if (propertyName === "--color-neutral-400") {
            return " #7a7a7a ";
          }

          if (propertyName === "--color-brand-green") {
            return " #22ff22 ";
          }

          return "";
        },
      ),
    } as unknown as CSSStyleDeclaration);

    setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    setUserAgent(originalUserAgent);
  });

  it("creates wavesurfer, reacts to playback events and formats duration", async () => {
    const instance = createWaveSurferInstance();

    createMock.mockReturnValue(instance);

    renderAudioPlayer();

    await waitFor(() => expect(createMock).toHaveBeenCalledTimes(1));

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/before.wav",
        waveColor: "#7a7a7a",
        progressColor: "#22ff22",
        height: 46,
        dragToSeek: true,
      }),
    );

    const toggle = screen.getByTestId("audio-player-toggle");

    expect(toggle.hasAttribute("disabled")).toBe(true);
    expect(screen.getByText("00:00")).toBeDefined();

    act(() => {
      instance.emit("ready", 125);
    });

    expect(toggle.hasAttribute("disabled")).toBe(false);
    expect(screen.getByText("02:05")).toBeDefined();
    expect(
      screen.getByRole("button", {
        name: t("before_after_player_play_aria", {
          label: t("before_after_label_before"),
        }),
      }),
    ).toBeDefined();

    fireEvent.click(toggle);

    expect(instance.playPause).toHaveBeenCalledTimes(1);

    act(() => {
      instance.emit("play");
    });

    expect(
      screen.getByRole("button", {
        name: t("before_after_player_pause_aria", {
          label: t("before_after_label_before"),
        }),
      }),
    ).toBeDefined();

    act(() => {
      instance.emit("pause");
    });

    expect(
      screen.getByRole("button", {
        name: t("before_after_player_play_aria", {
          label: t("before_after_label_before"),
        }),
      }),
    ).toBeDefined();

    act(() => {
      instance.emit("play");
      instance.emit("finish");
    });

    expect(
      screen.getByRole("button", {
        name: t("before_after_player_play_aria", {
          label: t("before_after_label_before"),
        }),
      }),
    ).toBeDefined();
  });

  it("falls back to default colors, handles errors and keeps the player disabled in jsdom mode", async () => {
    const fallbackInstance = createWaveSurferInstance();

    getPropertyValueMock.mockReturnValue("");
    createMock.mockReturnValue(fallbackInstance);

    renderAudioPlayer({
      label: t("before_after_label_after"),
      src: "/after.wav",
    });

    await waitFor(() => expect(createMock).toHaveBeenCalledTimes(1));

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        waveColor: "#898e8e",
        progressColor: "#00ff00",
      }),
    );

    act(() => {
      fallbackInstance.emit("ready", 0);
      fallbackInstance.emit("play");
      fallbackInstance.emit("error");
    });

    const toggle = screen.getByTestId("audio-player-toggle");

    expect(toggle.hasAttribute("disabled")).toBe(true);
    expect(screen.getByText("00:00")).toBeDefined();
    expect(
      screen.getByRole("button", {
        name: t("before_after_player_play_aria", {
          label: t("before_after_label_after"),
        }),
      }),
    ).toBeDefined();

    setUserAgent("jsdom/26.1.0");
    createMock.mockClear();

    renderAudioPlayer({ src: "/jsdom.wav" });

    await waitFor(() =>
      expect(screen.getAllByTestId("audio-player-toggle")).toHaveLength(2),
    );
    expect(createMock).not.toHaveBeenCalled();
  });

  it("resets playback state when playPause throws and destroys instances on rerender and unmount", async () => {
    const firstInstance = createWaveSurferInstance();
    const secondInstance = createWaveSurferInstance();

    firstInstance.playPause.mockRejectedValueOnce(new Error("boom"));
    createMock
      .mockReturnValueOnce(firstInstance)
      .mockReturnValueOnce(secondInstance);

    const { rerender, unmount } = renderAudioPlayer();

    await waitFor(() => expect(createMock).toHaveBeenCalledTimes(1));

    act(() => {
      firstInstance.emit("ready", 65);
      firstInstance.emit("play");
    });

    fireEvent.click(screen.getByTestId("audio-player-toggle"));

    await waitFor(() =>
      expect(
        screen.getByRole("button", {
          name: t("before_after_player_play_aria", {
            label: t("before_after_label_before"),
          }),
        }),
      ).toBeDefined(),
    );

    rerender(
      <AppIntlProvider locale="pl" messages={messages}>
        <AudioWavePlayer
          label={t("before_after_label_before")}
          src="/before-updated.wav"
        />
      </AppIntlProvider>,
    );

    await waitFor(() => expect(createMock).toHaveBeenCalledTimes(2));
    expect(firstInstance.destroy).toHaveBeenCalledTimes(1);

    unmount();

    expect(secondInstance.destroy).toHaveBeenCalledTimes(1);
  });
});
